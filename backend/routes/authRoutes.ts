import express from 'express';
import { 
  registerUser, 
  verifyEmail, 
  loginUser, 
  resendVerification, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
