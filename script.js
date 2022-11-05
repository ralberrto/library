console.log("Hello, world!")

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        if (this.isRead) { read = "read" } else { read = "not read yet" }
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    };
}

const republic = new Book("Republic", "Plato", 1081, true);
const harryPotter = new Book("Harry Potter", "J. K. Rowling", 525, false);
console.log(republic.info())
console.log(harryPotter.info())