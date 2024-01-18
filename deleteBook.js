const { fileDb, quest, delBookById } = require('./library');
const fs = require('fs');

const deleteBook = async () => {
    const file = fs.readFileSync(fileDb, 'utf8');
    const data = JSON.parse(file);

    const delId = async () => {
        const id = await quest('Input book id that you want to delete : ');
        const filterId = data.filter(todo => todo.id !== id);
        if(filterId.length < data.length) {
            delBookById(id);
        } else {
            console.log(`Book with id ${id} not found\n`);
            deleteBook();
        }
    }
    delId();
}

deleteBook();