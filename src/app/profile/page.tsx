import type { Metadata } from "next";
import PrivateRoute from "@/components/common/PrivateRoute";
import ProfileCard from "@/components/profile/ProfileCard";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <section className="paper">
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20">
          <ProfileCard />
        </div>
      </section>
    </PrivateRoute>
  );
}