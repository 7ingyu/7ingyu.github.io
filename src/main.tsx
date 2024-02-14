import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: async ({ params }) => {
    //   return fakeDb.from("teams").select("*");
    // },
    // https://reactrouter.com/en/main/route/loader
    children: [
      {
        path: "work",
        element: <App section="work" />,
        // loader: teamLoader,
        children: [
          {
            path: "professional",
            element: <App section="professional" />
          },
          {
            path: "personal",
            element: <App section="personal" />
          }
        ]
      },
      {
        path: "contact",
        element: <App section="contact" />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") || document.body).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);