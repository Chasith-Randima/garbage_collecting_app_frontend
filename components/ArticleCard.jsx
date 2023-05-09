import Link from "next/link";
import React from "react";
import moment from "moment";

const ArticleCard = ({ doc }) => {
  //   console.log(doc.appointments, "hospital card....");
  // console.log(doc.appointments, doc.doctors, doc.name);
  return (
    <>
      <div className="col-span-4 shadow-2xl rounded-xl overflow-hidden">
        {/* <img src="/images/articleCard.png" className="w-full" /> */}
        {doc && doc.images.length > 0 ? (
          <img
            src={`http://127.0.0.1:3000/api/v1/articles/image/${doc.images[0]}`}
            className="w-full"
          />
        ) : (
          <img src="/images/articleCard.png" className="w-full" />
        )}
        <div className="p-2 text-gray-600 text-xl bg-gray-100">
          <Link href={`/articles/one/${doc._id}`}>
            <h2 className="font-bold text-xl text-gray-700">{doc.title}</h2>
          </Link>
          <div className="flex justify-between gap-1 text-lg">
            <h2 className="my-2">
              Author : <span>{doc.users[0].name}</span>
            </h2>
            <h2 className="my-2">Posted : {moment(doc.createdAt).fromNow()}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
