const generateId = require('./generateId');
const readline = require('readline');
const fs = require('fs');

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const directory = './database';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const fileDb = './database/library.json';
if (!fs.existsSync(fileDb)) {
    fs.writeFileSync(fileDb, '[]', 'utf8');
}

const quest = (quest) => {
    return new Promise((resolve, reject) => {
        const ask = () => {
            read.question(quest, (answer) => {
                if (answer.trim() !== '') {
                    resolve(answer);
                } else {
                    console.log("Invalid input. Try again!\n");
                    ask();
                }
            });
        }
        ask();
    });
};

const questUpd = (quest) => {
    return new Promise((resolve, reject) => {
        read.question(quest, (answer) => {
            resolve(answer);
        });
    });
};

const library = () => {
    const fileLIbrary = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(fileLIbrary);
    console.log(data);

    read.close();
}

const addBook = (title, author, category, page, language, publisher, datePublished) => {
    const id = generateId(6);
    const book = { id, title, author, category, page, language, publisher, datePublished };
    const file = fs.readFileSync(fileDb, 'utf8');
    const dataBook = JSON.parse(file);

    dataBook.push(book);
    fs.writeFileSync(fileDb, JSON.stringify(dataBook));
    console.log('--- Success ---');
    read.close();
}

const getBookId = (id) => {
    const file = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(file);
    const findBookId = data.find(todo => todo.id === id);

    if (findBookId) {
        console.log(`Book with id ${id} found`);
    } else {
        console.log(`Book with id ${id} not found`);
    }

    read.close();
}

const updBookById = (id, updateBook) => {
    const file = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(file);

    const index = data.findIndex(todo => todo.id === id);

    if (index !== -1) {
        data[index] = { ...data[index], ...updateBook };
        fs.writeFileSync(fileDb, JSON.stringify(data));
        console.log(`\n--- Success update book with id ${id} ---`);
    }

    read.close();
}

const delBookById = (id) => {
    const file = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(file);
    const filterBookId = data.filter(todo => todo.id !== id);

    if (filterBookId.length < data.length) {
        fs.writeFileSync(fileDb, JSON.stringify(filterBookId));
        console.log(`Success delete book with id ${id}\n`);
    }

    read.close();
}

module.exports = {
    fileDb,
    quest,
    questUpd,
    library,
    addBook,
    getBookId,
    updBookById,
    delBookById
};
