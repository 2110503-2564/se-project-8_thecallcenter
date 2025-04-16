import Image from "next/image";
import { ReactNode } from "react";

interface HeroSectionProps {
    title: ReactNode;
    description: string;
    imageSrc: string;
    imageAlt?: string;
  }

export default function HeroSection({ title, description, imageSrc, imageAlt = "Hero Image" }: HeroSectionProps) {
  return (
    <section className="max-w-screen-xl px-6 sm:px-10 md:px-16 mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pt-20 md:pt-36 pb-10 items-center">
      {/* Left Content */}
      <div className="md:col-span-1"></div>
      <div className="md:col-span-6 space-y-6 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-Outfit font-bold leading-tight">
          {title}
        </h1>
        <p className="text-base font-roboto font-medium pt-4">
          {description}
        </p>
      </div>

      {/* Right Image */}
      <div className="md:col-span-5 flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={360}
          height={360}
          className="w-[260px] sm:w-[300px] md:w-[360px] h-auto"
        />
      </div>
    </section>
  );
}
