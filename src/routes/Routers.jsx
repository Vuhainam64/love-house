import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";

import {
  HomeLayout,
  CustomerLayout,
  StaffLayout,
  AdminLayout,
} from "../layout";
import AuthLayout from "../layout/AuthLayout";

import Home from "../pages/Home/Home.jsx";
import {
  AboutUs,
  Account,
  Auth,
  BlogCreate,
  BlogsList,
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
  News,
  NewsDetail,
  Blog,
  BlogDetail,
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
  ListPaymentProgress,
  CreateProgress,
  QuoteDetailsForStaff,
  PaymentProgress,
  ConstructionConfigManagement,
  PaymentNotification,
  AdminDashboard,
  WorkerManagement,
  HouseProjectDetails,
  Login2,
} from "../pages";

import { PageNotfound } from "../components";

export default function Routers() {
  const auth = useSelector((state) => state?.auth);

  const isAdmin = auth?.userRole?.includes("ADMIN");

  const isStaff = auth?.userRole?.includes("STAFF");

  const routing = useRoutes([
    { path: "/payment/*", element: <PaymentNotification /> },

    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/houseProject", element: <HouseProject /> },
        {
          path: "/house-projects/details/:id",
          element: <HouseProjectDetails />,
        },
        { path: "/news", element: <News /> },
        { path: "/news/newsDetail/:id", element: <NewsDetail /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/blogDetail/:id", element: <BlogDetail /> },
        { path: "/quote-request", element: <Quotation /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Login2 /> }],
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
      element: isStaff ? <StaffLayout /> : <Navigate to="/404" replace />,
      children: [
        { path: "all-request", element: <AllRequest /> },
        {
          path: "project-detail/:id",
          element: <ProjectDetailsForStaff />,
        },
        { path: "config-project/:id", element: <ConfigProject2 /> },

        {
          path: "quotation-detail/:id",
          element: <QuoteDetailsForStaff />,
        },
        {
          path: "manage-material-detail/:id",
          element: <ManageMaterialDetails />,
        },
        {
          path: "contract-payment-progress/:id",
          element: <ListPaymentProgress />,
        },
        {
          path: "create-list-progress/:id",
          element: <CreateProgress />,
        },
        {
          path: "construction-config",
          element: <ConstructionConfigManagement />,
        },
        { path: "worker-management", element: <WorkerManagement /> },

        { path: "create-news", element: <NewsCreate /> },
        { path: "list-news", element: <NewsList /> },
        { path: "edit-news/:id", element: <NewsEdit /> },

        { path: "create-sample-project", element: <CreateSampleProject /> },
        { path: "list-project", element: <ProjectList /> },
        { path: "detail-project/:id", element: <ProjectDetail /> },
        { path: "edit-project/:id", element: <EditProject /> },

        { path: "create-blog", element: <BlogCreate /> },
        { path: "list-blog", element: <BlogsList /> },
        { path: "edit-blog/:id", element: <BlogEdit /> },

        { path: "import-inventory", element: <ImportInventory /> },
        { path: "export-inventory", element: <ExportInventory /> },
        {
          path: "export-inventory/quotation-detail/:id",
          element: <QuotationDetail />,
        },

        { path: "list-material", element: <MaterialList /> },
        { path: "export-price-material", element: <ExportPrice /> },

        { path: "users-list", element: <UsersList /> },
        { path: "view-supplier-price", element: <ViewSupplierPrice /> },

        { path: "import-quotation", element: <ImportQuotation /> },
        { path: "import-quotation", element: <ImportQuotation /> },
        { path: "list-quotation", element: <ListQuotation /> },
      ],
    },

    {
      path: "/admin",
      element: isAdmin ? <AdminLayout /> : <Navigate to="/404" replace />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users-list", element: <UsersList /> },
        { path: "view-supplier", element: <ViewSupplier /> },
        { path: "view-supplier-price", element: <ViewSupplierPrice /> },
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
  ]);
  return routing;
}
