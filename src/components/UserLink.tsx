"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function UserLink({ profile }: { profile: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/api/auth/signout"
      className="border p-2 rounded-lg items-center text-xs font-sans font-semibold hover:bg-black hover:text-white whitespace-nowrap flex flex-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={hovered ? "/img/user.png" : "/img/userDark.png"}
        alt="user"
        width={20}
        height={20}
        className="mr-2"
      />
      <span>
        {profile.name}
        <br />
        {profile.email}
      </span>
    </a>
  );
}
