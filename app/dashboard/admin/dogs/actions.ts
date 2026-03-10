"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface DogInput {
  name: string;
  owner_id: string;
  breed: string;
  size: string;
  age: number | null;
  energy_level: number | null;
  temperament: string[];
  special_needs: boolean;
  special_notes: string;
  city: string;
  zip_code: string;
  care_type: string[];
  availability: string;
}

export async function createDog(input: DogInput) {
  const supabase = await createClient();

  const { error } = await supabase.from("dogs").insert({
    name: input.name,
    owner_id: input.owner_id,
    breed: input.breed || null,
    size: input.size || null,
    age: input.age,
    energy_level: input.energy_level,
    temperament: input.temperament.length ? input.temperament : null,
    special_needs: input.special_needs,
    special_notes: input.special_notes || null,
    city: input.city || null,
    zip_code: input.zip_code || null,
    care_type: input.care_type.length ? input.care_type : null,
    availability: input.availability || null,
  });

  if (error) return { success: false as const, error: error.message };

  revalidatePath("/dashboard/admin/dogs");
  return { success: true as const };
}

export async function updateDog(id: string, input: DogInput) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("dogs")
    .update({
      name: input.name,
      owner_id: input.owner_id,
      breed: input.breed || null,
      size: input.size || null,
      age: input.age,
      energy_level: input.energy_level,
      temperament: input.temperament.length ? input.temperament : null,
      special_needs: input.special_needs,
      special_notes: input.special_notes || null,
      city: input.city || null,
      zip_code: input.zip_code || null,
      care_type: input.care_type.length ? input.care_type : null,
      availability: input.availability || null,
    })
    .eq("id", id);

  if (error) return { success: false as const, error: error.message };

  revalidatePath("/dashboard/admin/dogs");
  return { success: true as const };
}

export async function deleteDog(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("dogs").delete().eq("id", id);

  if (error) return { success: false as const, error: error.message };

  revalidatePath("/dashboard/admin/dogs");
  return { success: true as const };
}
