import React from "react";
import { Button } from "@/components/data-master/button";
import { HeroDefault } from "@/components/hero-default";

const Page = () => {
  return (
    <div>
      <div className="flex flex-col">
        <HeroDefault />
        <div className="flex-grow ml-25 mx-25 grid grid-cols-5 gap-y-8 gap-x-5 -mt-[89px]">
          <Button buttonName="Berita" slug="/berita/berita" images="berita" />
          <Button
            buttonName="Buletin"
            slug="/berita/buletin"
            images="buletin"
          />
          <Button buttonName="Quote" slug="/berita/quote" images="berita" />
        </div>
      </div>
    </div>
  );
};

export default Page;
