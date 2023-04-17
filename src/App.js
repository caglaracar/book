import React, {useState} from "react";
import './App.css';
import WishlistPage from "./pages/WishlistPage";
import Home from "./pages/Home";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import BookContextProvider from "./context/BookContext";

const router  = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home/> },
            { path: 'wishlist', element: <WishlistPage /> },
        ]
    }
]);
function App() {

    return (
        <BookContextProvider>
            <RouterProvider router= { router } />
        </BookContextProvider>
    )
}
export default App;
