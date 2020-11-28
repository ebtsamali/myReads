import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Home from './components/Home';
import Search from './components/Search';
import './App.css'

class BooksApp extends Component {
	constructor (props) {
		super(props);
		this.state = {
			books: []
		}
	}

	/**
	* @description update books value
	* @param {array} value
	*/
	updateBooks = (value) => {
		this.setState({
			books: value
		})
	}

	componentDidMount () {
		/**
		* @description fetch all books
		* @returns {array} books
		*/
		BooksAPI.getAll().then(books => {
			this.updateBooks(books);
		}).catch(error => {
			console.log(error);
		})
	}

	/**
	* @description change book shelf and update books
	* @param {object} updatedBook
	* @param {string} shelf
	*/
	updateShelf = (updatedBook, shelf) => {
		const { books } = this.state;
		const book = books.find(book => book.id === updatedBook.id);
		let updatedBooks;
		if (book) {
			updatedBooks = books.map(book => book.id === updatedBook.id 
				? {...book, shelf}
				: book
			);
		} else {
			updatedBooks = books.concat([{...updatedBook, shelf}]);
		}
		this.updateBooks(updatedBooks);
	}

	render () {
		const { books } = this.state;
		return (
			<BrowserRouter>
				<Route exact path='/' render={() => (
					<Home books={books} updateShelf={this.updateShelf} />
				)} />
				<Route exact path='/search' render={() => 
					(<Search books={books}  updateShelf={this.updateShelf} />)} 
				/>
			</BrowserRouter>
		);
	}
}

export default BooksApp;
