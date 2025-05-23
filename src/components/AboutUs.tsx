"use client"
import React from "react";
import { motion } from "framer-motion";

// Reusable Card Component
function AboutUsCard({
  name,
  role,
  desc,
  img,
}: {
  name: string;
  role: string;
  desc: string;
  img: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="col-span-12 md:col-span-4 mt-16 border border-white rounded-lg px-6 py-8 text-center relative shadow-lg bg-transparent hover:bg-white backdrop-blur-sm text-black hover:text-[#0A4EB1]"
    >
      {/* Avatar + Badge */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={img}
          alt={name}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <div className="w-4 h-4 bg-orange-400 rounded-full absolute -top-2 -right-2 border-2 border-white"></div>
      </div>

      <div className="space-y-4 hover:text-[#0A4EB1]">
      <h4 className="text-lg font-bold">{name}</h4>
      <p className="text-sm pt-3">{desc}</p>   
      </div>
      <div className="mt-6 inline-block bg-[#0A4EB1] text-white px-4 py-2 rounded-md text-xs font-semibold">
        {role}
      </div>
    </motion.div>
  );
}

// Main Component
export default function AboutUs() {
    const members = [
      {
        name: "Siravut Chunu",
        role: "UX/UI Designer",
        desc: "Involved in the design process of the user experience and interface for all web pages. Focused on graphic design and creating seamless UI flows.",
        img: "/assets/member1.jpg",
      },
      {
        name: "Worachart Poungtabtim",
        role: "Full-stack Developer",
        desc: "Involved in the development process, focusing on writing code and designing components to enhance the overall functionality of the project.",
        img: "/assets/member2.jpg",
      },
      {
        name: "Patcharapon Ongkakul",
        role: "Developer and Front-end Tester",
        desc: "Assisting in code development, designing components, and performing thorough testing to ensure the program runs smoothly.",
        img: "/assets/member3.jpg",
      },
      {
        name: "Nattarat Samartkit",
        role: "Developer and Front-end Tester",
        desc: "Contributing to the development of the project by writing code and designing components, ensuring a seamless user experience.",
        img: "/assets/member4.jpg",
      },
      {
        name: "Jedsada Meesuk",
        role: "Lead of Back-end",
        desc: "The back-end development, focusing on server-side logic and database management to ensure a robust and efficient system.",
        img : "/assets/member5.jpg",
      },
      {
        name: "Worrapong Tongkundam",
        role: "Lead of Front-end",
        desc: "Contributing to the development of the project by writing code and designing components, ensuring a seamless user experience.",
        img: "/assets/member6.png",
      },
      {
        name: "Titiporn Somboon",
        role: "Developer and Back-end Tester",
        desc: "Responsible for testing the back-end components of the project, ensuring all server-side logic and database interactions function correctly.",
        img : "/assets/member7.jpg",
      },
      {
        name: "Patcharapon Srisuwan",
        role: "Full-stack Developer",
        desc: "Involved in the development process, focusing on writing code and designing components to enhance the overall functionality of the project.",
        img : "/assets/member8.jpg",
      },
      {
        name: "Patthadon Phengpinij",
        role: "Main Tester",
        desc: "Responsible for testing the project to ensure all components function correctly and meet the required standards.",
        img: "/assets/member9.jpg",
      },
    ];
  
    return (
      <section  id="about" className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] pt-8 pb-36">
        {/* Heading */}
        <div className="col-span-12 text-center space-y-4">
          <h3 className="text-md font-medium ">About Us</h3>
          <div className="text-4xl font-bold space-x-6">
            <span className="text-orange-400">C</span>ode
            <span className="text-orange-400 ml-6">E</span>xplore
            <span className="text-orange-400 ml-6">D</span>esign
            <span className="text-orange-400 ml-6">T</span>ravel
          </div>
          <p className="pt-4 font-semibold">
            Four Words, Countless Possibilities. That’s How The CEDT Team Builds Your Perfect Stay.
          </p>
        </div>

      {/* Member Cards */}
      {members.map((member, index) => (
        <AboutUsCard key={index} {...member} />
      ))}

      {/* Footer text */}
      <div className="col-span-12 text-center pt-20 font-bold text-sm ">
        CEDT Students @ Chulalongkorn University
      </div>
    </section>
  );
}
