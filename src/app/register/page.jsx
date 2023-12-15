"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../components/Layout/Button";
import Input from "../../components/Layout/Input";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const promice = fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      setLoading(false);
      if (!res.ok) {
        throw new Error("Please check your password and email!");
      }
    });

    toast.promise(
      promice,
      {
        loading: "Loading...",
        success: (
          <p>
            Success! Now you can{" "}
            <Link href="/login" className="cursor-pointer text-purple-700">
              login
            </Link>
          </p>
        ),
        error: (err) => `${err}`,
      },
      {
        success: {
          duration: 5000,
        },
        error: {
          duration: 10000,
        },
      }
    );
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form
        className="flex flex-col gap-4 max-w-xs mx-auto"
        onSubmit={handleFormSubmit}
      >
        <Input
          disabled={loading}
          type="email"
          placeholder="example@mail.com"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          disabled={loading}
          type="password"
          placeholder="********"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={loading}
          type="submit"
          className="!w-full !rounded-lg"
        >
          Register
        </Button>
        <div className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link className="transition-all hover:text-primary" href="/login">
            Login
          </Link>
        </div>
        <div className="relative flex items-center justify-center my-4">
          <hr className="w-full" />
          <div className="absolute py-2 px-4 text-center bg-white text-gray-500">
            or
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex hover:bg-black hover:text-white gap-4 justify-center border py-2 rounded-lg px-4 hover:border-black transition-all"
        >
          <Image src="/google.png" alt="goole" width={24} height={24} /> Login
          with google
        </button>
      </form>
    </section>
  );
}
