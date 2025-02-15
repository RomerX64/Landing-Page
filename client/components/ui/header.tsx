"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/user.context";
import { User, Settings } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="z-30 w-full mt-2 md:mt-5">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div
          className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3
          before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent 
          before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] 
          before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] 
          after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm"
        >
          {/* Logo con efecto hover */}
          <Link href="/" className="inline-block">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="ml-4 h-[35px] w-auto max-w-[200px] transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </Link>

          {/* Desktop sign in links */}
          <ul className="flex items-center justify-end flex-1 gap-3">
            {user ? (
              <>
                {/* Botón de perfil de usuario con hover */}
                <li className="flex items-center justify-center w-8 h-8 text-gray-200 transition-transform duration-300 ease-in-out border rounded-full border-gray-700/50 bg-gray-800/65 hover:scale-110">
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white"
                  >
                    <User size={24} />
                  </Link>
                </li>
                {/* Botón de administración, visible solo si user.isAdmin es true */}
                {user.isAdmin && (
                  <li className="flex items-center justify-center w-8 h-8 text-gray-200 transition-transform duration-300 ease-in-out border rounded-full border-gray-700/50 bg-gray-800/65 hover:scale-110">
                    <Link
                      href="/administracion"
                      className="text-gray-300 hover:text-white"
                    >
                      <Settings size={24} />
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
