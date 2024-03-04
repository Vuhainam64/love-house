import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout, CustomerLayout, StaffLayout } from "../layout";
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
  HouseProject,
  HouseRoofList,
  HouseRoofDetail,
  TownHouseList,
  TownHouseDetail,
  News,
  NewsDetail,
  Blog,
  BlogDetail,
  QuoteRequestForm,
  QuotationForm,
  Quotation,
  Customer,
  QuoteRequest,
  ProjectDetailsForCustomer,
  QuoteDetailsForCustomer,
  AllRequest,
  ConfigProject2,
  ProjectDetailsForStaff,
  ManageMaterialDetails,
  ListQuotation,
  ImportQuotation,
  ViewSupplierPrice,
  ViewSupplier,
  MaterialList,
  ImportInventory,
  ExportPrice,
  ExportInventory,
  QuotationDetail,
  CustomerAccount,
} from "../pages";

import { PageNotfound } from "../components";
import ListPaymentProgress from "../pages/Staff/QuoteManagement/ContractDetails/ListPaymentProgress";
import CreateProgressForm from "../pages/Staff/QuoteManagement/ContractDetails/ManageContract/CreateProgressForm";
import CreateProgress from "../pages/Staff/QuoteManagement/ContractDetails/ManageContract/CreateProgress";
import QuoteDetailsForStaff from "../pages/Staff/QuoteManagement/QuotationDetails/QuoteDetailsForStaff";
import PaymentProgress from "../pages/Customer/Contract/PaymentProgress";
import ConstructionConfigManagement from "../pages/Staff/ConstructionConfig/ConstructionConfigManagement.jsx";
import StaffDashboard from "../pages/Staff/StaffDashboard/StaffDashboard"
import WorkerManagement from "../pages/Staff/WorkerManagement/WorkerManagement";

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
        {
          path: "/customer/payment-progress/:id",
          element: <PaymentProgress />,
        },
        {
          path: "/customer/account",
          element: <CustomerAccount />,
          children: [
            { path: "profile", element: <Profile /> },
            { path: "password", element: <Password /> },
            { path: "account", element: <Account /> },
          ],
        },
      ],
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        { path: "/staff/dashboard", element: <StaffDashboard/> },
        { path: "/staff/all-request", element: <AllRequest /> },
        {
          path: "/staff/project-detail/:id",
          element: <ProjectDetailsForStaff />,
        },
        { path: "/staff/config-project/:id", element: <ConfigProject2 /> },

        {
          path: "/staff/quotation-detail/:id",
          element: <QuoteDetailsForStaff />,
        },
        {
          path: "/staff/manage-material-detail/:id",
          element: <ManageMaterialDetails />,
        },
        {
          path: "/staff/contract-payment-progress/:id",
          element: <ListPaymentProgress />,
        },
        {
          path: "/staff/create-list-progress/:id",
          element: <CreateProgress />,
        },
        {
          path: "/staff/construction-config",
          element: <ConstructionConfigManagement />,
        },
        { path: "/staff/worker-management", element: <WorkerManagement/> },
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
        { path: "export-inventory", element: <ExportInventory /> },
        {
          path: "export-inventory/quotation-detail/:id",
          element: <QuotationDetail />,
        },

        { path: "list-material", element: <MaterialList /> },
        { path: "export-price-material", element: <ExportPrice /> },

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
