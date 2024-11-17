import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import CountryDetail from '../components/CountryDetail.jsx';
import Home from '../components/Home.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path:"/",
            element:<Home/>,
        },
        {
            path:"/:country",
            element:<CountryDetail/>,
        }

      ],
    },
  ]);


  ReactDOM.createRoot(document.getElementById("root")).render(
   
      <RouterProvider router={router} />
    
  );
