import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksShelf from './BooksShelf';
import * as BooksAPI from '../BooksAPI';

class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
			books: []
		}
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
	* @description update books value
	* @param {array} value
	*/
	updateBooks = (value) => {
		this.setState({
			books: value
		})
	}

	/**
	* @description change book shelf and update books
	* @param {object} updatedBook
	* @param {string} shelf
	*/
	updateShelf = (updatedBook, shelf) => {
		const updatedBooks = this.state.books.map(book => book.id === updatedBook.id 
			? {...book, shelf}
			: book
		);
		this.updateBooks(updatedBooks);
	}

	render() {
		const { books } = this.state;
		return (
			<div className="app">
				<div className="list-books">
					{/* Header */}
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>

					{/* Books shelfs */}
					<div className="list-books-content">
						<BooksShelf 
							books={books.filter(book => book.shelf === 'currentlyReading')} 
							title='Currently Reading'
							updateShelf={this.updateShelf}
						/>
						<BooksShelf 
							books={books.filter(book => book.shelf === 'wantToRead')}
							title='Want to Read'
							updateShelf={this.updateShelf}
						/>
						<BooksShelf 
							books={books.filter(book => book.shelf === 'read')} 
							title='Read'
							updateShelf={this.updateShelf}
						/>
					</div>

					{/* Link to search page */}
					<div className="open-search">
						<Link to={{
							pathname:'/search',
							state: {books: this.state.books}
						}} >
							<button>Add a book</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;
