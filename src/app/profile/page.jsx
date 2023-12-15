"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { InfinitySpin } from "react-loader-spinner";
import Input from "../../components/Layout/Input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "../../components/Layout/Button";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("/default-avatar.jpg");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserName(data.name);
            setImage(data.image);
            setAddress(data.address);
            setPhoneNumber(data.phone);
            setEmail(data.email);
          }
        });
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <InfinitySpin width="200" color="#f13a01" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileInfoUpdate = (e) => {
    e.preventDefault();

    const promice = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        image: image,
        address: address,
        phone: phoneNumber,
      }),
    });

    toast.promise(promice, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Some error occured!",
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.set("image", files[0]);

    const promice = fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((link) => {
        if (link) {
          setImage(link);
        }
      });

    toast.promise(promice, {
      loading: "Loading...",
      success: "Uploaded!",
      error: "Some error occured!",
    });
  };

  const changeLabelColor = (e) => {
    const previousElement = e.target.previousElementSibling;
    if (previousElement) {
      previousElement.classList.toggle("highlight");
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div className="p-2 self-start rounded-lg">
            <div className="relative w-32 h-32">
              {image && (
                <Image
                  className="rounded-lg mb-2"
                  src={image}
                  alt="logo"
                  priority={true}
                  fill={true}
                />
              )}
            </div>
            <label>
              <input
                accept="image/*"
                multiple={false}
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="block hover:bg-black hover:text-white transition-all border mt-2 rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>
          </div>

          <form
            className="grow flex flex-col gap-3"
            onSubmit={handleProfileInfoUpdate}
          >
            <Input
              withLabel={true}
              label={"Email"}
              type="email"
              disabled={true}
              value={email}
            />
            <Input
              placeholder="John Anderson"
              withLabel={true}
              label={"Your name"}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <PhoneInput
              specialLabel="Phone Number"
              country={"ru"}
              containerClass="text-sm text-gray-400 transition-all"
              onFocus={(e) => changeLabelColor(e)}
              onBlur={(e) => changeLabelColor(e)}
              inputClass="w-full outline outline-2 text-black text-base text-font-semibold focus:outline-primary hover:outline-black/80 disabled:outline-black/20 outline-black/40 disabled:cursor-not-allowed bg-transparent disabled:text-gray-400 rounded-lg px-4 py-2 transition-all"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            <Input
              placeholder="Moscow city, 13"
              label="Address"
              withLabel={true}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button type="submit" className="!w-full mt-2 !rounded-lg">
              Save
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
