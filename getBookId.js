const { getBookId, quest } = require('./library');

const libraryId = async () => {
    const id = await quest('Input book id : ');
    getBookId(id);
}

libraryId();