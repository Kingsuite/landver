"use client";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { Search, Home } from "lucide-react";
import { FaX } from "react-icons/fa6";
import { useTheme } from "next-themes";

import ThemeSwitch from "./ThemeSwitcher";
import Link from "next/link";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchIconClicked, setIsSearchIconClicked] =
    useState<boolean>(false);
  const [logo, setLogo] = useState("/images/LANDVER-NO-BG.png");

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogo("/images/LANDVER_BLACK.jpg");
    } else {
      setLogo("/images/LANDVER-NO-BG.png");
    }
  }, [resolvedTheme]);

  return (
    <header className="text-black dark:text-white bg-white dark:bg-[#0D0D0D]">
      <nav className="flex items-center justify-between border dark:border-none">
        <div className="flex items-center">
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <Image
            src={logo}
            alt="Landver Logo"
            className="w-[3.5em] ml-3"
            width={56}
            height={56}
          />
          {isSearchIconClicked ? (
            <Home size={40} />
          ) : (
            <ul>
              <Link href="/" className="hover:text-gray-400 font-bold">Home</Link>
            </ul>
          )}
          <ul className="hidden md:flex space-x-6 items-center ml-2">
            <li className="hover:text-gray-400">API</li>
            <Link href="/Guides" className="hover:text-gray-400">
              GUIDES
            </Link>
          </ul>
        </div>
        <div className="flex gap-4 items-center p-2">
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/NoshonNetworks/landver/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <FaGithub className="w-5 h-5 inline mr-2" />
              <span>Github</span>
            </a>
          </div>
          <div className=" md:block hidden">
            <ThemeSwitch />
          </div>
          <div>
            <input
              type="search"
              className="border-2 border-gray-800 dark:border-gray-400 p-3 bg-inherit rounded-lg hidden md:block"
              placeholder="Search"
            />
            {isSearchIconClicked ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Docs"
                  className={`p-3 rounded-lg bg-inherit text-black border-2 border-black dark:border-gray-500 placeholder:text-center w-[80%] block ${
                    isSearchIconClicked
                      ? "sm:absolute sm:top-2 sm:left-1 md:block lg:block"
                      : ""
                  } md:w-fit`}
                />
                <FaX
                  onClick={() => setIsSearchIconClicked(false)}
                  className="p-4 rounded text-gray-700 dark:text-gray-300"
                  size={45}
                />
              </div>
            ) : (
              <Search
                className="h-[30px] md:hidden"
                size={30}
                onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-[80%] h-full bg-white dark:bg-[#0D0D0D] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-around border">
          <div className="grid grid-cols-2 items-center justify-evenly p-3 py-0">
            <Image
              src={logo}
              alt="Landver Logo"
              className="w-[3.5em]"
              width={56}
              height={56}
            />
            <ul>
              <li className="hover:text-gray-400 font-bold">Home</li>
            </ul>
          </div>
          <div>
            <button>
              <ThemeSwitch />
            </button>
          </div>
          <FaX onClick={() => setIsOpen(false)} className="h-[75px]" />
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-6 text-2xl">
          <a href="#" onClick={() => setIsOpen(false)}>
            API
          </a>
          <Link href="/Guides" onClick={() => setIsOpen(false)}>
            GUIDES
          </Link>
          <select
            name=""
            id=""
            className="border-2 border-black  dark:border-gray-400 rounded p-2 bg-inherit"
          >
            <option value=" " className="dark:text-black">
              0.3
            </option>
            <option value="" className="dark:text-black">
              0.2
            </option>
            <option value="" className="dark:text-black">
              0.1
            </option>
          </select>

          <a
            href="https://github.com/NoshonNetworks/landver/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-gray-300"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
