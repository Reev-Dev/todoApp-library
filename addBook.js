const { addBook, quest } = require('./library');

const addBookData = async () => {
    const title = await quest('Input the title of book : ');
    const author = await quest('Input the author of book : ');
    const category = await quest('Input the category of book : ');
    const page = await quest('Input the number of book pages : ');
    const language = await quest('Input the language of book : ');
    const publisher = await quest('Input the publisher of book : ');
    const datePublished = await quest('Input the date the book was published : ');
    
    addBook(title, author, category, page, language, publisher, datePublished);
}

addBookData();
