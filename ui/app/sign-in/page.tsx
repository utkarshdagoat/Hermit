"use client";

import { Input, Button, Image } from "@nextui-org/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function Page() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const heading = useRef(null);
  useEffect(() => {
    let t1 = gsap.timeline({
      defaults: { duration: 1, ease: "power4.out" },
    });

    t1.to(heading.current, { opacity: 1, x: 0 }).to(
      ".form-stagger",
      { opacity: 1, y: 0, stagger: 0.2 },
      "<0.2"
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    if (!email || !address) return;
    e.preventDefault();
    fetch("/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, address: address }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User added successfully");
          router.push("/collaborate");
        }
      })
      .catch((error) => {
        console.error("Failed to add user", error);
      });
  };

  return (
    <div className="min-w-[50rem] border-spacing-2 border-red-500 p-12 rounded-lg flex flex-col gap-6">
      <h1
        ref={heading}
        className="text-5xl translate-x-5 opacity-0 font-semibold underline underline-offset-5 decoration-6 decoration-primary-red lg:decoration-8"
      >
        Sign In
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          variant="underlined"
          placeholder="Your work email"
          required
          size="lg"
          onChange={(e) => setEmail(e.target.value)}
          className="form-stagger translate-y-5 opacity-0"
        />
        <div className="flex gap-8 mt-6">
          <Input
            type="text"
            variant="underlined"
            size="lg"
            value={address}
            readOnly
            required
            placeholder="Your wallet address"
            className="form-stagger translate-y-5 opacity-0"
          />
          <Button
            isIconOnly
            onClick={() => connect({ connector: connectors[0] })}
            variant="flat"
            type="button"
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
        <Button
          variant="solid"
          type="submit"
          size="lg"
          className="bg-primary-red opacity-0 uppercase font-semibold translate-y-100 hover:translate-y-2 form-stagger mt-4 mx-auto text-md px-6 py-2"
        >
          Let's Go :)
        </Button>
      </form>
    </div>
  );
}
