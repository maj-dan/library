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