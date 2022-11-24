const logicController = (function() {
    function addBookToLibrary(bookObject) {
        myLibrary.push(bookObject)
    }

    return {addBookToLibrary}
})();

const displayController = (function() {
    class Card {
        constructor(entry) {
            this.entry = entry;
            this.attr = ["title", "author", "pages"];
            this.attrDisp = ["título", "autor", "páginas"];
            this.card = document.createElement("div");
            this._addAttributes();
            for (let i in this.attr) {
                this._appendField(this.attrDisp[i],  this.attr[i]);
            }
            this._addButtons();
        }

        _addAttributes() {
            this.card.classList.add("card");
        }

        _appendField(fieldTitle, fieldName) {
            let field = document.createElement("p");
            let value = document.createElement("p");

            field.classList.toggle("field-name");
            field.textContent = fieldTitle; 
            this.card.appendChild(field);

            value.classList.toggle("field-value");
            if (fieldName === "title") {value.classList.toggle("title")};
            value.textContent = this.entry[fieldName];
            this.card.appendChild(value);
        }

        _addButtons() {
            let wrapper, isReadBtn, removeBtn;
            wrapper = document.createElement("div");
            wrapper.classList.add("card-buttons");
            isReadBtn = document.createElement("button");
            removeBtn = document.createElement("button");
            isReadBtn.classList.add("is-read");
            removeBtn.classList.add("remove");
            this._setButtonAttributes(isReadBtn);
            this._setButtonAttributes(removeBtn);
            removeBtn.textContent = "Eliminar";
            wrapper.appendChild(isReadBtn);
            wrapper.appendChild(removeBtn);

            this.card.appendChild(wrapper);
        }

        _setButtonAttributes(buttonElement) {
            let value;
            if ( Array.from(buttonElement.classList).some(x => x === "is-read") ) {
                buttonElement.textContent = this.entry.isRead ? "Leído" : "No leído";
                value = this.entry.isRead ? "read" : "not-read";
                buttonElement.setAttribute("status", value);
            }
            buttonElement.setAttribute("index", "i" + String(myLibrary.indexOf(this.entry)));
            buttonElement.setAttribute("type", "button");
        }

    }

    let myLibrary = [new Book("Republica", "Platón", 1081, true),
        new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
        new Book("El Discurso del Método", "René Descartes", 982, false)];

    const cardContainer = document.getElementById("card-cont");
    const veil = document.getElementById("veil");
    const modal = document.getElementById("add-modal");
    const newBookBtn = document.getElementById("add-btn");
    const formBtn = document.getElementById("add-book");
    const modalInputs = Array.from(document.querySelectorAll("#add-book input"));
    const commonInputs = modalInputs.filter(x => x.type !== "checkbox");

    displayCards()

    newBookBtn.addEventListener("click", toggleModal);
    veil.addEventListener("click", toggleModal);

    formBtn.addEventListener("submit", _submitForm);

    function _submitForm(event) {
        event.preventDefault();
        if (validateForm(commonInputs)) {
            commonInputs.forEach(x => x.classList.remove("attempted"));
            let newBook = captureBookInput();
            logicController.addBookToLibrary(newBook);
            displayCards();
            toggleModal(undefined, true);
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

    function toggleModal(event, reset = false) {
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
            card = new Card(entry);
            cardContainer.appendChild(card.card);
        }
        addEventsToCardButtons();
    }

    function removeCard() {
        let index = Number(this.getAttribute("index").substring(1));
        myLibrary.splice(index, 1);
        console.table(myLibrary);
        displayCards();
    }

    function clearCardContainer() {
        cardContainer.innerHTML = "";
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
