"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session?.data?.user;
  const userName = userData?.name;

  return (
    <header className="flex items-center justify-between h-16">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center h-16">
        <Link
          className="relative h-16 w-44 font-semibold text-2xl text-primary"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="h-full object-contain"
            priority={true}
            width={250}
            height={250}
          />
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href="/profile" className="whitespace-nowrap">
              Hello, {userData.email}
            </Link>
            <button
              className="bg-primary text-white rounded-full px-8 py-2"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              className="bg-primary text-white rounded-full px-8 py-2"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
