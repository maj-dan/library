const myLibrary = [];

function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${wasRead ? "already read" : "not read yet"};`
    };
}

function addBookToLibrary(title, author, pages, wasRead) {
    myLibrary.push(new Book(title, author, pages, wasRead));
}

function displayBooks() {
    const booksContainer = document.querySelector("main");

    for (book of myLibrary) {
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const wasRead = document.createElement("p");

        title.textContent = book.title;
        author.textContent = "Author: " + book.author;
        pages.textContent = "Pages: " + book.pages;
        wasRead.textContent = book.wasRead ? "Already read!" : "Not read yet!";

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(wasRead);

        booksContainer.appendChild(card);
    }
}

addBookToLibrary("Book 1", "Author 1", 562, false);
addBookToLibrary("Book 2", "Author 2", 200, true);
addBookToLibrary("Book 3", "Author 3", 1025, false);

displayBooks();