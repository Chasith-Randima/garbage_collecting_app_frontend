import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { isAuth } from "../actions/auth";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";
import { isMobile, isBrowser } from "react-device-detect";

const Sidebar = ({ showSideBar }) => {
  const [patientId, setPatientId] = useState();
  const [doctorId, setDoctorId] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [logInShow, setLogInShow] = useState();

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(JSON.parse(localStorage.getItem("user"))._id);
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
    console.log(patientId, userId, doctorId);
    setLogInShow(isMobile);
  }, [isMobile]);
  // console.log(router.asPath);
  // console.log(router.asPath == "/mainPage");

  const userSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Articles
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/incident/createIncident"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/incident/createIncident")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Create Incident
          </h2>
        </div>
        <SidebarLink
          link={"/garbageSpot/allGarbageSpots"}
          title={"All Garbage Spots"}
        />
        <SidebarLink link={"/incident/allIncidents"} title={"All Incidents"} />
        {userId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
              router.asPath == `/profile/update/${userId}`
                ? "bg-primary-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/onePatient/${patientId}`}
              onClick={() => router.push(`/profile/update/${userId}`)}
              className="my-1 ml-2 text-xl cursor-pointer"
            >
              Profile
            </h2>
          </div>
        )}
      </div>
    );
  };
  const adminSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Articles
          </h2>
        </div>
        <SidebarLink
          link={"/incident/uncheckedIncidence"}
          title={"Unchecked Incidents"}
        />
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/incident/allIncidents"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/incident/allIncidents")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            All Incidents
          </h2>
        </div>
        <SidebarLink
          link={"/incident/approvedIncidents"}
          title={"Approved Incidents"}
        />

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/incident/createIncident"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/incident/createIncident")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Create Incident
          </h2>
        </div>

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/articles/allArticles"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/articles/allArticles")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            All Articles
          </h2>
        </div>

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/articles/createArticle"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/articles/createArticle")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Create Article
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/garbageSpot/createGarbageSpot"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/garbageSpot/createGarbageSpot")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Create Garbage Spot
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/garbageSpot/allGarbageSpots"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/garbageSpot/allGarbageSpots")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            All Garbage Spots
          </h2>
        </div>

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/profile/allUsers"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/profile/allUsers")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            All Users
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
            router.asPath == "/user/createOne"
              ? "bg-primary-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/user/createOne")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Create User
          </h2>
        </div>

        {userId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-primary-300 hover:text-white transition-all ${
              router.asPath == `/profile/update/${userId}`
                ? "bg-primary-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/onePatient/${patientId}`}
              onClick={() => router.push(`/profile/update/${userId}`)}
              className="my-1 ml-2 text-xl cursor-pointer"
            >
              Profile
            </h2>
          </div>
        )}
      </div>
    );
  };

  const captainSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <SidebarLink link={"/"} title={"Articles"} />
        <SidebarLink
          link={"/incident/uncheckedIncidence"}
          title={"Unchecked Incidents"}
        />
        <SidebarLink
          link={"/incident/approvedIncidents"}
          title={"Approved Incidents"}
        />
        <SidebarLink
          link={"/incident/createIncident"}
          title={"Create Incident"}
        />

        <SidebarLink link={"/incident/allIncidents"} title={"All Incidents"} />
        <SidebarLink
          link={"/garbageSpot/allGarbageSpots"}
          title={"All Garbage Spots"}
        />
        {userId && (
          <SidebarLink link={`/profile/update/${userId}`} title={"Profile"} />
        )}
        {/* <SidebarLink
          link={"/incident/uncheckedIncidence"}
          title={"Unchecked Incidence"}
        /> */}
      </div>
    );
  };

  const staffSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <SidebarLink link={"/"} title={"Articles"} />
        <SidebarLink
          link={"/incident/approvedIncidents"}
          title={"Approved Incidents"}
        />
        <SidebarLink
          link={"/garbageSpot/allGarbageSpots"}
          title={"All Garbage Spots"}
        />
        {/* <SidebarLink
          link={"/incident/approvedIncidents"}
          title={"Approved Incidents"}
        /> */}
        {userId && (
          <SidebarLink link={`/profile/update/${userId}`} title={"Profile"} />
        )}
      </div>
    );
  };

  const visitorSidebar = () => {
    return (
      <>
        <SidebarLink link={"/"} title={"Articles"} />
        <SidebarLink
          link={"/garbageSpot/allGarbageSpots"}
          title={"All Garbage Spots"}
        />
        {logInShow && <SidebarLink link={"/auth/LogIn"} title={"LogIn"} />}
      </>
    );
  };
  return (
    <>
      {/* <div className={`${showSideBar ? "" : "hidden"}`}> */}
      {/* <div> */}
      <h2 className="text-gray-400 text-xl font-semibold my-3 md:my-1">
        Dashboard
      </h2>
      {/* {console.log(userId, patientId, doctorId)} */}
      {/* <div> */}
      {/* {userId &&
        JSON.parse(localStorage.getItem("user")).role == "admin" &&
        adminSidebar()}
      {userId &&
        JSON.parse(localStorage.getItem("user")).role != "admin" &&
        staffSidebar()}

      {patientId && patientSidebar()}
      {doctorId && doctorSidebar()} */}
      {userId && userData.role == "user" && userSidebar()}
      {userId && userData.role == "admin" && adminSidebar()}
      {userId && userData.role == "captain" && captainSidebar()}
      {userId && userData.role == "staff" && staffSidebar()}
      {userId == undefined && visitorSidebar()}

      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Sidebar;
