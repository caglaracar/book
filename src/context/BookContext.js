import React, {createContext, useEffect, useState} from 'react';

export const BookContext=createContext()
const BookContextProvider = ({children}) => {
    const[favoriteBooks,setFavoriteBooks]=useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [likedBooks, setLikedBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleHeartClick = (e, bookId,book) => {
        e.stopPropagation();
        console.log('book',book)
        if (likedBooks.includes(bookId)) {
            setLikedBooks(likedBooks.filter((id) => id !== bookId));
            setFavoriteBooks(favoriteBooks.filter((books)=>books!==book));
        } else {
            setFavoriteBooks((prev)=>[...prev,book])
            setLikedBooks([...likedBooks, bookId]);
        }
    };
    const handleImgClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };
    const handleImgClickWishlist = (book) => {
        const url = book.volumeInfo.previewLink;
        const win = window.open(url, '_blank');
    }
    useEffect(() => {
        const storedFavoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks"));
        if (storedFavoriteBooks && storedFavoriteBooks.length > 0) {
            setFavoriteBooks(storedFavoriteBooks);
            setLikedBooks(storedFavoriteBooks.map(book => book.id));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    }, [favoriteBooks]);



    return (
        <BookContext.Provider value={{handleImgClickWishlist,favoriteBooks,setFavoriteBooks,selectedBook,setSelectedBook,likedBooks,setLikedBooks,showModal, setShowModal,handleImgClick,handleHeartClick}}>
            {children}
        </BookContext.Provider>
    );
};

export default BookContextProvider;