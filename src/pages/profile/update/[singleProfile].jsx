import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
// import { withRouter } from "next/router";
import { getCookie } from "actions/auth";
import { oneUser, updateUser, updateUserPassword } from "actions/user";
import Message from "components/Message";
import { useRouter } from "next/router";
// import { hospitalsNamesIds } from "actions/hospital";

const User = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    formData: "",
    hospitals: "",
  });
  const router = useRouter();

  const [authValues, setAuthValues] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
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

  const { name, email, formData, images } = values;

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");
    let id = router.query.singleProfile;

    if (router.isReady) {
      oneUser(id, token)
        .then((data) => {
          if (data.status && data.status == "success") {
            console.log(data);
            setValues({
              name: data.doc.name,
              images: data.doc.images,
              formData: new FormData(),

              email: data.doc.email,
              //   formData: new FormData(),
              //   images: data.doc.images,
              //   hospitals:
              //     data.doc.hospitals.length > 0 && data.doc.hospitals[0]._id,
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
            }, 1000);
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
    }
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
      name: name,
      email: email,
      //   hospitalName,
      //   hospitals,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }

    let id = router.query.singleProfile;

    await updateUser(id, values.formData, token)
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
            resetAlert();
          }, 1000);
          router.reload();
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

  // update password

  const { currentPassword, password, passwordConfirm } = authValues;

  const handleAuthChange = (name) => (e) => {
    e.preventDefault();
    setAuthValues({ ...authValues, [name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });

    let token = getCookie("token_user");

    let data = {
      currentPassword,
      password,
      passwordConfirm,
    };

    let id = router.query.singleProfile;

    await updateUserPassword(id, data, token)
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
            resetAlert();
          }, 1000);
          router.reload();
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
      <h2 className="text-gray-400 text-2xl mt-2 font-semibold ">
        Update Profile
      </h2>
      <div className="mt-2 mr-4 md:mr-10 border-2 border-gray-200 rounded-xl">
        <form className="block md:grid md:grid-cols-3">
          <div className="md:col-span-1 overflow-hidden">
            {images ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/users/image/${images[0]}`}
                className="md:rounded-full my-5 w-4/5 m-auto"
              />
            ) : (
              <img src="/img/profile.png" />
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
      file:bg-gray-50 file:text-gray-700
      hover:file:bg-violet-100"
                />
              </label>
            </div>
          </div>
          <div className="md:col-span-2 m-2">
            {/* <h2 className="text-gray-400 text-xl font-semibold my-1">
              Profile Info
            </h2> */}
            <div className="border-2 border-gray-200 rounded-xl p-2 ">
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                />
              </div>
              {/* <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospital Name</label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={handleChange("hospitalName")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Hospital Name"
                />
              </div> */}

              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange("email")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Email"
                />
              </div>
            </div>
          </div>
          <div className="text-center col-span-3 my-5  ">
            <input
              type="submit"
              value={"Update Profile"}
              onClick={handleSubmit}
              className="bg-primary-400 p-5 rounded-full text-xl font-bold text-white hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
      <div className="mt-5 mr-10 border-2 border-gray-200 rounded-xl">
        <form className="">
          <div className="col-span-2 m-2 p-4">
            <h2 className="text-gray-400 text-xl font-semibold mb-5">
              Update Password
            </h2>
            <div className="border-2 border-gray-200 rounded-xl p-2 ">
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">
                  Current Password
                </label>
                <input
                  type="text"
                  value={currentPassword}
                  onChange={handleAuthChange("currentPassword")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-gray-500 placeholder-gray-400"
                  placeholder="Enter your Current Password"
                />
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={handleAuthChange("password")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Confirm Password</label>
                <input
                  type="text"
                  value={passwordConfirm}
                  onChange={handleAuthChange("passwordConfirm")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Confirm Password"
                />
              </div>
            </div>
          </div>
          <div className="text-center  my-5  ">
            <input
              type="submit"
              value={"Update Password"}
              onClick={handleAuthSubmit}
              className="bg-primary-400 p-5 rounded-full text-xl font-bold text-white hover:bg-primary-500 hover:text-white transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default User;
