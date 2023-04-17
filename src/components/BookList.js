import React, {useEffect, useState} from "react";
import {searchBooks} from "../services/BookService";
import '../App.css';
import {motion } from 'framer-motion';
import Book from "./Book";
import Search from '../assets/search.png'

const BookList = () => {
    const [books, setBooks] = useState([]); // initialize state for books array
    const [isLoading, setIsLoading] = useState(true); // initialize state for loading indicator
    const [value, setValue] = useState(""); // initialize state for search input value

    const handleOnSubmit = async (e) => { // define search form submit handler
        e.preventDefault();
        try {
            const searchingBooks = await searchBooks(value); // perform book search using input value
            if (searchingBooks.items && searchingBooks.items.length > 0) {
                setBooks(searchingBooks.items); // update books state with search results if found
            } else {
                setBooks([]); // reset books state if no results found
                alert("No book found for your search criteria"); // display alert to user
                setValue(""); // reset search input value
            }
        } catch (error) {
            console.error(error); // log error to console
        }
    };

    useEffect(() => { // define effect hook for component updates
        if (books.length > 0) { // if there are books in state
            setIsLoading(false); // set loading indicator to false
        }

        if (books.length > 0 && searchBooks) { // if there are books in state and searchBooks function is defined
            setTimeout(() => { // wait 0.5 seconds before scrolling to bottom of page
                window.scrollTo({
                    top: window.innerHeight * 0.9,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }, [books, searchBooks]); // effect hook dependencies are books and searchBooks

    const handleChange = (e) => { // define search input change handler
        setValue(e.target.value); // update search input value state with new value
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
                {isLoading ? ( // if isLoading state is true, display nothing
                    ""
                ) : !books || books.length === 0 ? ( // if there are no books in state, display nothing
                    ""
                ) : ( // otherwise, display Book component with books prop
                    <Book books={books}/>
                )}
            </div>

        </>
    );
};

export default BookList;

