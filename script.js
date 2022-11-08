let myLibrary = [new Book("Republica", "Platón", 1081, true),
    new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
    new Book("El Discurso del Método", "René Descartes", 982, false)];

const cardContainer = document.getElementById("card-cont");
const veil = document.getElementById("veil");
const addModal = document.getElementById("add-modal");
const addBtn = document.getElementById("add-btn");
const addBookForm = document.getElementById("add-book");
const addBookInputs = Array.from(document.querySelectorAll("#add-book input"));
const commonInputs = addBookInputs.filter(x => x.type !== "checkbox");

displayCards()

let isReadBtns;
let removeBtns;
locateCardButtons();

veil.addEventListener("click", toggleAddBookModal);
addBtn.addEventListener("click", toggleAddBookModal);

function locateCardButtons() {
    removeBtns = Array.from(document.querySelectorAll(".card .remove"));
    removeBtns.map(element => element.addEventListener("click", removeCard))
    isReadBtns = Array.from(document.querySelectorAll(".card .is-read"));
    isReadBtns.map(element => element.addEventListener("click", switchReadStatus));
}

function removeCard() {
    let index= Number(this.getAttribute("index").substring(1));
    console.table(myLibrary)
    myLibrary.splice(index, 1);
    console.table(myLibrary);
    displayCards();
    locateCardButtons();
}

function switchReadStatus() {
    let index = Number(this.getAttribute("index").substring(1));
    let card = myLibrary[index];
    let status = card.switchStatus();
    setButtonAttributes(this, status, index);
}

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if ( submitForm(commonInputs) ) {
        commonInputs.map(x => x.classList.remove("attempted"));
    }
    else {
        commonInputs.map(x => x.classList.add("attempted"));
    }
});

function captureBookInput() {
    let titleElement = document.querySelector("#add-book #title");
    let authorElement = document.querySelector("#add-book #author");
    let pagesElement = document.querySelector("#add-book #pages");
    let isReadElement = document.querySelector("#add-book #is-read");
    let [title, author, pages, isRead] = [titleElement, authorElement, pagesElement,
        isReadElement].map(x => takeContentFromElement(x));
    return new Book(title, author, pages, isRead);
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
        let newBook = captureBookInput();
        addBookToLibrary(newBook);
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
    this.switchStatus = () => {
        if (this.isRead ) { this.isRead = false; }
        else { this.isRead = true; }
        return this.isRead;
    }
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject)
    clearCardContainer();
    displayCards();
    locateCardButtons();
}

function clearCardContainer() {
    cardContainer.innerHTML = "";
}

function displayCards() {
    let card, entry;
    clearCardContainer();
    for ( let i = 0 ; i < myLibrary.length ; i++ ) {
        entry = myLibrary[i];
        card = document.createElement("div");
        card.classList.toggle("card");
        
        appendField(card, entry, "título", "title");
        appendField(card, entry, "autor", "author");
        appendField(card, entry, "páginas", "pages");

        addButtons(card, entry, i)

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

function addButtons(element, entry, index) {
    let div, isReadBtn, removeBtn;
    div = document.createElement("div");
    div.classList.toggle("card-buttons");
    isReadBtn = document.createElement("button");
    removeBtn = document.createElement("button");
    isReadBtn.classList.toggle("is-read");
    removeBtn.classList.toggle("remove");
    setButtonAttributes(isReadBtn, entry.isRead, index);
    setButtonAttributes(removeBtn, undefined, index);
    removeBtn.textContent = "Eliminar";
    isReadBtn.setAttribute("type", "button");
    removeBtn.setAttribute("type", "button");
    div.appendChild(isReadBtn);
    div.appendChild(removeBtn);

    element.appendChild(div);
}

function setButtonAttributes(buttonElement, status, index) {
    let value;
    if ( Array.from(buttonElement.classList).some(x => x === "is-read") ) {
        buttonElement.textContent = status ? "Leído" : "No leído";
        value = status ? "read" : "not-read";
        buttonElement.setAttribute("status", value);
    }
    buttonElement.setAttribute("index", "i" + String(index));
}