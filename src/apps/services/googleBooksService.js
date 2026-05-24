// services/googleBooksService.js
const axios = require("axios");
const findByIsbn = async (isbn) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
  );

  if (!data.items?.length) return null;

  const { volumeInfo } = data.items[0];

  return {
    title: volumeInfo.title,
    author: volumeInfo.authors?.[0] ?? null,
    publisher: volumeInfo.publisher ?? null,
    year: parseInt(volumeInfo.publishedDate) ?? null,
    description: volumeInfo.description ?? "Sem descrição",
    isbn,
  };
};

module.exports = { findByIsbn };
