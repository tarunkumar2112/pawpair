"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SIZE_OPTIONS = ["small", "medium", "large"];
const TEMPERAMENT_OPTIONS = [
  "Friendly", "Calm", "Anxious", "Playful", "Energetic",
  "Protective", "Gentle", "Social", "Curious", "Mouthy", "Loyal",
];
const SERVICE_OPTIONS = [
  { value: "boarding", label: "Boarding", icon: "🏠", desc: "Dog stays at your home" },
  { value: "daycare", label: "Daycare", icon: "☀️", desc: "Care during the day" },
  { value: "walking", label: "Dog Walking", icon: "🦮", desc: "Regular walks" },
  { value: "drop-in", label: "Drop-in Visit", icon: "🚪", desc: "Visit owner's home" },
  { value: "training", label: "Training", icon: "🎓", desc: "Obedience & behaviour" },
];
const AVAILABILITY_OPTIONS = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "anytime", label: "Anytime" },
  { value: "mornings", label: "Mornings only" },
  { value: "evenings", label: "Evenings only" },
];

interface CaregiverProfileFormProps {
  userId: string;
  existingProfile?: {
    id: string;
    bio: string | null;
    experience_years: number | null;
    accepts_sizes: string[] | null;
    accepts_temperaments: string[] | null;
    services: string[] | null;
    certifications: string | null;
    city: string | null;
    zip_code: string | null;
    availability: string | null;
  } | null;
}

export function CaregiverProfileForm({ userId, existingProfile }: CaregiverProfileFormProps) {
  const router = useRouter();
  const isEditing = !!existingProfile;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [bio, setBio] = useState(existingProfile?.bio ?? "");
  const [experienceYears, setExperienceYears] = useState(
    existingProfile?.experience_years?.toString() ?? ""
  );
  const [acceptsSizes, setAcceptsSizes] = useState<string[]>(existingProfile?.accepts_sizes ?? []);
  const [acceptsTemperaments, setAcceptsTemperaments] = useState<string[]>(
    existingProfile?.accepts_temperaments ?? []
  );
  const [services, setServices] = useState<string[]>(existingProfile?.services ?? []);
  const [certifications, setCertifications] = useState(existingProfile?.certifications ?? "");
  const [city, setCity] = useState(existingProfile?.city ?? "");
  const [zipCode, setZipCode] = useState(existingProfile?.zip_code ?? "");
  const [availability, setAvailability] = useState(existingProfile?.availability ?? "");

  const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (services.length === 0) { setError("Please select at least one service you offer"); return; }
    if (acceptsSizes.length === 0) { setError("Please select at least one dog size you accept"); return; }

    setIsLoading(true);
    setError(null);
    const supabase = createClient();

    const payload = {
      user_id: userId,
      bio: bio || null,
      experience_years: experienceYears ? parseInt(experienceYears) : null,
      accepts_sizes: acceptsSizes,
      accepts_temperaments: acceptsTemperaments.length > 0 ? acceptsTemperaments : null,
      services,
      certifications: certifications || null,
      city: city || null,
      zip_code: zipCode || null,
      availability: availability || null,
    };

    let dbError;
    if (isEditing && existingProfile?.id) {
      const { error } = await supabase
        .from("caregivers")
        .update(payload)
        .eq("id", existingProfile.id);
      dbError = error;
    } else {
      const { error } = await supabase.from("caregivers").insert(payload);
      dbError = error;
    }

    setIsLoading(false);
    if (dbError) { setError(dbError.message); return; }

    setSuccess(true);
    router.refresh();
    setTimeout(() => {
      router.push("/dashboard/caregiver");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">

      {/* About You */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          About You
        </h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Bio</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell dog owners about yourself — your experience, love for dogs, home environment..."
              rows={4}
              className="w-full rounded-xl border-2 border-gray-200 focus:border-[#5F7E9D] focus:outline-none px-4 py-3 text-sm text-[#2F3E4E] resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[#2F3E4E] text-sm font-medium">Years of Experience</Label>
              <Input
                type="number"
                min="0"
                max="50"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                placeholder="e.g. 5"
                className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[#2F3E4E] text-sm font-medium">Certifications</Label>
              <Input
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                placeholder="e.g. Pet First Aid, Dog Trainer"
                className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Services You Offer *
        </h2>
        <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Select all services you&apos;re comfortable providing
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => toggleItem(services, s.value, setServices)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left border-2 transition-all ${
                services.includes(s.value)
                  ? "bg-[#5F7E9D] text-white border-[#5F7E9D]"
                  : "bg-white text-[#2F3E4E] border-gray-200 hover:border-[#5F7E9D]"
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
                <p className={`text-xs ${services.includes(s.value) ? "text-white/70" : "text-gray-400"}`} style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.desc}
                </p>
              </div>
              {services.includes(s.value) && (
                <span className="ml-auto text-white">✓</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Dog Preferences */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Dog Preferences
        </h2>

        {/* Accepts sizes */}
        <div className="flex flex-col gap-2 mb-6">
          <Label className="text-[#2F3E4E] text-sm font-medium">Dog Sizes You Accept *</Label>
          <div className="flex gap-2 mt-1">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleItem(acceptsSizes, s, setAcceptsSizes)}
                className={`flex-1 h-11 rounded-xl text-sm font-medium border-2 transition-all capitalize ${
                  acceptsSizes.includes(s)
                    ? "bg-[#5F7E9D] text-white border-[#5F7E9D]"
                    : "bg-white text-[#2F3E4E] border-gray-200 hover:border-[#5F7E9D]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {s === "small" ? "🐩 Small" : s === "medium" ? "🐕 Medium" : "🦴 Large"}
              </button>
            ))}
          </div>
        </div>

        {/* Accepts temperaments */}
        <div className="flex flex-col gap-2">
          <Label className="text-[#2F3E4E] text-sm font-medium">
            Temperaments You&apos;re Comfortable With
          </Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {TEMPERAMENT_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleItem(acceptsTemperaments, t.toLowerCase(), setAcceptsTemperaments)}
                className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                  acceptsTemperaments.includes(t.toLowerCase())
                    ? "bg-[#5F7E9D] text-white border-[#5F7E9D]"
                    : "bg-white text-[#2F3E4E] border-gray-200 hover:border-[#5F7E9D]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Availability */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Location & Availability
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Mumbai"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">ZIP / Area Code</Label>
            <Input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g. 400001"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[#2F3E4E] text-sm font-medium">Your Availability</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {AVAILABILITY_OPTIONS.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setAvailability(availability === a.value ? "" : a.value)}
                className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                  availability === a.value
                    ? "bg-[#5F7E9D] text-white border-[#5F7E9D]"
                    : "bg-white text-[#2F3E4E] border-gray-200 hover:border-[#5F7E9D]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600" style={{ fontFamily: "Inter, sans-serif" }}>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <p className="text-sm text-green-600" style={{ fontFamily: "Inter, sans-serif" }}>
            ✓ Profile {isEditing ? "updated" : "submitted"} successfully! Redirecting...
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#5F7E9D] text-white font-medium text-[16px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {isLoading
            ? "Saving..."
            : isEditing
            ? "Update Profile"
            : "Submit Application"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 text-gray-500 text-[16px] hover:text-[#2F3E4E] transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
