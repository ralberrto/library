let myLibrary = [new Book("Republica", "Platón", 1081, true),
    new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
    new Book("El discourso del Método", "René Descartes", 982, false)];


displayCards()

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

function addBookToLibrary() {
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

function displayCards() {
    const cardContainer = document.getElementById("card-cont");
    let card, entry;
    for ( let i = 0 ; i < myLibrary.length ; i++ ) {
        entry = myLibrary[i];
        card = document.createElement("div");
        card.classList.toggle("card");
        
        appendField(card, entry, "título", "title");
        appendField(card, entry, "autor", "author");
        appendField(card, entry, "páginas", "pages");

        addIsRead(card, entry)

        cardContainer.appendChild(card);
    }
}

function appendField(element, entry, fieldTitle, fieldName) {
    let field = document.createElement("p");
    let value = document.createElement("p");

    field.classList.toggle("field-name");
    field.textContent = fieldTitle;
    element.appendChild(field);

    value.classList.toggle("field-value");
    value.textContent = entry[fieldName];
    element.appendChild(value);
}

function addIsRead(element, entry) {
    let paragraph;
    paragraph = document.createElement("p");
    paragraph.classList.toggle("is-read");
    paragraph.textContent = entry.isRead ? "Leído" : "No leído";
    element.appendChild(paragraph);
}