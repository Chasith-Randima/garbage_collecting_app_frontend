import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";
import { deleteUser } from "actions/user";
import { deleteIncident } from "actions/incident";

const Incidents = ({ incident }) => {
  console.log(incident.role);
  const router = useRouter();
  const handleDelete = async (id) => {
    // e.preventDefault();
    // console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      //   console.log(JSON.parse(localStorage.getItem("user"))._id, id);
      //   if (JSON.parse(localStorage.getItem("user"))._id == id) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to delete ${id} `);

      if (clicked) {
        await deleteIncident(id, token)
          .then((data) => {
            console.log(data);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //   }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 gap-2 md:grid-cols-6 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block col-span-1">
          {incident._id.substr(incident._id.length / 2, incident._id.length)}
        </h3>
        {/* <h3 className="md:hidden">
          {incident._id.substr(incident._id.length - 5, incident._id.length)}
        </h3> */}

        <Link
          href={`/incident/${incident._id}`}
          className="col-span-3 md:col-span-3"
        >
          {/* <Link href={`/user/one/${incident._id}`} className="col-span-2"> */}
          {incident.title}
        </Link>

        {/* <h3 className="hidden md:blcok">
          {incident.hospitals.length > 0 && incident.hospitals[0].name}
        </h3> */}
        {/* <h3 className="hidden md:block">{incident.email}</h3>
        <h3 className="">{incident.role}</h3> */}

        <Link href={`/incident/update/${incident._id}`}>
          {/* <Link href={`/user/one/${incident._id}`} className="col-span-2"> */}
          <h2 className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer">
            Update
          </h2>
        </Link>
        <h3
          className="p-1 bg-red-400 text-white hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer"
          onClick={() => handleDelete(incident._id)}
        >
          {" "}
          Delete
        </h3>

        {/* <Link href={`/updateRole/user/${incident._id}`} className="">
        
          update
        </Link>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(incident._id)}
    
          className="cursor-pointer"
        >
          Delete
        </h3> */}
      </div>
    </>
  );
};

export default Incidents;
