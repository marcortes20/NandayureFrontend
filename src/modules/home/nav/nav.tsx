"use client";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { IoMenuOutline } from "react-icons/io5";
import NavLinks from "./nav-links";

const Nav = () => {
  return (
    <>
      <nav
        className="flex px-5 py-1 justify-between items-center w-full border-b-4"
        style={{
          borderImage:
            "linear-gradient(to right, #4caf50 33%, #eacd48 33%, #eacd48 66%, #34b1fd 66%) 1",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center items-center mx-2">
          <Image src={"/LogoMuni.png"} alt="Logo Muni" width={50} height={50} />
          <Link href="/">
            <span
              className={`${titleFont.className} hidden sm:block ml-3 text-2xl antialiased font-bold`}
            >
              Recursos Humanos Nandayure
            </span>
          </Link>
        </div>
        {/* Center Menu*/}
        <div className=" hidden sm:block">
          <NavLinks />
        </div>
        <div className="block sm:hidden w-5 h-5">
          <IoMenuOutline />
        </div>
      </nav>
    </>
  );
};

export default Nav;
