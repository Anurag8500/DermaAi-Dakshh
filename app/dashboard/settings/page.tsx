"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
        <p className="text-slate-500 mt-1 text-sm">
          Update your personal information and skin profile.
        </p>
      </div>

      {/* Settings form card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8">
        <h3 className="text-base font-semibold text-slate-900 mb-6">Profile Information</h3>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="settings-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Name
              </label>
              <input
                id="settings-name"
                type="text"
                placeholder="Your full name"
                defaultValue="User Name"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 hover:border-slate-300 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="settings-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id="settings-email"
                type="email"
                placeholder="your@email.com"
                defaultValue="user@example.com"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 hover:border-slate-300 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Skin Type */}
            <div>
              <label htmlFor="settings-skin-type" className="block text-sm font-medium text-slate-700 mb-1.5">
                Skin Type
              </label>
              <select
                id="settings-skin-type"
                defaultValue="oily"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 hover:border-slate-300 transition-colors bg-white"
              >
                <option value="">Select skin type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
                <option value="normal">Normal</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="settings-age" className="block text-sm font-medium text-slate-700 mb-1.5">
                Age
              </label>
              <input
                id="settings-age"
                type="number"
                placeholder="Your age"
                min={10}
                max={120}
                defaultValue={25}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 hover:border-slate-300 transition-colors"
              />
            </div>
          </div>

          {/* Save */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h3 className="text-base font-semibold text-red-700 mb-1">Danger Zone</h3>
        <p className="text-xs text-slate-400 mb-4">
          These actions are irreversible. Proceed with caution.
        </p>
        <button
          type="button"
          className="px-4 py-2.5 text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
