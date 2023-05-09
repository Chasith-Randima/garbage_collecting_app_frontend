import React from "react";
import { useRouter } from "next/router";

const SidebarLink = ({ link, title }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
          router.asPath == `${link}`
            ? "bg-primary-300 text-white"
            : "text-black bg-gray-300"
        }`}
      >
        {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
        <h2
          // href="/mainPage"
          onClick={() => router.push(`${link}`)}
          className="my-1 ml-2 text-xl cursor-pointer"
        >
          {title}
        </h2>
      </div>
    </>
  );
};

export default SidebarLink;
