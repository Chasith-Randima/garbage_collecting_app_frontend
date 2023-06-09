import { useState, useEffect } from "react";
import Layout from "components/Layout";
import Message from "components/Message";
import { allArticles } from "actions/article";
import ArticleCard from "components/ArticleCard";
import Articles from "components/Articles";

const AllArticles = () => {
  const [allData, setAllData] = useState();
  //   console.log(allData);

  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  // Math.ceil(allData.totalCount / limit)
  // const { search } = values;

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
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

  const basicData = async () => {
    setAlert({ ...alert, loading: true });
    let name;
    let city;
    let data = {
      limit,
      page,
      name,
      city,
    };
    await allArticles(data)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllData(data);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));

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
        }
        // return { data };
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

  useEffect(() => {
    basicData();
  }, [page]);

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
        <h2 className="text-gray-400 text-2xl mt-2 font-semibold ">
          All Articles
        </h2>
        <div className="mt-2 mr-4 md:mr-10 border-2 border-gray-200 rounded-xl">
          <div className="grid grid-cols-10 md:grid-cols-6 bg-primary-400 p-4 rounded-xl text-white text-xl font-sb ">
            <h2 className="hidden md:block">Id</h2>
            <h2 className="col-span-6 md:col-span-3">Title</h2>
            {/* <h2 className="hidden md:block">Email</h2>
            <h2>Role</h2> */}
            {/* <h2>hospitalName</h2> */}
            {/* <h2>cancel</h2> */}
            <h2 className="text-center col-span-2 md-col-span-1">Update</h2>
            <h2 className="text-center col-span-2 md:col-span-1">Delete</h2>
          </div>
          <div className="">
            {/* {console.log(allData)} */}
            {allData &&
              allData.doc.map((article) => {
                return <Articles article={article} />;
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

export default AllArticles;
