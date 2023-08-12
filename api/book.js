const express = require("express");
const Book = require("../book.js");

const app = express();
app.use(express.json());
const bookStore = {
	books: [
		new Book(
			"title 1",
			"description 1",
			"autors 1",
			"1favorite 1",
			"file cover 1",
			"file name 1",
			"123456789"
		),
		new Book(
			"title 2",
			"description 2",
			"autors 2",
			"2favorite 2",
			"file cover 2",
			"file name 2"
		),
		new Book(
			"title 3",
			"description 3",
			"autors 3",
			"3favorite 3",
			"file cover 3",
			"file name 3"
		),
	],
};

app.get("/api/books", (req, res) => {
	const { books } = bookStore;
	res.json(books);
});

app.get("/api/books/:id", (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const book = books.find((book) => book.id === id);
	if (book) {
		res.json(book);
	} else {
		res.status(404);
		res.json("Code: 404");
	}
});

app.post("/api/user/login", (req, res) => {
	res.status(201);
	res.json({
		id: 1,
		mail: "test@mail.ru",
	});
});

app.post("/api/books", (req, res) => {
	const { books } = bookStore;
	const { title, description, authors, favorite, fileCover, fileName } =
		req.body;
	const newBook = new Book(
		title,
		description,
		authors,
		favorite,
		fileCover,
		fileName
	);
	books.push(newBook);
	res.status(201);
	res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
	const { books } = bookStore;
	const { title, description, authors, favorite, fileCover, fileName } =
		req.body;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index],
			title,
			description,
			authors,
			favorite,
			fileCover,
			fileName,
		};
		res.json(books[index]);
	} else {
		res.status(404);
		res.json("Code: 404");
	}
});

app.delete("/api/books/:id", (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books.splice(index, 1);
		res.json("ok");
	} else {
		res.status(404);
		res.json("Code: 404");
	}
});

module.exports = app;
