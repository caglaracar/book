import React, {useContext} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FiX} from 'react-icons/fi';
import heartIcon from '../assets/favoriteOn.png'
import {BookContext} from "../context/BookContext";


const Book = ({books}) => {
    const{selectedBook,likedBooks,showModal, setShowModal,handleImgClick,handleHeartClick}=useContext(BookContext)
    console.log(selectedBook)
    return (
        <>
            <div className="flex-container" style={{marginTop: "1rem"}}>
                {books.map((book) =>
                    book.volumeInfo.imageLinks ? (
                        <motion.div
                            key={book.id}
                            layout
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            style={{
                                cursor: "pointer",
                                width: "12rem",
                                margin: "2.5rem",
                                height: "20rem",
                                position: "relative",
                            }}
                            onClick={() => handleImgClick(book)}
                        >
                            <motion.img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt=""
                                style={{width: "100%", height: "100%", objectFit: "cover"}}
                                onClick={() => handleImgClick(book)}
                            />
                            <div style={{
                                marginTop: "0.5rem",
                                fontSize: "0.9rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                            >
                                <motion.h6>{book.volumeInfo.title}</motion.h6>

                                <div
                                    onClick={(e) => handleHeartClick(e, book.id,book)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        width: "2rem",
                                        height: "2rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={heartIcon}
                                        alt="heart icon"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            filter: likedBooks.includes(book.id) ? "none" : "grayscale(100%)",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : null
                )}
            </div>
            <AnimatePresence>
                {showModal && (
                    <motion.div layout initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={"modal-overlay"} onClick={() => setShowModal(false)}>
                        <motion.div layout initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -50}} className={"modal-container "} onClick={(e) => e.stopPropagation()}>

                            <h2 className={"modal-container-h2"}>
                                {selectedBook?.volumeInfo.title}
                            </h2>
                            <div style={{display: "flex", marginBottom: "1rem"}}>
                                <motion.img src={selectedBook?.volumeInfo.imageLinks?.thumbnail} alt="" className={"mobile-hidden"} style={{marginRight: "1rem", objectFit: "cover", width: "180px", height: "270px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}/>
                                <div>
                                    {
                                        selectedBook?.volumeInfo.description?<h4 style={{
                                            fontWeight: "bold",
                                            color: "#333",
                                            marginBottom: "0.5rem"
                                        }}>Description</h4>: ""
                                    }
                                    <div>
                                        <div>
                                        <p style={{fontSize: "1.2rem", marginBottom: "1rem", color: "#555"}}>
                                            {selectedBook?.volumeInfo.description?.length > 200
                                                ? selectedBook?.volumeInfo.description?.substr(0, 200) + "... "
                                                : selectedBook?.volumeInfo.description}
                                            {selectedBook?.volumeInfo.description?.length > 200 && (
                                                <motion.a
                                                    href={selectedBook.volumeInfo.previewLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={'modal-show-more'}
                                                    whileHover={{scale: 1.05}}
                                                    whileTap={{scale: 0.95}}
                                                >
                                                    Show MORE!
                                                </motion.a>)}
                                        </p>
                                        <p style={{fontSize: "1.2rem", marginRight: "1rem", color: "#333"}}>
                                            <strong>Author:</strong> {selectedBook?.volumeInfo.authors?.[0]}</p>
                                        <p style={{fontSize: "1.2rem", color: "#333"}}><strong>Page
                                            count:</strong> {selectedBook?.volumeInfo.pageCount}</p>
                                        <p style={{fontSize: "1.2rem", color: "#555"}}><strong>Publication
                                            date:</strong> {selectedBook?.volumeInfo.publishedDate}</p>
                                            <img
                                                onClick={(e) => handleHeartClick(e, selectedBook.id,selectedBook)}
                                                src={heartIcon}
                                                alt="heart icon"
                                                style={{
                                                    marginRight:'1rem',
                                                    width: "2rem",
                                                    height: "2rem",
                                                    filter: likedBooks.includes(selectedBook.id) ? "none" : "grayscale(100%)",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s ease-in-out",
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                                                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                            />
                                        <motion.a
                                            href={selectedBook.volumeInfo.previewLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={"modal-button-link"}
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                        >
                                            Full Version
                                        </motion.a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => setShowModal(false)}
                                className={"modal-button"}
                                whileHover={{scale: 1.1, backgroundColor: '#f5f5f5'}}
                            >
                                <FiX size={18}/>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Book;
