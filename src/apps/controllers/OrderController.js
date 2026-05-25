const Order = require("../modules/Orders");
const OrderItem = require("../modules/OrdersItems");
const Books = require("../modules/Books");

class OrderController {
  async createOrder(req, res) {
    const { items } = req.body;

    const bookIds = items.map((item) => item.bookId);
    const books = await Books.findAll({ where: { id: bookIds } });

    if (books.length !== bookIds.length) {
      return res.status(404).json({ message: "One or more books not found" });
    }

    for (const item of items) {
      const book = books.find((b) => b.id === item.bookId);
      if (book.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for book: ${book.title}`,
        });
      }
    }

    const total_price = items.reduce((total, item) => {
      const book = books.find((b) => b.id === item.bookId);
      return total + book.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user_id: req.userId,
      total_price,
      status: "pending",
    });

    try {
      await OrderItem.bulkCreate(
        items.map((item) => {
          const book = books.find((b) => b.id === item.bookId);
          return {
            order_id: order.id,
            book_id: item.bookId,
            quantity: item.quantity,
            price: book.price,
          };
        }),
      );
    } catch (err) {
      console.log("ERRO BULKCREATE:", err.original);
      throw err;
    }

    for (const item of items) {
      const book = books.find((b) => b.id === item.bookId);
      await book.update({ stock: book.stock - item.quantity });
    }

    return res
      .status(201)
      .json({ message: "Order created with success!", order });
  }

  async getOrders(req, res) {
    const orders = await Order.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: OrderItem,
          as: "items", // ← precisa bater com o alias do associate
          include: [
            {
              model: Books,
              as: "book", // ← precisa bater com o alias do associate
              attributes: ["title", "author", "price"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(orders);
  }
}

module.exports = new OrderController();
