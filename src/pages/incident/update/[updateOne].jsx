import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { createIncident, oneIncident, updateIncident } from "actions/incident";
import { getCookie } from "actions/auth";
import Message from "components/Message";
import { useRouter } from "next/router";
import axios from "axios";

const UpdateOne = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    description: "",
    images: "",
    city: "",
    latitude: "",
    longitude: "",
    address: "",
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

  const {
    title,
    description,
    latitude,
    longitude,
    address,
    city,
    formData,
    images,
  } = values;

  const getLocation = async () => {
    let url = `https://ipapi.co/json`;
    let result = await axios(url, {
      method: "GET",
    })
      .then((response) => {
        // console.log(values);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(result);
    if (result && result.latitude != undefined) {
      // setGeoData(result);
      // console.log(geoData, geoData.latitude);
      // let latlong = [];
      // latlong.push(result.latitude);
      // latlong.push(result.longitude);
      setValues({
        ...values,
        city: result.city,
        // coordinates: latlong,
        latitude: result.latitude,
        longitude: result.longitude,
      });
    }
  };

  useEffect(() => {
    console.log(router.query.updateOne);
    let id = router.query.updateOne;
    oneIncident(id)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            title: data.doc.title,
            description: data.doc.description,
            city: data.doc.city,
            latitude: data.doc.coordinates.split(",")[0],
            longitude: data.doc.coordinates.split(",")[1],
            address: data.doc.address,
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
          }, 1500);
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
      city: city,
      description: description,
      coordinates: `${latitude},${longitude}`,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }
    let id = router.query.updateOne;

    await updateIncident(id, values.formData, token)
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
            {/* <div className="md:col-span-1 overflow-hidden">
              {images ? (
                <img
                  src={`http://127.0.0.1:3000/api/v1/users/image/${images[0]}`}
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
                    //   onChange={handleChange("images")}
                    className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary-50 file:text-primary-700
      hover:file:bg-violet-100"
                  />
                </label>
              </div>
            </div> */}
            <div className="md:col-span-1 overflow-hidden">
              {/* {images ? (
                <img
                  src={`http://127.0.0.1:3000/api/v1/users/image/${images[0]}`}
                  className="md:rounded-full my-5 w-4/5 m-auto"
                />
              ) : ( */}
              <img
                src={`http://127.0.0.1:3000/api/v1/incidents/image/${images[0]}`}
              />
              {/* )} */}

              <div className="flex justify-center mx-auto mt-5">
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
                Update Incident
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
                  onChange={handleChange("description")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
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

                {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospitals</label>

                <select
                  type="text"
                  value={hospitals}
                  onChange={handleChange("hospitals")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your location address"
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

                {/* <div className="my-2">
                  <label class="text-gray-600 mb-2 block">city</label>
                  <input
                    type="text"
                    value={city}
                    onChange={handleChange("city")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your location"
                  />
                </div> */}

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={handleChange("city")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your location"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-gray-600 mb-2 block">Latitude</label>
                      <input
                        type="text"
                        value={latitude}
                        onChange={handleChange("latitude")}
                        class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div>
                      <label class="text-gray-600 mb-2 block">Longitude</label>
                      <input
                        type="text"
                        value={longitude}
                        onChange={handleChange("longitude")}
                        class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  {/* <label class="text-gray-600 mb-2 block">location</label> */}
                  <input
                    type="button"
                    value={"Device Location"}
                    onClick={getLocation}
                    // onChange={handleChange("location")}
                    class="block w-full border border-gray-300 px-4 py-3  text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 cursor-pointer bg-green-400 text-white font-bold hover:bg-green-600 transition-all"
                    // placeholder="Enter your location"
                  />
                </div>
                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">Description</label>
                  <textarea
                    rows={5}
                    type="text"
                    value={description}
                    onChange={handleChange("description")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter a description"
                  />
                </div>
              </div>
            </div>
            <div className="text-center col-span-3 my-5  ">
              <input
                type="submit"
                value={"Update Incident"}
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

export default UpdateOne;
