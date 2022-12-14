import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import ErrorPage from "../../Pages/Error/ErrorPage";
import NotFound from "../../Pages/Error/NotFound";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Login/Register";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import Products from "../../Pages/Products/Products";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addProduct',
                element: <PrivateRoutes> <AddProducts></AddProducts></PrivateRoutes>
            },
            {
                path: 'products',
                element: <Products></Products>
            },
            {
                path: 'myProducts',
                element: <PrivateRoutes> <MyProducts></MyProducts></PrivateRoutes>
            },
            {
                path: 'myOrders',
                element: <PrivateRoutes> <MyOrders></MyOrders></PrivateRoutes>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])