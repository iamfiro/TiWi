import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageMap from './pages/map';
import PageHome from './pages/home';
import PageShop from './pages/shop';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageHome />,
    },
    {
      path: "/map",
      element: <PageMap />,
    },
    {
        path: "/shop",
        element: <PageShop />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
