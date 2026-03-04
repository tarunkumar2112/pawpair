"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TEMPERAMENT_OPTIONS = [
  "Friendly", "Calm", "Anxious", "Playful", "Energetic",
  "Protective", "Gentle", "Social", "Curious", "Mouthy", "Loyal",
];

const CARE_TYPE_OPTIONS = [
  { value: "boarding", label: "Boarding", icon: "🏠" },
  { value: "daycare", label: "Daycare", icon: "☀️" },
  { value: "walking", label: "Walking", icon: "🦮" },
  { value: "drop-in", label: "Drop-in Visit", icon: "🚪" },
];

const AVAILABILITY_OPTIONS = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "anytime", label: "Anytime" },
  { value: "mornings", label: "Mornings only" },
  { value: "evenings", label: "Evenings only" },
];

export function AddDogForm({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState<"small" | "medium" | "large" | "">("");
  const [age, setAge] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);
  const [temperament, setTemperament] = useState<string[]>([]);
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [careType, setCareType] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");

  const toggleArrayItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!size) { setError("Please select your dog's size"); return; }
    if (careType.length === 0) { setError("Please select at least one care type"); return; }

    setIsLoading(true);
    setError(null);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("dogs").insert({
      owner_id: ownerId,
      name,
      breed: breed || null,
      size,
      age: age ? parseInt(age) : null,
      energy_level: energyLevel,
      temperament: temperament.length > 0 ? temperament : null,
      special_needs: specialNeeds,
      special_notes: specialNotes || null,
      city: city || null,
      zip_code: zipCode || null,
      care_type: careType,
      availability: availability || null,
    });

    setIsLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    router.push("/dashboard/owner/dogs");
    router.refresh();
  };

  const energyLabels = ["", "Very Low", "Low", "Medium", "High", "Very High"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">

      {/* Basic Info */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Dog&apos;s Name *</Label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bruno"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Breed</Label>
            <Input
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="e.g. Labrador Retriever"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Age (years)</Label>
            <Input
              type="number"
              min="0"
              max="30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 3"
              className="h-11 rounded-xl border-gray-200 focus:border-[#5F7E9D] text-[#2F3E4E]"
            />
          </div>

          {/* Size */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Size *</Label>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 h-11 rounded-xl text-sm font-medium border-2 transition-all capitalize ${
                    size === s
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
        </div>
      </section>

      {/* Energy & Temperament */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Personality
        </h2>

        {/* Energy slider */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <Label className="text-[#2F3E4E] text-sm font-medium">Energy Level</Label>
            <span
              className="text-sm font-semibold text-[#5F7E9D] bg-[#5F7E9D]/10 px-3 py-1 rounded-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {energyLevel}/5 — {energyLabels[energyLevel]}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#5F7E9D]"
          />
          <div className="flex justify-between text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>

        {/* Temperament tags */}
        <div className="flex flex-col gap-2">
          <Label className="text-[#2F3E4E] text-sm font-medium">Temperament (select all that apply)</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {TEMPERAMENT_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleArrayItem(temperament, t.toLowerCase(), setTemperament)}
                className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                  temperament.includes(t.toLowerCase())
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

      {/* Special Needs */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Special Needs
        </h2>
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <div
            onClick={() => setSpecialNeeds(!specialNeeds)}
            className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
              specialNeeds ? "bg-[#5F7E9D]" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                specialNeeds ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-[#2F3E4E] text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
            My dog has special needs or medical requirements
          </span>
        </label>
        {specialNeeds && (
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#2F3E4E] text-sm font-medium">Please describe</Label>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Takes anxiety medication twice a day, needs quiet environment..."
              rows={3}
              className="w-full rounded-xl border-2 border-gray-200 focus:border-[#5F7E9D] focus:outline-none px-4 py-3 text-sm text-[#2F3E4E] resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        )}
      </section>

      {/* Location & Care */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-[#2F3E4E] text-lg font-semibold mb-5"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Location & Care Needs
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

        {/* Care type */}
        <div className="flex flex-col gap-2 mb-5">
          <Label className="text-[#2F3E4E] text-sm font-medium">Type of Care Needed *</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {CARE_TYPE_OPTIONS.map((ct) => (
              <button
                key={ct.value}
                type="button"
                onClick={() => toggleArrayItem(careType, ct.value, setCareType)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm border-2 transition-all ${
                  careType.includes(ct.value)
                    ? "bg-[#5F7E9D] text-white border-[#5F7E9D]"
                    : "bg-white text-[#2F3E4E] border-gray-200 hover:border-[#5F7E9D]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span>{ct.icon}</span>
                <span>{ct.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex flex-col gap-2">
          <Label className="text-[#2F3E4E] text-sm font-medium">Availability</Label>
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

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#5F7E9D] text-white font-medium text-[16px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {isLoading ? "Saving..." : "Save Dog Profile"}
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
