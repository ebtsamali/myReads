import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
	constructor (props) {
		super(props);
		this.state = {
			searchBooks: []
		}
	}

	/**
	* @description update searchBooks
	* @param {array} value
	*/
	updateSearchBooks = (value) => {
		this.setState({
			searchBooks: value
		})
	}

	/**
	* @description handle change search input and send request
	* @param {string} value
	*/
	handleSearch = (value) => {
		/**
		* @description send request to get books that matches search input
		* @param {string} value
		* @returns {array} res  || @returns {object} res || undefined
		*/
		BooksAPI.search(value).then(res => {
			if(res && !res.error) {
				// call updateSearchBooks function
				this.updateSearchBooks(res);
			} else {
				this.updateSearchBooks([]);
			}
		})
	}


	/**
	* @description check if book is already exist in one of the shelf's books in main page
	* @param {object} (destructure book object and only use id)
	* @returns {object} book (if book exist)
	*/
	findBook = ({id}) => {
		const { books } = this.props.location.state;
		const book =books.find(book => book.id === id);
		if (book) {
			return book;
		}
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
								<BookItem key={book.id} book={checkedBook? checkedBook : book} />
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;