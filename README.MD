### Method : POST
URL : /books
Body Request
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
Objek buku yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:
```json
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```
Properti yang ditebalkan diolah dan didapatkan di sisi server. Berikut penjelasannya:

- id : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan nanoid.
- finished : merupakan properti boolean yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi pageCount === readPage.
- insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku. Anda bisa gunakan new Date().toISOString() untuk menghasilkan nilainya.
- updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.  


Server harus merespons gagal bila:  
- Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:  
Status Code : 400  
Response Body:
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```  
- Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:  
Status Code : 400  
Response Body:
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```
- Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan:  
Status Code : 500  
Response Body:
```json
{
    "status": "error",
    "message": "Buku gagal ditambahkan"
}
```

Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:  
Status Code : 201
Response Body:
```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```