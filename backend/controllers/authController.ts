import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User, { IUser } from '../models/User';
import sendEmail from '../utils/sendEmail';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { name, email, password } = req.body;
    console.log(`Registration attempt for: ${email}`);

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        return res.status(400).json({ 
          message: 'Account already exists but is not verified. Please use the resend verification link.' 
        });
      }
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Create user
    user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires,
    });

    if (user) {
      // Send verification email
      try {
        await sendVerificationEmail(req, user, verificationToken);
      } catch (emailError) {
        console.error('Registration email error:', emailError);
        return res.status(500).json({
          message: 'User created but verification email could not be sent. Please check your email settings.'
        });
      }

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please check your email to verify your account.',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Resend verification email
 * @route   POST /api/auth/resend-verification
 * @access  Public
 */
export const resendVerification = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'This account is already verified. Please log in.' });
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save({ validateBeforeSave: false });

    // Send verification email
    try {
      await sendVerificationEmail(req, user, verificationToken);
    } catch (emailError) {
      console.error('Resend verification email error:', emailError);
      return res.status(500).json({
        message: 'Could not resend verification email. Please check your email settings.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Verification email resent successfully. Please check your inbox.',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Helper function to send verification email
 */
const sendVerificationEmail = async (req: Request, user: IUser, verificationToken: string): Promise<void> => {
  const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h1 style="color: #10b981; text-align: center;">Verify Your DermaAI Account</h1>
      <p>Hello ${user.name},</p>
      <p>Thank you for joining DermaAI. To complete your registration, please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email Address</a>
      </div>
      <p style="color: #64748b; font-size: 14px;">This link will expire in 1 hour.</p>
      <p style="color: #64748b; font-size: 14px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="color: #3b82f6; font-size: 14px; word-break: break-all;">${verificationUrl}</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you did not create an account, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Verify Your DermaAI Account',
    html: html,
  });
};

/**
 * @desc    Verify email address
 * @route   GET /api/auth/verify-email/:token
 * @access  Public
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const token = req.params.token;
    console.log(`Verification attempt with token: ${token}`);

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      console.log(`Verification failed: Token not found in database: ${token}`);
      return res.status(400).json({ 
        success: false,
        message: 'Invalid verification token. Account not found.' 
      });
    }

    // Check if token has expired
    if (!user.verificationTokenExpires || user.verificationTokenExpires.getTime() < Date.now()) {
      console.log(`Verification failed: Token expired for user: ${user.email}`);
      return res.status(400).json({ 
        success: false,
        message: 'Verification token has expired. Please register again.' 
      });
    }

    // Update user to verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    
    await user.save();
    console.log(`User verified successfully: ${user.email}`);

    // Redirect to frontend verification success page on 3001
    res.redirect('http://localhost:3001/auth/verify-success');
  } catch (error: any) {
    console.error('Verification Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error: ' + error.message 
    });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      // Check if user is verified
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in.' });
      }

      const token = generateToken((user._id as any).toString());

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Generate JWT Token
 */
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email address' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save({ validateBeforeSave: false });

    // Send reset email
    const resetUrl = `http://localhost:3001/auth/reset-password/${resetToken}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h1 style="color: #10b981; text-align: center;">Reset Your DermaAI Password</h1>
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Please click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #64748b; font-size: 14px;">This link will expire in 1 hour.</p>
        <p style="color: #64748b; font-size: 14px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">DermaAI - AI Powered Skincare</p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset Your DermaAI Password',
        html: html,
      });

      res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email',
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: 'Error sending reset email. Please try again later.' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({ message: 'Please provide a new password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now log in with your new password.',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
