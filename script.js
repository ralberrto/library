const displayController = (function() {
    class Book {
        constructor(title, author, pages, isRead) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.isRead = isRead;
        }

        get info() {
            let read = this.isRead ? "read" : "not read yet";
            return `The ${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
        }

        switchStatus() {
            this.isRead = !this.isRead;
        }
    }

    class Card {
        static resetAttributes() {
            for (let card of _cardLibrary) {
                card._setButtonAttributes(card.isReadBtn);
                card._setButtonAttributes(card.removeBtn);
            }
        }

        constructor(entry) {
            this.entry = entry;
            this.attr = ["title", "author", "pages"];
            this.attrDisp = ["título", "autor", "páginas"];
            this.card = document.createElement("div");
            this.#addAttributes();
            for (let i in this.attr) {
                this.#appendField(this.attrDisp[i],  this.attr[i]);
            }
            [this.isReadBtn, this.removeBtn] = this.#addButtons();
        }

        #addAttributes() {
            this.card.classList.add("card");
        }

        #appendField(fieldTitle, fieldName) {
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

        #addButtons() {
            let wrapper, isReadBtn, removeBtn;
            wrapper = document.createElement("div");
            wrapper.classList.add("card-buttons");

            isReadBtn = document.createElement("button");
            isReadBtn.classList.add("is-read");
            isReadBtn.addEventListener("click", this.#switchReadStatus);
            this._setButtonAttributes(isReadBtn);

            removeBtn = document.createElement("button");
            removeBtn.classList.add("remove");
            removeBtn.addEventListener("click", this.#removeCard);
            this._setButtonAttributes(removeBtn);
            removeBtn.textContent = "Eliminar";

            wrapper.appendChild(isReadBtn);
            wrapper.appendChild(removeBtn);

            this.card.appendChild(wrapper);
            return [isReadBtn, removeBtn];
        }

        #removeCard() {
            let index = Number(this.getAttribute("index").substring(1));
            _library.splice(index, 1);
            _cardLibrary.splice(index, 1);
            displayCards();
            Card.resetAttributes();
        }

        #switchReadStatus() {
            let index = Number(this.getAttribute("index").substring(1));
            let card = _cardLibrary[index];
            card.entry.switchStatus();
            card._setButtonAttributes(this);
        }

        _setButtonAttributes(buttonElement) {
            let value;
            if (Array.from(buttonElement.classList).some(x => x === "is-read")) {
                buttonElement.textContent = this.entry.isRead ? "Leído" : "No leído";
                value = this.entry.isRead ? "read" : "not-read";
                buttonElement.setAttribute("status", value);
            }
            buttonElement.setAttribute("index", "i" + String(_library.indexOf(this.entry)));
            buttonElement.setAttribute("type", "button");
        }

    }

    const _library = [new Book("Republica", "Platón", 1081, true),
        new Book("Robinson Crusoe", "Daniel Defoe", 701, false),
        new Book("El Discurso del Método", "René Descartes", 982, false)];

    const _makePreexistentCards = function() {
        const cardLibrary = [];
        for (let entry of _library) {
            cardLibrary.push(new Card(entry));
        }
        return cardLibrary;
    };

    const _cardLibrary = _makePreexistentCards();

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
            addBookToLibrary(newBook);
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

    function displayCards() {
        clearCardContainer();
        for (let card of _cardLibrary) {cardContainer.appendChild(card.card);}
    }

    function clearCardContainer() {
        cardContainer.innerHTML = "";
    }

    function addBookToLibrary(bookObject) {
        _library.push(bookObject);
        _cardLibrary.push(new Card(bookObject));
    }

})();
