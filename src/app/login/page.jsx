"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Layout/Input";
import Button from "../../components/Layout/Button";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const promice = signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((res) => {
      setLoading(false);

      if (!res.ok) {
        throw new Error("Please check your password and email!");
      } else {
        router.push("/");
      }
    });

    toast.promise(promice, {
      loading: "Loading...",
      success: "Success!",
      error: (err) => `${err}`,
    });
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form
        className="max-w-xs mx-auto flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <Input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="example@mail.com"
          value={email}
          required={true}
          disabled={loading}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="*******"
          value={password}
          required={true}
          disabled={loading}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button
          disabled={loading}
          type="submit"
          className={"!w-full !rounded-xl"}
        >
          Login
        </Button>
        <div className="relative flex items-center justify-center my-4">
          <hr className="w-full" />
          <div className="absolute py-2 px-4 text-center bg-white text-gray-500">
            or
          </div>
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex hover:bg-black hover:text-white gap-4 justify-center border py-2 rounded-lg px-4 hover:border-black transition-all"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
