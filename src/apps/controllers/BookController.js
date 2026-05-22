const Books = require("../modules/Books");
const { Op } = require("sequelize");

class BookController {
  async createBook(req, res) {
    const book = await Books.create(req.body);

    if (!book) {
      return res.status(400).json({ message: "Failed to create a book" });
    }
    return res.status(201).json({ message: "Book created with success!" });
  }

  async getBooks(req, res) {
    const { search } = req.query;

    // se não vier busca, retorna tudo (ou pode bloquear)
    if (!search) {
      const books = await Books.findAll();
      return res.status(200).json(books);
    }

    const terms = search.split(" ");

    const books = await Books.findAll({
      where: {
        [Op.and]: terms.map((term) => ({
          [Op.or]: [
            { name: { [Op.iLike]: `%${term}%` } },
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

    const { name, author, year, detail, price, stock } = req.body;

    const book = await Books.findOne({
      where: { id },
    });

    if (!book) {
      return res.status(400).json({ message: "Book not exists!" });
    }

    await book.update({
      name: name || book.name,
      author: author !== undefined ? author : book.author,
      year: year !== undefined ? year : book.year,
      detail: detail || book.detail,
      price: price ?? book.price,
      stock: stock ?? book.stock,
    });

    return res.status(200).json({ message: "Book updated with success!" });
  }
}

module.exports = new BookController();
