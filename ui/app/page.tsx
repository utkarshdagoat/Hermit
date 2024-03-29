"use client";

import { montserrat } from "./fonts";
import styles from "./home.module.css";
import { Button } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const heading = useRef(null);
  const description = useRef(null);
  const background = useRef(null);
  const getStarted = useRef(null);

  useEffect(() => {
    let t1 = gsap.timeline({
      defaults: { duration: 1.5, ease: "power4.out" },
    });

    t1.to(heading.current, { x: 0, opacity: 1 })
      .to(description.current, { opacity: 1, y: 0 }, "<0.5")
      .to(background.current, { backgroundColor: "rgba(0, 0, 0, 0)" })
      .to(getStarted.current, { y: 0, opacity: 1 }, "<0.5");
  }, []);

  return (
    <div className={`w-full h-screen ${styles.animated_bg}`}>
      <div ref={background} className="w-full h-full bg-bg-dark">
        <div className="w-full h-full flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col text-center">
            <h1
              ref={heading}
              className={`${montserrat.className} uppercase mb-4 text-6xl tracking-tight opacity-0 translate-x-10 font-bold shadow-red-100 text-center bg-gradient-to-r from-primary-red from-30% via-primary-yellow to-orange-50 bg-clip-text text-transparent leading-none md:text-6xl lg:text-9xl`}
            >
              Hermit
            </h1>
            <p
              ref={description}
              className="text-lg mx-auto mb-8 translate-y-5 opacity-0 text-foreground-600 font-semibold text-center line-clamp-3 w-[36ch] text-primary-yellow-200 lg:text-2xl"
            >
              <span className="underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-blue-600 lg:decoration-4">
                {" "}
                Decentralized SMPC platform{" "}
              </span>{" "}
              for secure and private data collaboration and <br />
              <span className="underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-blue-600 lg:decoration-4">
                AI analytics.
              </span>{" "}
            </p>
            <Button
              ref={getStarted}
              size="lg"
              className="px-10 py-4 translate-y-11 opacity-0 font-semibold bg-primary-red uppercase tracking-wider self-center"
              radius="full"
              variant="shadow"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
