import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { allPatients } from "actions/patient";
import SearchPatients from "components/search/all/SearchPatients";
import { getCookie } from "actions/auth";
import Patients from "components/Patients";
import { allUsers } from "actions/user";
import Users from "components/Users";
// import SearchUsers from "components/search/all/SearchUsers";
import Message from "components/Message";
// import cookie from "js-cookie";
// import Appointment from "components/Appointment";

const Index = () => {
  // const Index = ({ data, token, cookie }) => {
  //   console.log(token, cookie);
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  //   const [totalPages, setTotalPages] = useState(
  //     Math.ceil(allData.totalCount / limit)
  //   );
  console.log(getCookie("token_user"));
  const [name, setName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  //   const [appointmentDate2, setAppointmentDate2] = useState();
  const [hospitalName, setHospitalName] = useState();

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const initialSet = () => {
    setAllData(data);
  };

  // const [filters, setFilters] = useState({
  //   name: undefined,
  //   dateOfBirth: undefined,
  //   appointmentDate2: undefined,
  //   hospitalName: undefined,
  // });

  // const { name, dateOfBirth, appointmentDate2, hospitalName } = filters;

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilters({ ...filters, [name]: e.target.value });
  };

  // useEffect(() => {
  //   initialSet();
  // }, [data]);

  // ---------------pagination--------------------------
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  // ---------------pagination--------------------------

  useEffect(() => {
    console.log("page changed...", page);

    handleSubmit();
    // console.log(allData);
  }, [page]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setAlert({ ...alert, loading: true });
    let params = {
      limit,
      page,
      name,
      dateOfBirth,
      //   appointmentDate2,
      hospitalName,
    };
    let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await allUsers(params, token)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            initialSet();
            setShow(false);
          } else {
            setAllData(data);
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            setTotalPages(Math.ceil(totalCount / limit));
            setShow(false);
          }
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
        }

        // return { data };
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
    // await allAppointments(params)
    //   .then((data) => {
    //     console.log(data);
    //     setAllData(data);
    //     console.log(allData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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

        <div className=" mr-10 border-2 border-gray-200 rounded-xl">
          <div className="grid grid-cols-4 md:grid-cols-5 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
            <h2>Id</h2>
            <h2 className="">Name</h2>
            <h2 className="hidden md:block">Hospital Name</h2>
            <h2>Role</h2>
            {/* <h2>hospitalName</h2> */}
            {/* <h2>cancel</h2> */}
            <h2>Delete</h2>
          </div>
          <div className="">
            {/* {console.log(allData)} */}
            {allData &&
              allData.doc.map((user) => {
                return <Users user={user} />;
                // <Patients patient={patient} />
              })}
          </div>
        </div>

        {/* --------------------------pagination----------------------- */}
        <div
          aria-label="Page navigation example"
          className="flex justify-center mt-10"
        >
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="#"
                onClick={prevPage}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[...Array(totalPages)].map((val, index) => {
              // console.log(index);
              return (
                // <li>
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setPage(index + 1)}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}

            <li>
              <a
                href="#"
                onClick={nextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
        {/* --------------------------pagination----------------------- */}
      </Layout>
    </>
  );
};

export default Index;
