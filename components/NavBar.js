import React from "react";
import { useState, useEffect } from "react";
import { logOut } from "actions/auth";
// import { logOutDoctor } from "actions/doctor";
// import { logOutPatient } from "actions/patient";
// import { logOutUser } from "actions/user";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setSideBar, showSideBar }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  //   const patitentLogout = () => {
  //     return (
  //       <>
  //         <div className="">
  //           {patient.name} <span>logged in as : {patient.role}</span>
  //         </div>
  //       </>
  //     );
  //   };
  //   const doctorLogout = () => {
  //     return (
  //       <>
  //         <div className="">
  //           {doctor.name} <span>logged in as : {doctor.role}</span>
  //         </div>
  //       </>
  //     );
  //   };
  const userLogout = () => {
    return (
      <>
        <div className="">
          {user.name} <span>logged in as : {user.role}</span>
        </div>
      </>
    );
  };

  const handleLogout = async (func) => {
    await func()
      .then((data) => {
        console.log(data);
        if (router.asPath == "/") {
          router.reload();
        } else {
          router.push("/");
        }
        // Router.replace(Router.asPath);
      })
      .catch((err) => {
        console.log();
      });
  };
  return (
    <>
      <nav className="w-full h-auto grid grid-cols-2 p-2 bg-primary-400 text-white gap-2">
        {/* <nav
        className={
          router.asPath == "/mainPage"
            ? "w-full h-auto grid grid-cols-3 p-8 bg-blue-400 text-white gap-2"
            : "w-full h-auto grid grid-cols-2 p-8 bg-blue-400 text-white gap-2"
        }
      > */}
        <div className=" font-bold text-xl w-1/3  rounded">
          {/* <img src="/img/opd-logo.png" className="w-full h-20" /> */}
          <h2 className="w-full h-20 text-4xl mx-auto mt-4">GreenTF</h2>
        </div>
        {/* {router.asPath == "/mainPage" && (
          <div>
            <SearchHospitals />
          </div>
        )} */}

        <div className="flex justify-end my-auto ">
          {/* {patient._id && (
            <>
              <div
                className="cursor-pointer hidden md:block mx-3 p-3 text-blue-500 font-semibold rounded bg-white hover:bg-blue-500 hover:text-white transition-all"
                onClick={() =>
                  router.push(`/infoProfile/patient/${patient._id}`)
                }
              >
                {patient.name.split(" ")[0]} <span> : {patient.role}</span>
              </div>
              <div className="hidden md:block mx-3 p-3 text-blue-500 font-semibold rounded bg-white hover:bg-blue-500 hover:text-white transition-all">
                <h2
                  onClick={() => handleLogout(logOutPatient)}
                  className="cursor-pointer"
                >
                  LogOut
                </h2>
              </div>
            </>
          )} */}
          {/* {doctor._id && (
            <>
              <div
                className="cursor-pointer hidden md:block mx-3 p-3 text-blue-500 font-semibold rounded bg-white hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => router.push(`/infoProfile/doctor/${doctor._id}`)}
              >
                {doctor.name.split(" ")[0]} <span> : {doctor.role}</span>
              </div>
              <div className="hidden md:block mx-3 p-3 text-blue-500 font-semibold rounded bg-white hover:bg-blue-500 hover:text-white transition-all">
                <h2
                  onClick={() => handleLogout(logOutDoctor)}
                  className="cursor-pointer"
                >
                  LogOut
                </h2>
              </div>
            </>
          )} */}
          {user._id && (
            <>
              <div
                className="cursor-pointer hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all"
                onClick={() => router.push(`/profile/${user._id}`)}
              >
                {user.name.split(" ")[0]}{" "}
                <span className="my-2"> : {user.role}</span>
              </div>
              <div className=" hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all">
                <h2
                  onClick={() => handleLogout(logOut)}
                  className="cursor-pointer"
                >
                  LogOut
                </h2>
              </div>
            </>
          )}
          {!user._id && (
            <div className="cursor-pointer hidden md:block mx-3 p-3 text-primary-500 font-semibold rounded bg-white hover:bg-primary-500 hover:text-white transition-all">
              <Link href="/auth/LogIn">LogIn</Link>
            </div>
          )}
          <div className="md:hidden" onClick={() => setSideBar(!showSideBar)}>
            <FaBars className="font-bold text-4xl cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
