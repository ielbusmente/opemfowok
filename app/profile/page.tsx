import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { getCurrentUser } from "@/lib/insforge-server";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirectTo=/profile");
  }

  return <ProfileForm email={user.email ?? ""} />;
}
