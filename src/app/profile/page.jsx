"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          data.name && setUserName(data.name);
          data.image ? setImage(data.image) : setImage("/default-avatar.jpg");
          data.address && setAddress(data.address);
          data.phone && setPhoneNumber(data.phone);
          data.email && setEmail(data.email);
        });
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
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

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div className="p-2 self-start rounded-lg max-w-[120px]">
            {image && (
              <Image
                className="shadow-md rounded-lg w-full h-full mb-2"
                src={image}
                alt="logo"
                priority={true}
                width={250}
                height={250}
              />
            )}
            <label>
              <input
                accept="image/*"
                multiple={false}
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="block border rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="email" value={email} disabled />
            <input
              type="text"
              placeholder="Enter your name here!"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <PhoneInput
              specialLabel=""
              country={"ru"}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
