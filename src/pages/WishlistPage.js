import React, {useContext} from 'react';
import Wishlist from "../components/Wishlist";
import {useLocation} from "react-router-dom";
import {BookContext} from "../context/BookContext";

const WishlistPage = () => {
    // const location = useLocation();
    // const { favoriteBooks, setFavoriteBooks } = location.state;

    return (
        // <Wishlist favoriteBooks={favoriteBooks} setFavoriteBooks={setFavoriteBooks}/>
        <Wishlist/>
    );
};

export default WishlistPage;