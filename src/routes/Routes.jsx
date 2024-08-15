import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Addproduct from "../pages/Addproduct";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/addProduct',
                element: <Addproduct></Addproduct>
            },
            
        ]
    },
    
]);

export default router;
