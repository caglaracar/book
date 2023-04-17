import React, {useContext} from 'react';
import {motion} from "framer-motion";
import heartIcon from "../assets/favoriteOn.png";
import {BookContext} from "../context/BookContext";
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';



const Wishlist = () => {
    const navigate = useNavigate();
    const{favoriteBooks,likedBooks,handleImgClickWishlist,handleHeartClick}=useContext(BookContext)
    return (
        <>
            {
                favoriteBooks.length ? (
                    <div className="flex-container" style={{marginTop: "1rem"}}>
                        {favoriteBooks.map((book) => (
                            book.volumeInfo.imageLinks ? (
                                <motion.div  key={book.id} layout whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} style={{cursor: "pointer", width: "12rem", margin: "2.5rem", height: "20rem", position: "relative",}} onClick={() => handleImgClickWishlist(book)}>
                                    <motion.img src={book.volumeInfo.imageLinks.thumbnail} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} onClick={() => handleImgClickWishlist(book)} href={book.volumeInfo.previewLink} target="_blank" />
                                        <div style={{marginTop: "0.5rem", fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",}}>
                                            <motion.h6>{book.volumeInfo.title}</motion.h6>
                                        <div onClick={(e) => handleHeartClick(e, book.id, book)} style={{position: "absolute", top: 0, right: 0, width: "2rem", height: "2rem", cursor: "pointer",}}>
                                            <img src={heartIcon} alt="heart icon" style={{width: "100%", height: "100%", filter: likedBooks.includes(book.id) ? "none" : "grayscale(100%)", transition: "all 0.3s ease-in-out",}} onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"}/>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : null
                        ))}
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "calc(100vh - 7rem)",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#F2F2F2",
                                borderRadius: "0.5rem",
                                padding: "3rem",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h2 >No favorite books yet!</h2>
                            <div className={"add-book-wishlist"}
                                onClick={() => navigate('/')}>
                                <span style={{fontSize: "4rem", fontWeight: "bold"}}><FiPlus/></span>
                            </div>
                            <div>Click to add favorite books!</div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Wishlist;