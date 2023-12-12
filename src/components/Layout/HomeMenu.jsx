import Image from "next/image";
import React from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section className="my-16">
      <div className="absolute left-0 right-0">
        <div className="h-48 w-64 -top-24 absolute left-0 -z-10">
          <Image
            src="/salad1.png"
            alt="salad1"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="h-48 w-64 -top-48 absolute right-0">
          <Image
            src="/salad2.png"
            alt="salad1"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <SectionHeaders subHeader={"Check out"} mainHeader={"Menu"} />

      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
