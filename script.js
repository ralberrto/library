let myLibrary = [new Book("Republica", "Platón", 1081, true),
    new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
    new Book("El Discurso del Método", "René Descartes", 982, false),
    new Book("Asesinato en el Expreso de Oriente", "Agatha Christe", 492, true)];

const veil = document.getElementById("veil");
const addModal = document.getElementById("add-modal");
const addBtn = document.getElementById("add-btn");
const addBookForm = document.getElementById("add-book");
const addBookInputs = Array.from(document.querySelectorAll("#add-book input"));
const commonInputs = addBookInputs.filter(x => x.type !== "checkbox");


veil.addEventListener("click", toggleAddBookModal);
addBtn.addEventListener("click", toggleAddBookModal);

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if ( submitForm(commonInputs) ) {
        commonInputs.map(x => x.classList.remove("attempted"));
    }
    else {
        commonInputs.map(x => x.classList.add("attempted"));
    }
});

displayCards()

function captureBookInput() {
    let titleElement = document.querySelector("#add-book #title");
    let authorElement = document.querySelector("#add-book #author");
    let pagesElement = document.querySelector("#add-book #pages");
    let isReadElement = document.querySelector("#add-book #is-read");
    let [title, author, pages, isRead] = [titleElement, authorElement, pagesElement,
        isReadElement].map(x => takeContentFromElement(x));
    console.table([title, author, pages, isRead]);
}

function takeContentFromElement(element) {
    if ( element.getAttribute("type") === "checkbox" ) {
        return element.checked;
    }
    else { return element.value; }
}

function submitForm(requiredInputElements) {
    let isFormValid = requiredInputElements.every(isValid);
    if ( isFormValid ) {
        //addBookInputs.map(x => { console.log(takeContentFromElement(x)) });
        captureBookInput();
        toggleAddBookModal(undefined, true);
    }
    return isFormValid;
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