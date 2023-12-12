import React from "react";
import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section className="my-16 text-center">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="mt-4 text-gray-500 max-w-2xl mx-auto flex flex-col gap-4">
        <p>
          Consectetur proident laborum aute ullamco incididunt. Sint enim
          nostrud ut magna nisi sint proident consectetur. Velit duis sit aute
          cupidatat excepteur nulla.
        </p>
        <p>
          Consectetur proident laborum aute ullamco incididunt. Sint enim
          nostrud ut magna nisi sint proident consectetur. Velit duis sit aute
          cupidatat excepteur nulla.
        </p>
      </div>
    </section>
  );
}
