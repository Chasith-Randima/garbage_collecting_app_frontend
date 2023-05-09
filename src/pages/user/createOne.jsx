import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { signup } from "../../../actions/auth";
import { getCookie } from "actions/auth";
import Message from "components/Message";
import { createUser } from "actions/user";
import { useRouter } from "next/router";

const CreateOne = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    image: "",
    role: "",
    password: "",
    passwordConfirm: "",
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

  const { name, email, password, passwordConfirm, role, formData, images } =
    values;

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
      name: name,
      role: role,
      password: password,
      passwordConfirm: passwordConfirm,
      email: email,
    };

    // for (const key in data) {
    //   formData.append(key, data[key]);
    //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    await createUser(data, token)
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
            <div className="md:col-span-3 m-2">
              <h2 className="text-gray-400 text-xl font-semibold my-1 text-center">
                Create A Account
              </h2>
              <div className="border-2 border-gray-200 rounded-xl p-2 ">
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange("name")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-primary-500 placeholder-gray-400"
                    placeholder="Enter the name"
                  />
                </div>

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">User Role</label>

                  <select
                    type="text"
                    value={role}
                    onChange={handleChange("role")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your password passwordConfirm,address"
                  >
                    <option>Select User Type</option>
                    <option className="text-gray-600 text-xl" value={"staff"}>
                      Staff Memeber
                    </option>
                    <option className="text-gray-600 text-xl" value={"captain"}>
                      Green Captain
                    </option>
                  </select>
                </div>

                {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospitals</label>

                <select
                  type="text"
                  value={hospitals}
                  onChange={handleChange("hospitals")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your password passwordConfirm,address"
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
                  <label class="text-gray-600 mb-2 block">email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={handleChange("email")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter a email"
                  />
                </div>

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={handleChange("password")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">
                    Password Confirm
                  </label>
                  <input
                    type="text"
                    value={passwordConfirm}
                    onChange={handleChange("passwordConfirm")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Confirm Your Password"
                  />
                </div>
              </div>
            </div>
            <div className="text-center col-span-3 my-5  ">
              <input
                type="submit"
                value={"Create Account"}
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

export default CreateOne;
