import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { oneArticle } from "actions/article";
import Message from "components/Message";
import { useRouter } from "next/router";
import moment from "moment/moment";

const SingleArticle = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    article: "",
    image: "",
    location: "",
    formData: "",
    createdAt: "",
    userName: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { title, article, userName, location, formData, images, createdAt } =
    values;

  useEffect(() => {
    let id = router.query.singleArticle;
    oneArticle(id)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setValues({
            title: data.doc.title,
            article: data.doc.article,
            location: data.doc.location,
            images: data.doc.images,
            createdAt: data.doc.createdAt,
            userName: data.doc.users[0].name,
          });
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  }, []);
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          {alert.error && (
            <Message
              message={alert.message}
              // alert={"error"}
              resetAlert={resetAlert}
            />
          )}
          {alert.success && (
            <Message
              message={alert.message}
              // alert={"success"}
              resetAlert={resetAlert}
            />
          )}
          {alert.loading && (
            <Message
              message={"Loading...Please Waite..."}
              // alert={"loading"}
              resetAlert={resetAlert}
            />
          )}
        </div>
        <div className="mt-5 py-4 mr-10 border-2 border-gray-200 rounded-xl ">
          <h2 className="text-gray-400 text-2xl font-semibold  text-center  capitalize">
            {title}
          </h2>
          <form className="block ">
            {/* <form className="block md:grid md:grid-cols-3"> */}
            {/* <div className="md:col-span-1 overflow-hidden"> */}
            <div className="mx-5 border-2 border-gray-400 rounded-xl h-1/3">
              <div className=" overflow-hidden h-400">
                {images ? (
                  <img
                    src={`http://127.0.0.1:3000/api/v1/articles/image/${images[0]}`}
                    className="mx-auto w-full h-80 rounded-xl"
                    // className="md:rounded-full mx-auto"
                  />
                ) : (
                  <img
                    src="/images/locationMain.png"
                    className="mx-auto w-2/3 h-80"
                  />
                )}

                {/* <div className="flex justify-center mx-auto">
                  <label for="profileImage" className="flex justify-center">
                    <input
                      id="profileImage"
                      type="file"
                      name="images"
                      accept="image/*"
                      //   onChange={handleChange("images")}
                      className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary-50 file:text-primary-700
      hover:file:bg-violet-100"
                    />
                  </label>
                </div> */}
              </div>
            </div>
            <div className="md:col-span-2 m-2">
              <div className="mx-2 mb-2 p-2 border-2 border-gray-400 rounded-xl grid grid-cols-2">
                <h2 className="col-span-1">
                  Aurthor : <span className="capitalize">{userName}</span>
                </h2>
                <h2 className="col-span-1">
                  Posted : {moment(createdAt).fromNow()}
                </h2>
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-2 mx-2 ">
                <p className="">{article}</p>
              </div>
            </div>
            {/* <div className="text-center col-span-3 my-5  ">
              <input
                type="submit"
                value={"Update Profile"}
                onClick={handleSubmit}
                className="bg-primary-400 p-5 rounded-full text-xl font-bold text-white hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
              />
            </div> */}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SingleArticle;
