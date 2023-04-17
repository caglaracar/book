import axios from "axios";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {

    try {
        const {data} = await axios.get(`${API_URL}?q=${query}&maxResults=30`);
        console.log("dataaaaa",data)
        return data;

    }
    // Hata durumunda kullanıcıya gösterilecek mesajı ekrana yazdırın veya hata mesajını bir UI elemanında görüntülenir
    catch (error) {
        console.error(error);

    }
};
