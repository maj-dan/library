const myLibrary = [];

const bookDialog = document.querySelector("#book-dialog");
const addBookBtn = document.querySelector("#add-book-btn");
const actionsContainer = document.querySelector("#dialog-actions");

addBookBtn.addEventListener("click", () => bookDialog.showModal());
actionsContainer.addEventListener("click", executeAddBook);

function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead === "true" ? true: false;
}

function addBookToLibrary(title, author, pages, wasRead) {
    myLibrary.push(new Book(title, author, pages, wasRead));
}

function displayBooks() {
    const booksContainer = document.querySelector("main");
    const displayedBooks = booksContainer.querySelectorAll("div");
    displayedBooks.forEach(book => book.remove());

    for (book of myLibrary) {
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const wasRead = document.createElement("p");

        title.textContent = book.title;
        author.textContent = "Author: " + book.author;
        pages.textContent = "Pages: " + book.pages;
        wasRead.textContent = book.wasRead ?
         "Already read!" : "Not read yet!";

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(wasRead);

        booksContainer.appendChild(card);
    }
}

function executeAddBook(event) {
    let buttonValue;
    if(event.target.tagName === "BUTTON") {
        buttonValue = `${event.target.value}`;
    } else {
        return;
    }

    const valuesArray = [];

    //get values and reset inputs
    const textInputs = bookDialog.querySelectorAll("input[type=text]");
    textInputs.forEach(input => {
        valuesArray.push({value: input.value, required: input.required});
        input.value = "";
    });

    const numberInput = bookDialog.querySelector("input[type=number]");
    valuesArray.push({value: numberInput.value, required: numberInput.required});
    numberInput.value = "";

    const readRadio = bookDialog.querySelector("input[type=radio]#read");
    const notReadRadio = bookDialog.querySelector("input[type=radio]#not-read");
    if(readRadio.checked) {
        valuesArray.push({value: "true", required: readRadio.required});
    } else {
        valuesArray.push({value: "false", required: notReadRadio.required});
    }
    notReadRadio.checked = true;

    event.preventDefault();
    if(buttonValue === "cancel") {
        bookDialog.close();
        return;
    }

    for(object of valuesArray) {
        if(object.value === "" && object.required) {
            //display invalid input message for user
            return;
        }
    }

    bookDialog.close();
    bookDialog.returnValue = valuesArray.reduce((string, object) => {
        if (string === ""){
            return object.value;
        }
        return string + `,${object.value}`;
    }, "");

    addBookToLibrary(...(bookDialog.returnValue.split(",")));
    displayBooks();
}

/*addBookToLibrary("Book 1", "Author 1", 562, false);
addBookToLibrary("Book 2", "Author 2", 200, true);
addBookToLibrary("Book 3", "Author 3", 1025, false);

displayBooks();*/