const Books = require("../modules/Books");
const { Op } = require("sequelize");
const googleBooksService = require("../services/googleBooksService");

class BookController {
  async createBook(req, res) {
    const { isbn, price, stock } = req.body;

    const existingBook = await Books.findOne({ where: { isbn } });
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book already existis in the library" });
    }

    const bookData = await googleBooksService.findByIsbn(isbn);

    if (!bookData) {
      return res
        .status(404)
        .json({ message: "ISBN not found on Google Books" });
    }

    const book = await Books.create({ ...bookData, price, stock });
    return res.status(201).json(book);
  }

  async createManualbook(req, res) {
    const { isbn, title, author, publisher, year, description, price, stock } =
      req.body;

    const existingBook = await Books.findOne({ where: { isbn } });
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book already exists in the library" });
    }

    const book = await Books.create({
      isbn,
      title,
      author,
      publisher,
      year,
      description,
      price,
      stock,
    });

    return res.status(201).json(book);
  }

  async getBooks(req, res) {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: "Search is required" });
    }

    const terms = search.split(" ");

    const books = await Books.findAll({
      where: {
        [Op.and]: terms.map((term) => ({
          [Op.or]: [
            { title: { [Op.iLike]: `%${term}%` } },
            { author: { [Op.iLike]: `%${term}%` } },
          ],
        })),
      },
      limit: 20,
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    return res.status(200).json(books);
  }

  async updateBook(req, res) {
    const { id } = req.params;

    const { title, author, publisher, year, description, price, stock } =
      req.body;

    const book = await Books.findOne({ where: { id } });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update({
      title: title ?? book.title,
      author: author ?? book.author,
      publisher: publisher ?? book.publisher,
      year: year ?? book.year,
      description: description ?? book.description,
      price: price ?? book.price,
      stock: stock ?? book.stock,
    });

    return res.status(200).json({ message: "Book updated with success!" });
  }
}

module.exports = new BookController();
