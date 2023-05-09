import Layout from "components/Layout";
import { useState, useEffect } from "react";
import { allGarbageSpots, deleteGarbageSpot } from "actions/garbageSpot";
import Mapp from "components/Map";
import { useRouter } from "next/router";
import { getCookie } from "actions/auth";

const AllGarbageSpots = () => {
  const router = useRouter();

  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

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
          deleteGarbageSpot(id, token)
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
      // alert("You dont't have the permission to perform this action...");
      setAlert({
        ...alert,
        loading: false,
        message: "You dont't have the permission to perform this action...",
        error: true,
        success: false,
      });

      window.setTimeout(() => {
        resetAlert();
      }, 1000);
      return;
    }
  };

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

  //   const { name, description, location, formData, images } = values;

  useEffect(() => {
    basicData();
  }, [page]);

  const basicData = async () => {
    let data = {
      limit,
      page,
    };
    allGarbageSpots(data)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setData(data);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));
          //   setValues({
          //     name: data.doc.name,
          //     // description: data.doc.description,
          //     location: data.doc.location,
          //   });
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
  };

  return (
    <>
      <Layout>
        <h2 className="text-gray-400 text-2xl mt-2 font-semibold ">
          All Garbage Spot
        </h2>
        <main className=" mt-2 mb-2 p-2 mr-10 border-2 border-primary-200 rounded-xl grid grid-cols-12 gap-2">
          <div className="col-span-5 border-r-2 border-primary-400">
            {data &&
              data.doc.map((item) => {
                return (
                  <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
                    {/* <img
                      src="/images/locationMain.png"
                      className="col-span-1"
                    /> */}
                    {item && item.images ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/garbages/image/${item.images[0]}`}
                        className="col-span-1"
                      />
                    ) : (
                      <img
                        src="/images/locationMain.png"
                        className="col-span-1"
                      />
                    )}

                    <div className="p-2 col-span-2">
                      <h2 className="capitalize font-bold">{item.name}</h2>
                      <h2 className=" ">
                        <span>Location : </span>
                        {item.location}
                      </h2>
                      <div className="col-span-2 grid grid-cols-2 gap-2 ">
                        <h2
                          onClick={() =>
                            router.push(`/garbageSpot/update/${item._id}`)
                          }
                          className="p-1 bg-green-400 text-white hover:bg-green-600 transition-all rounded-xl text-center cursor-pointer"
                        >
                          Update
                        </h2>
                        <h2
                          onClick={() => handleDelete(item._id)}
                          className="p-1 bg-red-400 text-white hover:bg-red-600 transition-all rounded-xl text-center cursor-pointer"
                        >
                          Delete
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-span-7">
            {data && <Mapp allData={data.doc} />}
          </div>
        </main>
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
              console.log(index);
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

export default AllGarbageSpots;
