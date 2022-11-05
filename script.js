let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        if ( this.isRead ) { read = "read" } else { read = "not read yet" }
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    };
}

function addBookToLibrary () {
    let title = prompt("Enter book's title:");
    let author = prompt("Enter book's author:")
    let pages = prompt("Enter number of pages:")
    let read = "";
    let isRead;
    while ( read.length !== 1 ) {
        read = prompt("Have you read it? (y/n)");
    }
    read = read.toLowerCase();
    if ( read === "y" ) {
        isRead = true;
    }
    else if ( read === "n" ) {
       isRead = false;
    }
    newBook = new Book(title, author, pages, isRead);

    myLibrary.push(newBook)
}