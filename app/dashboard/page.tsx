import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function UserGreeting() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email as string | undefined;

  return (
    <div>
      <h1
        className="text-[#2F3E4E] text-[32px] md:text-[40px] font-semibold leading-[120%]"
        style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
      >
        Welcome back 👋
      </h1>
      {email && (
        <p
          className="text-gray-500 text-[16px] mt-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {email}
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Suspense
        fallback={
          <div className="h-14 w-64 bg-white/60 rounded-xl animate-pulse" />
        }
      >
        <UserGreeting />
      </Suspense>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Your Matches", value: "0" },
          { label: "Active Bookings", value: "0" },
          { label: "Dogs Registered", value: "0" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <p
              className="text-gray-400 text-sm mb-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {stat.label}
            </p>
            <p
              className="text-[#2F3E4E] text-3xl font-semibold"
              style={{
                fontFamily:
                  "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#F6F2EA] flex items-center justify-center text-2xl">
          🐾
        </div>
        <h2
          className="text-[#2F3E4E] text-xl font-semibold"
          style={{
            fontFamily:
              "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Your dashboard is ready
        </h2>
        <p
          className="text-gray-500 text-sm max-w-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          This is where your matches, bookings, and dog profiles will appear
          once you get started.
        </p>
        <button
          className="mt-2 px-8 py-3 bg-[#5F7E9D] text-white font-medium text-[16px] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Find Care That Fits
        </button>
      </div>
    </div>
  );
}
