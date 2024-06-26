import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import CalendarComponent from "./views/Calendar";
import ImageUpload from "./views/ImageUpload";
import Analyse from "./views/Analyse";
import Instagram from "./views/Instagram";
import FullCalendarInsta from "./views/FullCalendarInsta";
import InteractifCalendarIns from "./views/InteractifCalendarIns";
import PasswordReset from "./views/PasswordReset";
import PasswordForgot from "./views/PasswordForgot";

// 
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        key: "home",
      }, {
        path: "/CalendarComponent",
        element: <CalendarComponent />,
        key: "CalendarComponent",
      },
      {
        path: "/Instagram",
        element: <Instagram />,
        key: "Instagram",
      },
      {
        path: "/FullCalendarInsta",
        element: <FullCalendarInsta />,
        key: "FullCalendarInsta",
      },
      {
        path: "/InteractifCalendarIns",
        element: <InteractifCalendarIns />,
        key: "InteractifCalendarIns",
      },
       {
        path: "/Analyse",
        element: <Analyse />,
        key: "Analyse",
      },
      // CalendarComponent Analyse
// Analyse
     
      {
        path: "/upload-image",
        element: <ImageUpload />,
        key: "ImageUpload",
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        key: "login",
      },
      {
        path: "/signup",
        element: <Signup />,
        key: "signup",
      },
      {
        path: "/passwordreset",
        element: <PasswordReset />,
        key: "passwordreset",
      },
      {
        path: "/passwordforgot",
        element: <PasswordForgot />,
        key: "passwordforgot",
      },
    ],
  },
]);

export default router;