import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function OwnerGreeting() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub as string | undefined;

  let fullName = "";
  let dogsCount = 0;
  let matchesCount = 0;

  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();
    fullName = profile?.full_name || "";

    const { count: dogs } = await supabase
      .from("dogs")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", userId);
    dogsCount = dogs ?? 0;

    const { count: matches } = await supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .in(
        "dog_id",
        (
          await supabase
            .from("dogs")
            .select("id")
            .eq("owner_id", userId)
        ).data?.map((d) => d.id) ?? []
      );
    matchesCount = matches ?? 0;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome header */}
      <div>
        <h1
          className="text-[#2F3E4E] text-[32px] md:text-[40px] font-semibold leading-[120%]"
          style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          Welcome{fullName ? `, ${fullName.split(" ")[0]}` : " back"}! 🐾
        </h1>
        <p className="text-gray-500 text-[16px] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
          Find the perfect caregiver for your dog
        </p>
        <Link
          href="/find-care"
          className="mt-4 inline-flex items-center gap-2 h-12 px-7 bg-[#5F7E9D] text-white font-medium text-[15px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          🔍 Find Care That Fits
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Dogs Registered", value: dogsCount, icon: "🐶" },
          { label: "Matches Found", value: matchesCount, icon: "💛" },
          { label: "Active Bookings", value: 0, icon: "📅" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#F6F2EA] flex items-center justify-center text-2xl flex-shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.label}
              </p>
              <p
                className="text-[#2F3E4E] text-3xl font-semibold"
                style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add dog CTA */}
        <div className="bg-[#5F7E9D] rounded-2xl p-8 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            🐶
          </div>
          <div>
            <h2
              className="text-white text-xl font-semibold"
              style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
            >
              Add Your Dog
            </h2>
            <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Create a profile for your dog to start getting matched with caregivers
            </p>
          </div>
          <Link
            href="/dashboard/owner/dogs/add"
            className="mt-auto inline-flex items-center justify-center h-11 px-6 bg-white text-[#5F7E9D] font-medium text-[15px] rounded-[10px] border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 w-fit"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Add a Dog →
          </Link>
        </div>

        {/* Find caregiver CTA */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F6F2EA] flex items-center justify-center text-2xl">
            🔍
          </div>
          <div>
            <h2
              className="text-[#2F3E4E] text-xl font-semibold"
              style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
            >
              Find Caregivers
            </h2>
            <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Browse caregivers matched to your dog&apos;s energy, size, and temperament
            </p>
          </div>
          <div className="mt-auto flex gap-3 flex-wrap">
            <Link
              href="/find-care"
              className="inline-flex items-center justify-center h-11 px-6 bg-[#5F7E9D] text-white font-medium text-[15px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Start Quiz →
            </Link>
            <Link
              href="/dashboard/owner/matches"
              className="inline-flex items-center justify-center h-11 px-6 bg-white text-[#5F7E9D] font-medium text-[15px] rounded-[10px] border-2 border-[#5F7E9D]/30 hover:border-[#5F7E9D] transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              View Matches
            </Link>
          </div>
        </div>
      </div>

      {/* Getting started guide — shown when no dogs */}
      {dogsCount === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2
            className="text-[#2F3E4E] text-lg font-semibold mb-4"
            style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
          >
            Getting Started
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                step: "1",
                title: "Add your dog",
                desc: "Tell us about your dog's breed, size, energy, and temperament",
                done: false,
              },
              {
                step: "2",
                title: "Get matched",
                desc: "Our algorithm finds caregivers compatible with your dog",
                done: false,
              },
              {
                step: "3",
                title: "Connect & book",
                desc: "Reach out to your top matches and arrange care",
                done: false,
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#5F7E9D]/10 text-[#5F7E9D] text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p
                    className="text-[#2F3E4E] font-medium text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OwnerDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="h-12 w-72 bg-white/60 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white/60 rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <OwnerGreeting />
    </Suspense>
  );
}
