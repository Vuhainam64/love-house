import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home/Home.jsx";
import {
  AboutUs,
  Account,
  Auth,
  BlogCreate,
  BlogsList,
  DBHome,
  Dashboard,
  NewsEdit,
  NewsCreate,
  NewsList,
  Password,
  Profile,
  Setting,
  UsersList,
  BlogEdit,
  ProjectList,
  EditProject,
  ProjectDetail,
  CreateSampleProject,
} from "../pages";

import HouseProject from "../pages/HouseProjects/HouseProject";
import HouseRoof from "../pages/HouseProjects/HouseRoof/HouseRoof";
import HouseRoofDetail from "../pages/HouseProjects/HouseRoof/HouseRoofDetail";
import TownHouse from "../pages/HouseProjects/TownHouse/TownHouse";
import TownHouseDetail from "../pages/HouseProjects/TownHouse/TownHouseDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Blog from "../pages/Blogs/Blog";
import BlogDetail from "../pages/Blogs/BlogDetail";
import { PageNotfound } from "../components";
import QuoteRequestForm from "../pages/Quotation/QuotationForm/QuoteRequestForm";

export default function Routers() {
  const auth = useSelector((state) => state?.auth);

  const isAdminOrStaff =
    auth?.userRole?.includes("ADMIN") || auth?.userRole?.includes("STAFF");

  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/houseProject", element: <HouseProject /> },
        { path: "/house-roof-projects", element: <HouseRoof /> },
        {
          path: "/house-roof-projects/details/:id",
          element: <HouseRoofDetail />,
        },
        { path: "/town-house-projects", element: <TownHouse /> },
        {
          path: "/town-house-projects/details/:id",
          element: <TownHouseDetail />,
        },
        { path: "/news", element: <News /> },
        { path: "/news/newsDetail/:id", element: <NewsDetail /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/blogDetail/:id", element: <BlogDetail /> },
        { path: "/quote-request", element: <QuoteRequestForm /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Auth /> }],
    },
    {
      path: "/dashboard",
      element: isAdminOrStaff ? <Dashboard /> : <Navigate to="/404" replace />,
      children: [
        { path: "home", element: <DBHome /> },
        { path: "users-list", element: <UsersList /> },

        { path: "create-news", element: <NewsCreate /> },
        { path: "list-news", element: <NewsList /> },
        { path: "edit-news/:id", element: <NewsEdit /> },

        { path: "create-blog", element: <BlogCreate /> },
        { path: "list-blog", element: <BlogsList /> },
        { path: "edit-blog/:id", element: <BlogEdit /> },

        { path: "create-sample-project", element: <CreateSampleProject /> },
        { path: "list-project", element: <ProjectList /> },
        { path: "detail-project/:id", element: <ProjectDetail /> },
        { path: "edit-project/:id", element: <EditProject /> },
      ],
    },
    {
      path: "/setting",
      element: <Setting />,
      children: [
        { path: "profile", element: <Profile /> },
        { path: "password", element: <Password /> },
        { path: "account", element: <Account /> },
      ],
    },
    {
      path: "/404",
      element: <PageNotfound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
  return routing;
}
