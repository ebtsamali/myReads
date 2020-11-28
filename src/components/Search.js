import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBooks: [],
			query: '',
		}
	}

	/**
	* @description update state
	* @param {string} property
	* @param {array || string} value
	*/
	updateState = (property,value) => {
		this.setState({
			[property]: value
		})
	}

	/**
	* @description handle change search input and send request
	* @param {string} value
	*/
	handleSearch = (value) => {
		this.updateState('query',value);
		if (value === '') {
			this.updateState('searchBooks', []);
			return;
		} else {
			/**
			* @description send request to get books that matches search input
			* @param {string} value
			* @returns {array} res  || @returns {object} res
			*/
			BooksAPI.search(value).then(res => {
				if (this.state.query !== '' && res && !res.error) {
					this.updateState('searchBooks', res);
				} else {
					this.updateState('searchBooks', []);
				}
			})
		}
	}


	/**
	* @description check if book is already exist in one of the shelf's books in main page
	* @param {object} (destructure book object and only use id)
	* @returns {object} book
	*/
	findBook = (recievedBook) => {
		const { books } = this.props;
		let book = recievedBook;
		if (books.length) {
			const checkedBook = books.find(book => book.id === recievedBook.id);
			book = checkedBook ? checkedBook : recievedBook;
		}
		return book;
	}

	render() {
		const { searchBooks } = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					{/* Link to main page */}
					<Link to='/'>
						<button className="close-search">Close</button>
					</Link>

					{/* input element to search for book */}
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={(e) => this.handleSearch(e.target.value)}
						/>
					</div>
				</div>

				{/* list of search books result */}
				<div className="search-books-results">
					<ol className="books-grid">
						{/* map on search books to display them if exist */}
						{searchBooks.length !== 0 && searchBooks.map(book => {
							const checkedBook = this.findBook(book);
							return (
								<BookItem key={book.id} book={checkedBook} updateShelf={this.props.updateShelf} />
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	books: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired
}

export default Search;