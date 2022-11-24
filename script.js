let myLibrary = [new Book("Republica", "Platón", 1081, true),
    new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
    new Book("El Discurso del Método", "René Descartes", 982, false)];

const logicController = (function() {
    function addBookToLibrary(bookObject) {
        myLibrary.push(bookObject)
    }

    return {addBookToLibrary}
})();

const displayController = (function() {
    const cardContainer = document.getElementById("card-cont");
    const veil = document.getElementById("veil");
    const modal = document.getElementById("add-modal");
    const newBookBtn = document.getElementById("add-btn");
    const formBtn = document.getElementById("add-book");
    const modalInputs = Array.from(document.querySelectorAll("#add-book input"));
    const commonInputs = modalInputs.filter(x => x.type !== "checkbox");

    displayCards()

    newBookBtn.addEventListener("click", toggleAddBookModal);
    veil.addEventListener("click", toggleAddBookModal);

    formBtn.addEventListener("submit", _submitForm);

    function _submitForm(event) {
        event.preventDefault();
        if (validateForm(commonInputs)) {
            commonInputs.forEach(x => x.classList.remove("attempted"));
            let newBook = captureBookInput();
            logicController.addBookToLibrary(newBook);
            displayCards();
            addEventsToCardButtons();
            toggleAddBookModal(undefined, true);
        }
        else {
            commonInputs.forEach(x => x.classList.add("attempted"));
        }
    }

    function validateForm(requiredInputElements) {
        let isFormValid = requiredInputElements.every((element) => element.validity.valid);
        return isFormValid;
    }

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
        else { return element.value.trim(); }
    }

    function toggleAddBookModal(event, reset = false) {
        veil.classList.toggle("on");
        modal.classList.toggle("on");
        if (reset) {formBtn.reset()}
    }

    addEventsToCardButtons();

    function addEventsToCardButtons() {
        const removeBtns = Array.from(document.querySelectorAll(".card .remove"));
        removeBtns.forEach(element => element.addEventListener("click", removeCard))
        const isReadBtns = Array.from(document.querySelectorAll(".card .is-read"));
        isReadBtns.forEach(element => element.addEventListener("click", switchReadStatus));
    }

    function displayCards() {
        let card, entry;
        clearCardContainer();
        for ( let i = 0 ; i < myLibrary.length ; i++ ) {
            entry = myLibrary[i];
            card = document.createElement("div");
            card.classList.add("card");
            
            appendField(card, entry, "título", "title");
            appendField(card, entry, "autor", "author");
            appendField(card, entry, "páginas", "pages");
        
            addButtons(card, entry, i)
        
            cardContainer.appendChild(card);
        }
        addEventsToCardButtons();
    }

    function removeCard() {
        let index = Number(this.getAttribute("index").substring(1));
        console.table(myLibrary)
        myLibrary.splice(index, 1);
        console.table(myLibrary);
        displayCards();
    }

    function clearCardContainer() {
        cardContainer.innerHTML = "";
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
        div.classList.add("card-buttons");
        isReadBtn = document.createElement("button");
        removeBtn = document.createElement("button");
        isReadBtn.classList.add("is-read");
        removeBtn.classList.add("remove");
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

    function switchReadStatus() {
        let index = Number(this.getAttribute("index").substring(1));
        let card = myLibrary[index];
        let status = card.switchStatus();
        setButtonAttributes(this, status, index);
    }

})();

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
