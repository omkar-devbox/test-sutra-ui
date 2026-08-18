import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  Eye,
  EyeOff,
  Building,
  Calendar,
  Lock,
  Smartphone,
  Sparkles,
  Activity,
  Check,
  Zap,
  ShieldCheck,
  Laptop,
  Globe,
  RefreshCw,
  LogOut,
  MapPin,
} from "lucide-react";
import { profileStyles } from "./style/profile.styles";

type TabType = "personal" | "security";

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // Personal Info Form State
  const [formData, setFormData] = useState({
    fullName: "System Admin",
    email: "[EMAIL_ADDRESS]",
    contactNo: "+91 98765 43210",
    role: "System Admin",
    department: "Print Production & Digital Operations",
    bio: "Lead operator managing high-volume flex printing, customer manifests, and stock inventory.",
    location: "Main Plant - Station 1",
  });

  // Password Change State
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Preference Toggles State
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    smsNotifications: false,
    orderUpdates: true,
    weeklyReport: true,
    twoFactorAuth: true,
  });

  // Feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Sessions State
  const [sessions, setSessions] = useState([
    {
      id: "sess-1",
      device: "Linux Workstation (Ubuntu 24.04)",
      browser: "Chrome • Active Now",
      ip: "192.168.1.12",
      isCurrent: true,
    },
    {
      id: "sess-2",
      device: "Android Print Floor Terminal",
      browser: "Sutra Mobile App • 2 hrs ago",
      ip: "192.168.1.45",
      isCurrent: false,
    },
  ]);

  // Handle Personal Info Update
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage("Full name cannot be empty.");
      return;
    }
    setErrorMessage(null);
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 800);
  };

  // Handle Password Update
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!passData.currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }
    if (passData.newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }
    if (passData.newPassword !== passData.confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 800);
  };

  // Terminate a session
  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  // Calculate Password Strength
  const getPasswordMetrics = (pass: string) => {
    const hasMinLen = pass.length >= 6;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);

    let score = 0;
    if (hasMinLen) score += 25;
    if (hasUpper) score += 25;
    if (hasNumber) score += 25;
    if (hasSpecial) score += 25;

    let label = "Weak";
    let color = "bg-red-500";
    if (score >= 75) {
      label = "Strong";
      color = "bg-emerald-500";
    } else if (score >= 50) {
      label = "Medium";
      color = "bg-amber-500";
    }

    return { score, label, color, hasMinLen, hasUpper, hasNumber, hasSpecial };
  };

  const passMetrics = getPasswordMetrics(passData.newPassword);

  return (
    <div className={profileStyles.container}>
      {/* ── Top Hero Profile Banner Card ──────────────────────── */}
      <div className={profileStyles.heroBanner}>
        {/* Glow Effects */}
        <div className={profileStyles.bannerDecorGlow1} />
        <div className={profileStyles.bannerDecorGlow2} />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          {/* Avatar Ring Badge */}
          <div className="relative">
            <div className={profileStyles.avatarRing}>
              <div className={profileStyles.avatarBadge}>
                {formData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
              <button
                type="button"
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-[22px] transition-all text-white font-bold text-xs gap-1 cursor-pointer backdrop-blur-xs"
                title="Upload Profile Picture"
              >
                <Camera size={22} />
                <span>Upload</span>
              </button>
            </div>
            <div className={profileStyles.statusDot} title="Online System Operator" />
          </div>

          {/* User Details Overview */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight drop-shadow-sm">
                {formData.fullName}
              </h1>
              <span className={profileStyles.badge}>
                <ShieldCheck size={14} className="text-cyan-300" />
                {formData.role}
              </span>
            </div>

            <p className="text-white/85 text-xs md:text-sm font-medium flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
                <Mail size={14} className="text-cyan-300" />
                {formData.email}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
                <Phone size={14} className="text-cyan-300" />
                {formData.contactNo}
              </span>
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-bold text-white/80">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <Building size={14} className="text-amber-300" />
                {formData.department}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <MapPin size={14} className="text-emerald-300" />
                {formData.location}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <Calendar size={14} className="text-purple-300" />
                Joined Jan 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Segmented Tab Pill Navigation ────────────────────── */}
      <div className={profileStyles.tabBarContainer}>
        <button
          type="button"
          onClick={() => {
            setActiveTab("personal");
            setErrorMessage(null);
          }}
          className={profileStyles.tabButton(activeTab === "personal")}
        >
          <User size={18} />
          Personal Profile Details
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("security");
            setErrorMessage(null);
          }}
          className={profileStyles.tabButton(activeTab === "security")}
        >
          <Key size={18} />
          Security Credentials & Passwords
        </button>
      </div>

      {/* ── Feedback Alerts ──────────────────────────────────── */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-700 dark:text-emerald-300 text-sm font-bold animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
          <span>Your profile information has been saved successfully!</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded-2xl text-red-700 dark:text-red-300 text-sm font-bold animate-in fade-in duration-200 shadow-sm">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── Tab Content 1: Personal Profile Details ───────────── */}
      {activeTab === "personal" && (
        <div className={profileStyles.card}>
          <form onSubmit={handleSavePersonal} className="space-y-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#0077be]/15">
              <div>
                <h2 className="text-xl font-black text-[#004066] dark:text-[#ebf7ff] flex items-center gap-2">
                  <User size={20} className="text-[#0077be]" />
                  Personal Information
                </h2>
                <p className="text-xs font-bold text-[#004066]/60 dark:text-[#ebf7ff]/60 mt-0.5">
                  Update public identity, contact channels, workstation assignment, and operator bio
                </p>
              </div>
              <Sparkles size={22} className="text-[#0077be] animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Full Name */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>
                  <span>Full Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={profileStyles.input}
                    placeholder="Enter your full name"
                  />
                  <User size={18} className="absolute right-4 top-4 text-slate-400" />
                </div>
              </div>

              {/* Email Address (System ID) */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>
                  <span>Email Address (System ID)</span>
                  <span className="text-xs text-emerald-500 flex items-center gap-1 font-bold">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className={profileStyles.disabledInput}
                  />
                  <Mail size={18} className="absolute right-4 top-4 text-slate-400 opacity-60" />
                </div>
              </div>

              {/* Contact Phone Number */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>
                  <span>Contact Phone Number</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                    className={profileStyles.input}
                    placeholder="+91 9876543210"
                  />
                  <Phone size={18} className="absolute right-4 top-4 text-slate-400" />
                </div>
              </div>

              {/* Assigned Role */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>Assigned System Access Role</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.role}
                    disabled
                    className={profileStyles.disabledInput}
                  />
                  <Shield size={18} className="absolute right-4 top-4 text-slate-400 opacity-60" />
                </div>
              </div>

              {/* Department */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>Department / Production Unit</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className={profileStyles.input}
                    placeholder="e.g. Print Production"
                  />
                  <Building size={18} className="absolute right-4 top-4 text-slate-400" />
                </div>
              </div>

              {/* Workstation Location */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>Workstation / Terminal Station</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={profileStyles.input}
                    placeholder="e.g. Station 1 - Flex Printer Node"
                  />
                  <MapPin size={18} className="absolute right-4 top-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Operator Bio */}
            <div className={profileStyles.inputGroup}>
              <label className={profileStyles.label}>Operator Bio & Responsibilities</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className={profileStyles.input}
                placeholder="Write a brief overview of your workstation setup and daily tasks..."
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#0077be]/15">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    fullName: "System Admin",
                    email: "[EMAIL_ADDRESS]",
                    contactNo: "+91 98765 43210",
                    role: "System Admin",
                    department: "Print Production & Digital Operations",
                    bio: "Lead operator managing high-volume flex printing, customer manifests, and stock inventory.",
                    location: "Main Plant - Station 1",
                  })
                }
                className={profileStyles.secondaryBtn}
              >
                <RefreshCw size={15} />
                Reset Defaults
              </button>

              <button type="submit" disabled={isSaving} className={profileStyles.primaryBtn}>
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save Personal Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Tab Content 2: Security & Password ────────────────── */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Password Form */}
          <div className={`${profileStyles.card} lg:col-span-7`}>
            <form onSubmit={handleSavePassword} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#0077be]/15">
                <div>
                  <h2 className="text-xl font-black text-[#004066] dark:text-[#ebf7ff] flex items-center gap-2">
                    <Lock size={20} className="text-[#0077be]" />
                    Change Account Password
                  </h2>
                  <p className="text-xs font-bold text-[#004066]/60 dark:text-[#ebf7ff]/60 mt-0.5">
                    Update your password regularly to prevent unauthorized terminal access
                  </p>
                </div>
              </div>

              {/* Current Password */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passData.currentPassword}
                    onChange={(e) =>
                      setPassData({ ...passData, currentPassword: e.target.value })
                    }
                    className={profileStyles.input}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                    }
                    className="absolute right-4 top-4 text-slate-400 hover:text-[#0077be]"
                  >
                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passData.newPassword}
                    onChange={(e) =>
                      setPassData({ ...passData, newPassword: e.target.value })
                    }
                    className={profileStyles.input}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                    }
                    className="absolute right-4 top-4 text-slate-400 hover:text-[#0077be]"
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {passData.newPassword && (
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-[#001929] rounded-xl border border-[#0077be]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#004066]/70 dark:text-[#ebf7ff]/70">
                        Password Complexity Rating:
                      </span>
                      <span className={passMetrics.score >= 75 ? "text-emerald-500" : "text-amber-500"}>
                        {passMetrics.label} ({passMetrics.score}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passMetrics.color}`}
                        style={{ width: `${passMetrics.score}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold pt-1">
                      <span className={passMetrics.hasMinLen ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                        <Check size={12} /> Minimum 6 characters
                      </span>
                      <span className={passMetrics.hasUpper ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                        <Check size={12} /> Uppercase letter
                      </span>
                      <span className={passMetrics.hasNumber ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                        <Check size={12} /> Numeric digit
                      </span>
                      <span className={passMetrics.hasSpecial ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                        <Check size={12} /> Special character
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className={profileStyles.inputGroup}>
                <label className={profileStyles.label}>Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passData.confirmPassword}
                    onChange={(e) =>
                      setPassData({ ...passData, confirmPassword: e.target.value })
                    }
                    className={profileStyles.input}
                    placeholder="Re-enter new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                    }
                    className="absolute right-4 top-4 text-slate-400 hover:text-[#0077be]"
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSaving} className={profileStyles.primaryBtn}>
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Key size={18} />
                  )}
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Active Devices & Security Guidelines Side Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={profileStyles.card}>
              <h3 className="text-base font-black uppercase tracking-wider text-[#004066] dark:text-[#ebf7ff] mb-4 flex items-center gap-2">
                <Smartphone size={18} className="text-[#0077be]" />
                Active Device Sessions ({sessions.length})
              </h3>

              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-4 bg-slate-50/80 dark:bg-[#001929] rounded-2xl border border-[#0077be]/20 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                          sess.isCurrent ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                        }`}
                      />
                      <div className="text-xs">
                        <p className="font-bold text-[#004066] dark:text-[#ebf7ff] flex items-center gap-1.5">
                          {sess.device}
                          {sess.isCurrent && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">
                              This Device
                            </span>
                          )}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{sess.browser}</p>
                        <p className="text-slate-400 dark:text-slate-500 font-mono text-[10px] mt-0.5">
                          IP: {sess.ip}
                        </p>
                      </div>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        type="button"
                        onClick={() => handleRevokeSession(sess.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        title="Revoke session access"
                      >
                        <LogOut size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#00253d] to-[#004066] text-white rounded-[28px] shadow-xl border border-[#0077be]/30 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-extrabold text-sm mb-2 flex items-center gap-2 text-cyan-300">
                <ShieldCheck size={18} />
                Security Protocol Best Practices
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                Always lock or log out of terminal workstations when leaving print workstations unattended. Multi-factor authentication provides an extra layer of protection for production databases.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
