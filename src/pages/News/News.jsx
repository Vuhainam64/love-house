import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllNews } from "../../constants/apiNews";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Navbar, Footer, LoadingOverlay } from "../../components";


export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      const data = await getAllNews();
      if (data && data.result) {
        const formattedData = data.result.data.map((newsItem) => ({
          ...newsItem,
          date: formatNewsDate(newsItem.date),
        }));
        setNewsData(formattedData);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatNewsDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <>
    <LoadingOverlay loading={loading} />
      <Navbar />
      <Breadcrumb />

      <div className="container mx-auto my-12 px-4 sm:px-0">
        <div className="grid sm:grid-cols-3 gap-5 ">
          {newsData.map((newsItem, index) => (
            <div
              key={index}
              className="card rounded-md  overflow-hidden relative group"
            >
              <img
                src={newsItem.imageUrl}
                alt={newsItem.header}
                className="w-full h-[330px] transition-all transform group-hover:scale-110"
              />
              <div className="group-hover:bottom-0 transition-all absolute -bottom-20 left-0 text-white p-6 z-20">
                <h4 className="mb-2 text-sm opacity-80">
                  {formatNewsDate(newsItem.date)}
                </h4>
                <h3 className="mb-10 text-2xl">
                  <NavLink to={`/news/newsDetail/${newsItem.id}`}>
                    {newsItem.header.length >= 70
                      ? newsItem.header.substring(0, 50).trim() + "..."
                      : newsItem.header}
                  </NavLink>
                </h3>
                <NavLink
                  to={`/news/newsDetail/${newsItem.id}`}
                  className="hover:bg-orange-600 transition-all text-sm inline-flex rounded-md px-4 py-2 text-center border-2 border-orange-600"
                >
                  Read more
                </NavLink>
              </div>

              <div className="z-10 h-1/2 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent"></div>
              <a
                href="#"
                className="absolute z-0 inset-0 bg-orange-600 opacity-0 group-hover:opacity-80 transition-all"
              ></a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
