import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";
import { deleteArticle } from "actions/article";

const Articles = ({ article }) => {
  //   console.log(article.role);
  const router = useRouter();
  const handleDelete = (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        token = getCookie("token_user");
        let clicked = confirm(`You are about to delete ${id} `);
        if (clicked) {
          deleteArticle(id, token)
            .then((data) => {
              console.log(data);
              router.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-6 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block">
          {article._id.substr(article._id.length / 2, article._id.length)}
        </h3>
        {/* <h3 className="md:hidden">
          {article._id.substr(article._id.length - 5, article._id.length)}
        </h3> */}

        <Link
          href={`/articles/one/${article._id}`}
          className="col-span-3 md:col-span-3"
        >
          {/* <Link href={`/user/one/${article._id}`} className="col-span-2"> */}
          {article.title}
        </Link>

        {/* <h3 className="hidden md:blcok">
          {article.hospitals.length > 0 && article.hospitals[0].name}
        </h3> */}
        {/* <h3 className="hidden md:block">{article.email}</h3>
        <h3 className="">{article.role}</h3> */}
        <Link href={`/articles/update/${article._id}`} className="">
          {/* <Link href={`/user/one/${article._id}`} className="col-span-2"> */}
          <h2 className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer mr-2">
            Update
          </h2>
        </Link>

        <h3
          className="p-1 ml-2 bg-red-400 text-white hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer"
          onClick={() => handleDelete(article._id)}
        >
          Delete
        </h3>

        {/* <Link href={`/updateRole/user/${article._id}`} className="">
        
          update
        </Link>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(article._id)}
    
          className="cursor-pointer"
        >
          Delete
        </h3> */}
      </div>
    </>
  );
};

export default Articles;
