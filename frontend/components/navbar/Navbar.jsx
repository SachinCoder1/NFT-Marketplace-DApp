import React from "react";
import Logo from "../../subcomponents/logo/Logo";
import Link from "next/link";
import { navLinks } from "../../data";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center gap-x-10 m-2 p-2 border-b-2">
      <div className="flex gap-x-10">
        {/* <div className="!text-3xl text-orange-400 font-bold px-2"> */}
        <Logo />
        {/* </div> */}
        <div>
          {navLinks?.map(({ title, link }, id) => (
            <Link id={id} href={link}>
              <a
                className={`${
                  router.pathname == link
                    ? "text-orange-500 py-2 my-2 font-semibold "
                    : "text-orange-600"
                }  hover:underline mx-2 text-base `}
                id={id}
              >
                {title}
              </a>
            </Link>
          ))}
        </div>
      </div>
      {/* <div>
        <ConnectButton moralisAuth={false} />
      </div> */}
    </div>
  );
}
