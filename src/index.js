import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './View/NotFound';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App pdpage={false} cartPage={false} plpage={true} />,
  },
  {
    path: '/cart',
    element: <App pdpage={false} cartPage={true} />
  },
  {
    path:'/products/:id',
    element: <App pdpage={true} cartPage={false} />,
  },
  {
    path: '*',
    element:<NotFound />
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
