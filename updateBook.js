const fs = require('fs');
const { fileDb, quest, questUpd, updBookById } = require('./library');

const update = async () => {
    const file = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(file);

    const askId = async () => {
        const id = await quest('Input book id that you want to update : ');
        const filterId = data.filter(todo => todo.id !== id);
        if (filterId.length < data.length) {
            console.log(`Book with id ${id} found\n`);

            const title = await questUpd('Input new book title : ');
            const author = await questUpd('Input new book author : ');
            const category = await questUpd('Input new book category : ');
            const page = await questUpd('Input new number of book pages : ');
            const language = await questUpd('Input new language of book : ');
            const publisher = await questUpd('Input new book publisher : ');
            const datePublished = await questUpd('Input new date the book was published : ');

            const newData = {};
            if (title) newData.title = title; 
            if (author) newData.author = author;
            if (category) newData.category = category;
            if (page) newData.page = page;
            if (language) newData.language = language;
            if (publisher) newData.publisher = publisher;
            if (datePublished) newData.datePublished = datePublished;

            updBookById(id, newData);
          
            // updBookById(id, { title, author, page, language, publisher, datePublished });
        } else {
            console.log(`Book with id ${id} not found\n`);
            update();
        }
    }

    askId();

}

update();

// if (answer.trim() !== '') {
//     resolve(answer);
// } else {
//     console.log("Invalid input. Try again!\n");
//     ask();
// }

