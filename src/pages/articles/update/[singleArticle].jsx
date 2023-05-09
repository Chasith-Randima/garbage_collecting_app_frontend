import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { oneArticle, updateArticle } from "actions/article";
import { getCookie } from "actions/auth";
import Message from "components/Message";
import { useRouter } from "next/router";

const SingleArticle = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    article: "",
    images: "",
    location: "",
    formData: "",
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

  const { title, article, location, formData, images } = values;

  useEffect(() => {
    console.log(router.query.updateOne);
    let id = router.query.singleArticle;
    // id = "645712b1fcedf78516198e0e";
    oneArticle(id)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            title: data.doc.title,
            article: data.doc.article,
            location: data.doc.article,
            images: data.doc.images,
            formData: new FormData(),
          });
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
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
  }, [router.isReady]);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;

    if (name == "images") {
      console.log(name, value, "workin..");
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    let data = {
      title: title,
      //   location: location,
      article: article,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }
    let id = router.query.singleArticle;

    await updateArticle(id, values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
          //   routerNew.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

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
        <div className="mt-5 mr-10 border-2 border-gray-200 rounded-xl">
          <form className="block md:grid md:grid-cols-3">
            <div className="md:col-span-1 overflow-hidden">
              {images ? (
                <img
                  src={`http://127.0.0.1:3000/api/v1/articles/image/${images[0]}`}
                  className="md:rounded-full my-5 w-4/5 m-auto"
                />
              ) : (
                <img src="/images/locationMain.png" />
              )}

              <div className="flex justify-center mx-auto">
                <label for="profileImage" className="flex justify-center">
                  <input
                    id="profileImage"
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={handleChange("images")}
                    className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary-50 file:text-primary-700
      hover:file:bg-violet-100"
                  />
                </label>
              </div>
            </div>
            <div className="md:col-span-2 m-2">
              <h2 className="text-gray-400 text-xl font-semibold my-1">
                Profile Info
              </h2>
              <div className="border-2 border-gray-200 rounded-xl p-2 ">
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleChange("title")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-primary-500 placeholder-gray-400"
                    placeholder="Enter the title"
                  />
                </div>

                {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospital Name</label>

                <select
                  type="text"
                  value={hospitals}
                  onChange={handleChange("article")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your article address"
                >
                  <option></option>
                  {hospitalArray &&
                    hospitalArray.doc.map((hospital, index) => {
                      return (
                        <option
                          className="text-gray-600 text-xl"
                          value={hospital.name}
                          key={index}
                        >
                          {hospital.name}
                        </option>
                      );
                    })}
                </select>
              </div> */}

                {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospitals</label>

                <select
                  type="text"
                  value={hospitals}
                  onChange={handleChange("hospitals")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your article address"
                >
                  <option></option>
                  {hospitalArray &&
                    hospitalArray.doc.map((hospital, index) => {
                      return (
                        <option
                          className="text-gray-600 text-xl"
                          value={hospital._id}
                          key={index}
                        >
                          {hospital.name}-{hospital._id}
                        </option>
                      );
                    })}
               
                </select>
              </div> */}

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">article</label>
                  <textarea
                    // rows={"auto"}
                    type="text"
                    value={article}
                    onChange={handleChange("article")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your article"
                  />
                </div>
                {/* <div className="my-2">
                  <label class="text-gray-600 mb-2 block">article</label>
                  <textarea
                    rows={5}
                    type="text"
                    value={article}
                    onChange={handleChange("article")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter a article"
                  />
                </div> */}
              </div>
            </div>
            <div className="text-center col-span-3 my-5  ">
              <input
                type="submit"
                value={"Update"}
                onClick={handleSubmit}
                className="bg-primary-400 p-5 rounded-full text-xl font-bold text-white hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SingleArticle;
