let myLibrary = [new Book("Republica", "Platón", 1081, true),
    new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
    new Book("El Discurso del Método", "René Descartes", 982, false),
    new Book("Asesinato en el Expreso de Oriente", "Agatha Christe", 492, true)];

const veil = document.getElementById("veil");
const addModal = document.getElementById("add-modal");
const addBtn = document.getElementById("add-btn");
const addBookForm = document.getElementById("add-book");
const commonInputs = Array.from(document.querySelectorAll(".form-field.common input"));

veil.addEventListener("click", toggleAddBookModal);
addBtn.addEventListener("click", toggleAddBookModal);

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm(commonInputs) ? commonInputs.map(x => x.classList.remove("attempted")) :
        commonInputs.map(x => x.classList.add("attempted"));
});

displayCards()

function submitForm(requiredInputElements) {
    let successful;
    if ( requiredInputElements.every(isValid) ) {
        toggleAddBookModal(undefined, true);
        successful = true;
    }
    else { successful = false; }
    return successful;
}

function isValid(inputElement) {
    return inputElement.validity.valid;
}

function toggleAddBookModal(event, reset = false) {
    veil.classList.toggle("on");
    addModal.classList.toggle("on");
    reset ? addBookForm.reset() : undefined;
}

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
    fieldName === "title" ? value.classList.toggle("title") : undefined;
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