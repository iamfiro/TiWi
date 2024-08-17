import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageHome from './pages/home';
import PageLogin from "./pages/login.tsx";
import {RecoilRoot} from "recoil";
import SleepTime from "./pages/sleepTime.tsx";
import PageChat from "./pages/chat.tsx";
import PageFetchFirstRoute from "./pages/fetchFirstRoute.tsx";
import TooManyRequests from "./pages/429.tsx";
import PageCourseList from "./pages/courseList.tsx";
import PageCourseDetail from "./pages/courseDetail.tsx";
import PageNotFound from "./pages/404.tsx";
import * as serviceWorkerRegistration from './serviceWorkerRegister.ts';
import PageLogout from "./pages/Logout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageHome />,
    },
    {
        path: '/sleep',
        element: <SleepTime />
    },
    {
        path: '/chat',
        element: <PageChat />
    },
    {
        path: '/fetchRoute',
        element: <PageFetchFirstRoute/>
    },
    {
        path: '/429',
        element: <TooManyRequests />
    },
    {
        path: '/course',
        element: <PageCourseList />
    },
    {
        path: '/course/:id',
        element: <PageCourseDetail />
    },
    // Auth
    {
        path: '/login',
        element: <PageLogin />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path: '/logout',
        element: <PageLogout />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    </React.StrictMode>,
)

serviceWorkerRegistration.register();