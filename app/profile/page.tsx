import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { createInsforgeServer, getCurrentUser } from "@/lib/insforge-server";
import { isProfileRecord } from "@/types";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirectTo=/profile");
  }

  const insforge = await createInsforgeServer();
  const { data, error } = await insforge.database
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) console.error("[profile/page] load profile", error);

  return (
    <ProfileForm
      email={user.email ?? ""}
      userId={user.id}
      profile={isProfileRecord(data) ? data : null}
    />
  );
}
