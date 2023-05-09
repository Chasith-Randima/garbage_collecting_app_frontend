import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Mapp from "components/Map";

import { useRouter } from "next/router";
import { getCookie } from "actions/auth";

import { allIncidents } from "actions/incident";
import Incidents from "components/Incidents";

import Message from "components/Message";

const ApprovedIncidents = () => {
  const router = useRouter();
  // const Index = ({ data, token, cookie }) => {
  //   console.log(token, cookie);
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
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
    let params;
    setAlert({ ...alert, loading: true });
    if (JSON.parse(localStorage.getItem("user")).role != "user") {
      params = {
        limit,
        page,
        // user: JSON.parse(localStorage.getItem("user"))._id,
        checked: true,
        closed: false,
        //   name,
        //   dateOfBirth,
        //   appointmentDate2,
        //   hospitalName,
      };
    } else {
      params = {
        limit,
        page,

        //   name,
        //   dateOfBirth,
        //   appointmentDate2,
        //   hospitalName,
      };
    }
    let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await allIncidents(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
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
            resetAlert();
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

        {/* <div className="mt-5 mr-10 border-2 border-gray-200 rounded-xl">
        
        </div> */}

        <h2 className="text-gray-400 text-2xl mt-2 font-semibold ">
          Approved Incidents
        </h2>
        <div className=" mt-2 mb-2 p-2 mr-10 border-2 border-primary-200 rounded-xl grid grid-cols-12 gap-2">
          <div className="col-span-4 border-r-2 border-primary-400">
            {allData &&
              allData.doc.map((item) => {
                return (
                  <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
                    {item.images ? (
                      <img
                        src={`http://127.0.0.1:3000/api/v1/incidents/image/${item.images[0]}`}
                        className="mx-auto w-full  rounded-xl"
                      />
                    ) : (
                      <img
                        src="/images/locationMain.png"
                        className="mx-auto w-2/3 h-80"
                      />
                    )}

                    <div className="p-2 col-span-2">
                      <h2
                        className="cursor-pointer font-bold"
                        onClick={() => router.push(`/incident/${item._id}`)}
                      >
                        {item.title}
                      </h2>
                      <div className="grid grid-cols-2">
                        <h2>{item.city}</h2>
                        <h2>
                          <span>Flag : </span>
                          {item.flag}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-span-8">
            {allData && <Mapp allData={allData.doc} />}
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

export default ApprovedIncidents;

// <div className="grid grid-cols-4 md:grid-cols-6 bg-primary-400 p-4 rounded-xl text-white text-xl font-sb ">
// <h2>Id</h2>
// <h2 className="col-span-3">title</h2>
// {/* <h2 className="hidden md:block">Email</h2>
// <h2>Role</h2> */}
// {/* <h2>hospitalName</h2> */}
// {/* <h2>cancel</h2> */}
// <h2>Update</h2>
// <h2>Delete</h2>
// </div>
// <div className="">
// {/* {console.log(allData)} */}
// {allData &&
//   allData.doc.map((incident) => {
//     return <Incidents incident={incident} />;
//     // <Patients patient={patient} />
//   })}
// </div>
