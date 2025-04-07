import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Register = lazy(() => import("../app/auth/register"));
const Login = lazy(() => import("../app/auth/login"));
const Dashboard = lazy(() => import("../app/dashboard"));
const TeleCaller = lazy(() => import("../app/telecaller"));

const authorisedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/telecaller",
    element: <TeleCaller />,
  },
];

const unAuthorisedRoutes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
];

export const getAuthorisedPaths = () => {
  console.log(authorisedRoutes);

  const paths = authorisedRoutes.map((el) => el.path);
  paths.push(authorisedRoutes[1].path);
  return paths;
};

export const getUnauthorisedPaths = () => {
  return unAuthorisedRoutes.map((el) => el.path);
};

const Router = [...authorisedRoutes, ...unAuthorisedRoutes];

export default Router;
