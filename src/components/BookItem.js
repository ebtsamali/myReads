import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

class BookItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			shelf: ''
		}
	}

	componentDidMount () {
		const bookShelf = this.props.book.shelf? this.props.book.shelf : 'none';
		/**
		* @description update book shelf
		* @param {string} bookShelf
		*/
		this.updateShelf(bookShelf);
	}

	/**
	* @description update book shelf
	* @param {string} value
	*/
	updateShelf = (value) => {
		const { book, updateShelf } = this.props;
		this.setState ({
			shelf: value
		});
		if(book.shelf !== value) {
			/**
			* @description update book shelf
			* @param {object} book
			* @param {string} value
			*/
			BooksAPI.update(book, value).then(() => {
				if (updateShelf) {
					updateShelf(book, value);
				} 
			}).catch(error => {
				console.log(error);
			})
		}
	}

	render() {
		const { book: {imageLinks, title, authors} } = this.props;
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks? imageLinks.thumbnail : ''})` }}></div>
						{/* select element to change shelf */}
						<div className="book-shelf-changer">
							<select value={this.state.shelf} onChange={(e) => this.updateShelf(e.target.value)}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading"> Currently Reading </option>
								<option value="wantToRead"> Want to Read </option>
								<option value="read"> Read </option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					{/* map on authors to display them if exist */}
					{authors && authors.map((author, index) => {
						return (<div key={index} className="book-authors">{author}</div>);
					})}
				</div>
			</li>
		);
	}
}

BookItem.propTypes = {
	book: PropTypes.object.isRequired,
	updateShelf: PropTypes.func
}

export default BookItem;