let myLibrary = [];
let cardsContainer = undefined;

function Book(name, author, description) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.description = description;
    this.status = 1//readed, not readed
}

Book.prototype.setStatus = function(status){
                                this.status = status;
                            }

window.addEventListener('load', function () {
    loadBooks();
    cardsContainer = document.getElementById("cards-container");

    document.getElementById("newBookFrm").addEventListener("submit", submitBook);

    myLibrary.forEach(element => {
        cardsContainer.innerHTML += createCard(element);
    });
})

function submitBook(e){
    e.preventDefault();
    const frm = new FormData(e.target);
    addBookToLibrary(new Book(frm.get("name"), frm.get("author"), frm.get("description")));   
    refreshLibrary();
}

function delBook(id){
    myLibrary.splice(findBookIndex(id), 1);
    refreshLibrary();
}

function setBookStatus(id, status){
    myLibrary[findBookIndex(id)].status = status;
    refreshLibrary();
}

function findBookIndex(id){
    return myLibrary.findIndex( (book) => book.id == id);
}

function refreshLibrary(){
    cardsContainer.innerHTML = "";
    myLibrary.forEach(element => {
        cardsContainer.innerHTML += createCard(element);
    });    
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showFrm(){
    document.getElementById("newBookFrm").classList.remove("d-none");
}

function createCard(book){
    return `<div class="card" id="${book.id}">
                <div class="card-header">
                    <h5 class="card-title">${book.name}</h5>
                    <button type="button" class="btn" onclick="delBook('${book.id}')"><p>X</p></button>
                </div>
                <div class="card-body">
                    <p class="card-text">${book.description}</p>
                </div>
                <div class="card-footer">
                    <h6 class="card-title">written by ${book.author}</h6>
                    <button type="button" class="btn" onclick="setBookStatus('${book.id}',${!book.status})"><p>${book.status?'readed':'not readed'}</p></button>
                </div>
            </div>`;
}

function loadBooks(){
    getBooks().forEach(e => {
        addBookToLibrary(e);
    })
}

// "backend"
function getBooks(){
    book1 = new Book("It", "Stephen king", "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nesciunt enim, fugiat voluptatibus doloribus cupiditate provident.");
    book2 = new Book("Lord of the rings: two towers", "J.R.R Tolkien", "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nesciunt enim, fugiat voluptatibus doloribus cupiditate provident.");
    return [book1, book2];
}