const { nanoid } = require('nanoid');

const books = require('./books');

const saveBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = true;
  if (pageCount > readPage) {
    finished = false;
  }
  const newbook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  books.push(newbook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBook = (request, h) => {
  const jumlah = books.length;
  const parameter = request.query;
  const getBooks = [];
  if (Object.prototype.hasOwnProperty.call(parameter, 'name')) {
    const search = parameter.name.toLowerCase();
    let i;
    for (i = 0; i < jumlah; i += 1) {
      if (books[i].name.toLowerCase().includes(search)) {
        const { id, name, publisher } = books[i];
        const book = { id, name, publisher };
        getBooks.push(book);
      }
    }
    const response = h.response({
      status: 'success',
      data: {
        books: getBooks,
      },
    });
    return response;
  }
  if (Object.prototype.hasOwnProperty.call(parameter, 'reading') && parameter.reading !== undefined) {
    const params = !!Number(parameter.reading);
    let i;
    for (i = 0; i < jumlah; i += 1) {
      if (books[i].reading === params) {
        const { id, name, publisher } = books[i];
        const book = { id, name, publisher };
        getBooks.push(book);
      }
    }
    const response = h.response({
      status: 'success',
      data: {
        books: getBooks,
      },
    });
    return response;
  }
  if (Object.prototype.hasOwnProperty.call(parameter, 'finished') && parameter.finished !== undefined) {
    const params = !!Number(parameter.finished);
    let i;
    for (i = 0; i < jumlah; i += 1) {
      if (books[i].finished === params) {
        const { id, name, publisher } = books[i];
        const book = { id, name, publisher };
        getBooks.push(book);
      }
    }
    const response = h.response({
      status: 'success',
      data: {
        books: getBooks,
      },
    });
    return response;
  }
  let i;
  for (i = 0; i < jumlah; i += 1) {
    const { id, name, publisher } = books[i];
    const book = { id, name, publisher };
    getBooks.push(book);
  }
  return {
    status: 'success',
    data: {
      books: getBooks,
    },
  };
};
const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
const editBookById = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  let finished = true;
  if (pageCount > readPage) {
    finished = false;
  }
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteBookById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
  saveBook,
  getBook,
  getBookById,
  editBookById,
  deleteBookById,
};
