import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Login/Register";
import Products from "../../Pages/Products/Products";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
                element: <AddProducts></AddProducts>
            },
            {
                path: 'products',
                element: <Products></Products>
            }
        ]
    }
])