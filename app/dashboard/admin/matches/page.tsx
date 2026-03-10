import { createClient } from "@/lib/supabase/server";
import { AdminMatchesPage } from "@/components/admin/admin-matches-page";

export default async function MatchesPage() {
  const supabase = await createClient();

  const { data: matches } = await supabase
    .from("matches")
    .select(
      `*,
       dog:dogs(name, breed, owner:profiles(full_name)),
       caregiver:caregivers(caregiver_user:profiles(full_name))`
    )
    .order("created_at", { ascending: false });

  return <AdminMatchesPage initialMatches={matches ?? []} />;
}
