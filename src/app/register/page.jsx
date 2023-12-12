"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    console.log(response);

    if (response.ok) {
      setUserCreated(true);
      setEmail("");
      setPassword("");
    } else {
      setError(true);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center text-green-600">
          User created
          <br /> Now you can{" "}
          <Link className="underline" href="/login">
            login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-600">
          An error has occured
          <br />
          Something went wrong!
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={loading}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={loading}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">or login via</div>
        <button
          type="button"
          disabled={loading}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" alt="goole" width={24} height={24} /> Login
          with google
        </button>
        <div className="text-center mt-4 border-t text-gray-500">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </section>
  );
}
