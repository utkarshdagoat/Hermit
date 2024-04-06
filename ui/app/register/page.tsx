"use client";

import { useGSAP } from "@gsap/react";
import { Input, Button, Image } from "@nextui-org/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Page() {
  const heading = useRef(null);

  useEffect(() => {
    let t1 = gsap.timeline({
      defaults: { duration: 1, ease: "power4.out" },
    });

    t1.to(heading.current, { delay: 0.1, opacity: 1, x: 0 })
      .to(".form-stagger", { opacity: 1, y: 0, stagger: 0.2 }, "<0.2");

  }, []);

  return (
    <div className="min-w-[50rem] border-spacing-2 border-red-500 p-12 rounded-lg flex flex-col gap-4">
      <h1
        ref={heading}
        className="text-5xl translate-x-5 opacity-0 font-semibold underline underline-offset-5 decoration-6 decoration-primary-red lg:decoration-8"
      >
        Register Yourself
      </h1>
      <form action="">
        <Input
          type="email"
          variant="underlined"
          label="Work Email"
          size="lg"
          className="form-stagger translate-y-5 opacity-0"
        />
        <div className="flex gap-8 mt-6">
          <Input
            type="text"
            variant="underlined"
            size="lg"
            readOnly
            label="Wallet Address"
            className="form-stagger translate-y-5 opacity-0"
          />
          <Button
            isIconOnly
            variant="flat"
            radius="md"
            className="w-20 h-16 form-stagger translate-y-5 opacity-0"
          >
            <Image
              src="https://cdn3.emoji.gg/emojis/1385-metamask.png"
              width={32}
              height={32}
            />
          </Button>
        </div>
      </form>
    </div>
  );
}
