# MyReads Project

This repository contains the files related to the App. The master branch contains the app's source code.

The App is a Web application that has Two pages. The first page(main page) displays your library with three shelves (Currently Reading, Want to Read, and Read), and each shelf has books. Also, you can change the bookshelf. The second page has a text input that is used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book. 


## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Clone the Project
4.  **In Project Directory** 
	Run the following commands:
	```
	npm install
	```

    
## Usage

1. In the **Project** directory, run the following command to launch the Server in development mode:  `npm start`


## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


