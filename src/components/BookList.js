import React, {useEffect, useState} from "react";
import {searchBooks} from "../services/BookService";
import '../App.css';
import {motion } from 'framer-motion';
import Book from "./Book";
import LoadingBar from "./LoadingBar";
import Search from '../assets/search.png'

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const searchingBooks = await searchBooks(value);
            setBooks(searchingBooks.items);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (books.length > 0) {
            setIsLoading(false);
        }
        if (books.length > 0 && searchBooks) { // sadece arama yapıldığında ve kitaplar yüklendiğinde kaydırma yap
            setTimeout(() => {
                window.scrollTo({
                    top: window.innerHeight * 0.9,
                    behavior: 'smooth'
                });
            }, 500); // sayfa tamamen yüklendikten 0.5 saniye sonra kaydırma yap
        }
    }, [books, searchBooks]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div>
            <div className={"booklist-container"} >
                <div className={"booklist-input-section"}>
                    <h1 style={ {textAlign:"center", fontSize:"5rem",marginBottom:"2rem"}}><span style={{color:"#4285F4"}}>N</span><span style={{color:"#DB4437"}}>e</span><span style={{color:"#F4B400"}}>x</span><span style={{color:"#0F9D58"}}>u</span><span style={{color:"#DB4437"}}>s</span></h1>
                    <form onSubmit={handleOnSubmit}>
                        <motion.div className={"booklist-input-style "}>
                            <img onClick={handleOnSubmit} className={"booklist-input-style-search-icon"} src={Search} alt="Search Icon"/>
                            <motion.input type="text" placeholder="Books Search..." onChange={handleChange} />
                        </motion.div>
                    </form>
                </div>

            </div>
            {isLoading ? (
                    <LoadingBar/>
                ) : !books || books.length === 0 ? (
                    ""
                ) : (
                    <Book books={books}/>
                )}
            </div>
        </>
    );
};

export default BookList;

