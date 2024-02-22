import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import AuthLayout from "../layout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout";
import StaffLayout from "../layout/StaffLayout";
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
  ImportQuotation,
  ListQuotation,
  ViewSupplierPrice,
  ViewSupplier,
  MaterialList,
  ImportInventory,
} from "../pages";

import HouseProject from "../pages/HouseProjects/HouseProject";
import HouseRoofList from "../pages/HouseProjects/HouseRoof/HouseRoofList";
import HouseRoofDetail from "../pages/HouseProjects/HouseRoof/HouseRoofDetail";
import TownHouseList from "../pages/HouseProjects/TownHouse/TownHouseList";
import TownHouseDetail from "../pages/HouseProjects/TownHouse/TownHouseDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Blog from "../pages/Blogs/Blog";
import BlogDetail from "../pages/Blogs/BlogDetail";
import { PageNotfound } from "../components";
import QuoteRequestForm from "../pages/Quotation/QuotationForm/QuoteRequestForm";
import Customer from "../pages/Customer/Customer";
import QuoteRequest from "../pages/Customer/QuoteRequest";
import AllRequest from "../pages/Staff/QuoteManagement/AllRequest";
import ConfigProject2 from "../pages/Staff/QuoteManagement/ConfigProject2";
import QuotationDetails from "../pages/Staff/QuoteManagement/QuotationDetails/QuotationDetails";
import ProjectDetailsForStaff from "../pages/Staff/QuoteManagement/ProjectDetails/ProjectDetailsForStaff";
import ProjectDetailsForCustomer from "../pages/Customer/ProjectDetails/ProjectDetailsForCustomer";
import QuoteDetailsForCustomer from "../pages/Customer/QuoteDetails/QuoteDetailsForCustomer";
import QuotationForm from "../pages/Quotation/QuotationForm/QuotationForm";
import Quotation from "../pages/Quotation/Quotation";

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
        { path: "/house-roof-projects", element: <HouseRoofList /> },
        {
          path: "/house-roof-projects/details/:id",
          element: <HouseRoofDetail />,
        },
        { path: "/town-house-projects", element: <TownHouseList /> },
        {
          path: "/town-house-projects/details/:id",
          element: <TownHouseDetail />,
        },
        { path: "/news", element: <News /> },
        { path: "/news/newsDetail/:id", element: <NewsDetail /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/blogDetail/:id", element: <BlogDetail /> },
        // { path: "/quote-request", element: <QuoteRequestForm /> },
        { path: "/quote-request", element: <Quotation /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Auth /> }],
    },
    {
      path: "/customer",
      element: <CustomerLayout />,
      children: [
        { path: "/customer/dashboard", element: <Customer /> },
        { path: "/customer/my-request", element: <QuoteRequest /> },
        {
          path: "/customer/project-detail/:id",
          element: <ProjectDetailsForCustomer />,
        },
        {
          path: "/customer/quotation-detail/:id",
          element: <QuoteDetailsForCustomer />,
        },
      ],
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        { path: "/staff/all-request", element: <AllRequest /> },
        {
          path: "/staff/project-detail/:id",
          element: <ProjectDetailsForStaff />,
        },
        { path: "/staff/config-project/:id", element: <ConfigProject2 /> },

        { path: "/staff/quotation-detail/:id", element: <QuotationDetails /> },
      ],
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

        { path: "import-inventory", element: <ImportInventory /> },

        { path: "list-material", element: <MaterialList /> },

        { path: "view-supplier", element: <ViewSupplier /> },

        { path: "view-supplier-price", element: <ViewSupplierPrice /> },

        { path: "import-quotation", element: <ImportQuotation /> },
        { path: "list-quotation", element: <ListQuotation /> },
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
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
  return routing;
}
