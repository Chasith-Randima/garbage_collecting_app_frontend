import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { oneIncident } from "actions/incident";
import Message from "components/Message";
import { useRouter } from "next/router";
import { getCookie } from "actions/auth";
import { updateIncident, deleteIncident } from "actions/incident";
import Mapp from "components/Map";

const SingleIncident = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    city: "",
    formData: "",
    checked: "",
    closed: "",
    flag: "",
    coordinates: "",
    locationCoordinates: {},
  });
  const [coverImage, setCoverImage] = useState(0);
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const [userRole, setUserRole] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (
        JSON.parse(localStorage.getItem("user")).role == "admin" ||
        JSON.parse(localStorage.getItem("user")).role == "captain"
      ) {
        setDeleteShow(true);
      }
    }
    setUserRole(JSON.parse(localStorage.getItem("user")).role);
  }, []);
  const {
    title,
    description,
    city,
    formData,
    checked,
    closed,
    images,
    flag,
    coordinates,
    locationCoordinates,
  } = values;

  const [allData, setAllData] = useState();
  useEffect(() => {
    let id = router.query.singleIncident;
    oneIncident(id)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setAllData([data.doc]);
          setValues({
            title: data.doc.title,
            description: data.doc.description,
            city: data.doc.city,
            checked: data.doc.checked,
            closed: data.doc.closed,
            flag: data.doc.flag,
            coordinates: data.doc.coordinates,
            // locationCoordinates: JSON.parse(data.doc.locationCoordinates),
            images: data.doc.images,
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
  }, [router.isReady]);

  // console.log(
  //   locationCoordinates,
  //   locationCoordinates.coordinates,
  //   locationCoordinates.description
  // );

  const handleUpdate = async (data) => {
    console.log(data);

    if (JSON.parse(localStorage.getItem("user")).role == "user") {
      setAlert({
        ...alert,
        loading: false,
        message: "you dont have the persmission to perform this action",
        error: true,
        success: false,
      });

      window.setTimeout(() => {
        resetAlert();
        // router.reload();
      }, 1000);

      return;
    }
    // e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    // let data = {
    //   title: title,
    //   location: location,
    //   description: description,
    // };

    // for (const key in data) {
    //   formData.append(key, data[key]);
    //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }
    let id = router.query.singleIncident;

    let tempForm = new FormData();
    console.log(data, tempForm);
    for (const key in data) {
      tempForm.append(key, data[key]);
      // setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }

    await updateIncident(id, tempForm, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          // setValues({ title: "", description: "", location: "" });
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
            router.reload();
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

  const handleDelete = async (id) => {
    console.log(id);
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
            router.push("/incident/allIncidents");
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

  console.log(values);
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
          <h2 className="text-gray-400 text-2xl font-semibold  text-center">
            Incident Info
          </h2>
          <form className="block ">
            {/* <form className="block md:grid md:grid-cols-3"> */}
            {/* <div className="md:col-span-1 overflow-hidden"> */}
            <div className="mx-5 border-2 border-gray-400 rounded-xl h-1/3">
              <div className=" overflow-hidden h-400">
                {images ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/incidents/image/${images[coverImage]}`}
                    className="mx-auto w-full h-80 rounded-xl"
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
              <div className="grid grid-cols-4">
                {images &&
                  images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setCoverImage(index)}
                        className="border-2 border-gray-400 overflow-hidden rounded-b-lg cursor-pointer"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/incidents/image/${images[index]}`}
                          className="w-full h-[100px]"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="md:col-span-2 m-2">
              <div className="border-2 border-gray-200 rounded-xl p-2 ">
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">Title</label>
                  <h2
                    type="text"
                    // value={title}
                    // onChange={handleChange("title")}
                    class="block w-full border bg-green-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400"
                    // placeholder="Enter the title"
                  >
                    {title}
                  </h2>
                </div>
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">Flag</label>
                  {flag == "red" && (
                    <h2
                      type="text"
                      // value={title}
                      // onChange={handleChange("title")}
                      class={`block w-full   bg-red-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400`}
                      // placeholder="Enter the title"
                    >
                      {flag}
                    </h2>
                  )}
                  {flag == "yellow" && (
                    <h2
                      type="text"
                      // value={title}
                      // onChange={handleChange("title")}
                      class={`block w-full   bg-yellow-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400`}
                      // placeholder="Enter the title"
                    >
                      {flag}
                    </h2>
                  )}
                  {flag == "blue" && (
                    <h2
                      type="text"
                      // value={title}
                      // onChange={handleChange("title")}
                      class={`block w-full   bg-blue-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400`}
                      // placeholder="Enter the title"
                    >
                      {flag}
                    </h2>
                  )}
                  {flag == "none" && (
                    <h2
                      type="text"
                      // value={title}
                      // onChange={handleChange("title")}
                      class={`block w-full   bg-green-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400`}
                      // placeholder="Enter the title"
                    >
                      {flag}
                    </h2>
                  )}
                </div>
                {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospital Name</label>

                <select
                  type="text"
                  value={hospitals}
                  onChange={handleChange("description")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray placeholder-gray-400"
                  placeholder="Enter your location address"
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

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">City</label>
                  <h2
                    // type="text"
                    // value={city}
                    // onChange={handleChange("location")}
                    class="block w-full border bg-primary-200 border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0 focus:border-gray placeholder-gray-400"
                    // placeholder="Enter your location"
                  >
                    {city}
                  </h2>
                </div>
                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">Description</label>
                  <p
                    // rows={5}
                    // type="text"
                    // value={description}
                    // onChange={handleChange("description")}
                    class="block w-full bg-primary-200 border border-gray-300 px-4 py-3 text-gray-600 text-lg rounded focus:ring-0 focus:border-gray placeholder-gray-400"
                    // placeholder="Enter a description"
                  >
                    {description}
                  </p>
                </div>
                {userRole == "captain" && (
                  <div className="my-2">
                    <label class="text-gray-600 mb-2 block">
                      Required Action
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <select
                        type="text"
                        value={flag && flag}
                        onChange={(e) =>
                          setValues({ ...values, flag: e.target.value })
                        }
                        // onChange={handleChange("flag")}
                        class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray placeholder-gray-400 col-span-2"
                        placeholder="Enter your location address"
                      >
                        <option></option>

                        <option
                          className="text-gray-600 text-xl"
                          value={"red"}
                          // key={index}
                        >
                          Red - Imediate Action Required
                        </option>
                        <option
                          className="text-gray-600 text-xl"
                          value={"yellow"}
                          // key={index}
                        >
                          Yellow - Quick Action required
                        </option>
                        <option
                          className="text-gray-600 text-xl"
                          value={"blue"}
                          // key={index}
                        >
                          Blue - Action Required
                        </option>
                      </select>
                      <h2
                        className="font-bold capitalize text-white p-2 bg-green-400 text-center rounded-xl hover:bg-green-600 transition-all cursor-pointer"
                        onClick={() =>
                          handleUpdate({
                            flag: flag,
                          })
                        }
                      >
                        Set Flag
                      </h2>
                    </div>
                  </div>
                )}
                <div className="my-2 grid grid-cols-2">
                  <h2 className="font-bold text-center">Checked</h2>
                  {checked ? (
                    <h2 className="font-bold capitalize text-white p-2 bg-green-200 text-center rounded-xl">{`${checked}`}</h2>
                  ) : (
                    <h2
                      className="font-bold capitalize text-white p-2 bg-green-400 text-center rounded-xl hover:bg-green-600 transition-all cursor-pointer"
                      onClick={() => handleUpdate({ checked: true })}
                    >{`${checked}`}</h2>
                  )}
                </div>
                <div className="my-2 grid grid-cols-2">
                  <h2 className="p-2 font-bold text-center">Closed</h2>
                  {closed ? (
                    <h2 className="font-bold capitalize text-white p-2 bg-green-200 text-center rounded-xl">{`${closed}`}</h2>
                  ) : userRole != "user" ? (
                    <h2
                      className="font-bold capitalize text-white p-2 bg-green-400 text-center rounded-xl hover:bg-green-600 transition-all cursor-pointer"
                      onClick={() => handleUpdate({ closed: true })}
                    >{`${closed}`}</h2>
                  ) : (
                    <h2
                      className="font-bold capitalize text-white p-2 bg-green-400 text-center rounded-xl hover:bg-green-600 transition-all cursor-pointer"
                      // onClick={() => handleUpdate({ closed: true })}
                    >{`${closed}`}</h2>
                  )}
                </div>
                {/* {console.log(id)} */}
                {deleteShow ? (
                  <div>
                    <h2
                      className="font-bold capitalize text-white p-2 bg-red-400 text-center rounded-xl hover:bg-red-600 transition-all cursor-pointer"
                      onClick={() => handleDelete(router.query.singleIncident)}
                    >
                      Delete
                    </h2>
                  </div>
                ) : null}
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
        <div className="mt-5 py-4 mr-10 border-2 border-gray-200 rounded-xl ">
          {allData && <Mapp allData={allData} />}
        </div>
      </Layout>
    </>
  );
};

export default SingleIncident;
