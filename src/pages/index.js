import { useState, useEffect } from "react";
import Layout from "components/Layout";
import Message from "components/Message";
import { allArticles } from "actions/article";
import ArticleCard from "components/ArticleCard";

const Index = () => {
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
        {/* <div className="mx-auto col-span-12"> */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 mt-10 mr-5">
          {/* {console.log(allData)} */}
          {allData &&
            allData.doc.map((article, index) => {
              return <ArticleCard key={article._id} doc={article} />;
            })}
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
        {/* </div> */}
        {/* --------------------------pagination----------------------- */}
      </Layout>
    </>
  );
};

export default Index;

// ----------------------------------------------------------------- Previous Page ---------------------------

// import Head from "next/head";
// import Image from "next/image";
// import Layout from "components/Layout";
// // import { Inter } from 'next/font/google'
// // import styles from '@/styles/Home.module.css'

// // const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Layout>
//         <main className=" mt-2 mb-2 p-2 mr-10 border-2 border-primary-200 rounded-xl grid grid-cols-12 gap-2">
//           <div className="col-span-6 border-r-2 border-primary-400">
//             <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
//               {/* <div className="w-full h-2/3 overflow-hidden"> */}
//               <img src="/images/locationMain.png" className="col-span-1" />
//               {/* </div> */}
//               <div className="p-2 col-span-2">
//                 <h2>Title</h2>
//                 <h2>Location</h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
//               {/* <div className="w-full h-2/3 overflow-hidden"> */}
//               <img src="/images/locationMain.png" className="col-span-1" />
//               {/* </div> */}
//               <div className="p-2 col-span-2">
//                 <h2>Title</h2>
//                 <h2>Location</h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
//               {/* <div className="w-full h-2/3 overflow-hidden"> */}
//               <img src="/images/locationMain.png" className="col-span-1" />
//               {/* </div> */}
//               <div className="p-2 col-span-2">
//                 <h2>Title</h2>
//                 <h2>Location</h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 border-2 border-primary-200 rounded-xl mt-2 mb-2 p-2  mr-2">
//               {/* <div className="w-full h-2/3 overflow-hidden"> */}
//               <img src="/images/locationMain.png" className="col-span-1" />
//               {/* </div> */}
//               <div className="p-2 col-span-2">
//                 <h2>Title</h2>
//                 <h2>Location</h2>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-6">
//             <h2>Map</h2>
//           </div>
//         </main>
//       </Layout>
//     </>
//   );
// }
