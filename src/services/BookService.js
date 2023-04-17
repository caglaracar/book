import axios from "axios";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {
    const { data } = await axios.get(`${API_URL}?q=${query}&maxResults=30`);

    if (data.error) {
        throw new Error(data.error.message);
    }
    return data;
};
