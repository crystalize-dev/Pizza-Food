"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;
  console.log(userImage);

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <form className="max-w-xs mx-auto">
        <div>
          <Image src={userImage} alt="logo" width={64} height={64} />
        </div>
      </form>
    </section>
  );
}
