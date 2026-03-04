"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountSettingsFormProps {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
}

export function AccountSettingsForm({
  userId,
  fullName: initialName,
  email,
  phone: initialPhone,
  city: initialCity,
}: AccountSettingsFormProps) {
  const router = useRouter();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [fullName, setFullName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [city, setCity] = useState(initialCity);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(false);

    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone: phone || null, city: city || null })
      .eq("id", userId);

    setIsProfileLoading(false);
    if (error) { setProfileError(error.message); return; }
    setProfileSuccess(true);
    router.refresh();
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setIsPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);

    const supabase = createClient();

    // Re-authenticate with current password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError) {
      setPasswordError("Current password is incorrect");
      setIsPasswordLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsPasswordLoading(false);

    if (error) { setPasswordError(error.message); return; }
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* Profile Info */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Profile Information
        </h2>
        <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Update your name, phone, and location
        </p>

        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-5">
          {/* Email — read only */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Email</Label>
            <Input
              value={email}
              disabled
              className="h-11 rounded-xl border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Email cannot be changed
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[#2F3E4E] text-sm font-medium">Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[#2F3E4E] text-sm font-medium">City</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
              />
            </div>
          </div>

          {profileError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600" style={{ fontFamily: "Inter, sans-serif" }}>{profileError}</p>
            </div>
          )}
          {profileSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-sm text-green-600" style={{ fontFamily: "Inter, sans-serif" }}>✓ Profile updated successfully</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isProfileLoading}
            className="w-fit px-8 py-3 bg-[#5F7E9D] text-white font-medium text-[15px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300 disabled:opacity-60"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {isProfileLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Change Password */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Change Password
        </h2>
        <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Use a strong password with at least 6 characters
        </p>

        <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Confirm New Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600" style={{ fontFamily: "Inter, sans-serif" }}>{passwordError}</p>
            </div>
          )}
          {passwordSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-sm text-green-600" style={{ fontFamily: "Inter, sans-serif" }}>✓ Password changed successfully</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPasswordLoading}
            className="w-fit px-8 py-3 bg-[#5F7E9D] text-white font-medium text-[15px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300 disabled:opacity-60"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {isPasswordLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h2
          className="text-red-600 text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Danger Zone
        </h2>
        <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Permanent actions that cannot be undone
        </p>
        <button
          type="button"
          className="px-6 py-2.5 text-red-500 text-sm font-medium rounded-[10px] border-2 border-red-200 hover:bg-red-50 transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
          onClick={() => alert("Please contact support to delete your account.")}
        >
          Delete Account
        </button>
      </section>
    </div>
  );
}
