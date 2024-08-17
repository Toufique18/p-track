import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Addproduct from "../pages/Addproduct";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch("https://p-track-server.vercel.app/products?page=1&limit=10")

            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addProduct',
                element: <Addproduct></Addproduct>
            },
            
        ]
    },
    
]);

export default router;
