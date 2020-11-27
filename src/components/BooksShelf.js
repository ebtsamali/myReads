import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

const BooksShelf = (props) => {
	const { books, title, updateShelf } = props;

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				{/* List of shelf's books */}
				<ol className="books-grid">
					{books.length !== 0 && books.map(book => <BookItem key={book.id} book={book} updateShelf={updateShelf} />)}
				</ol>
			</div>
		</div>
	);
}

BooksShelf.propTypes = {
	books: PropTypes.array,
	title: PropTypes.string.isRequired,
	updateShelf: PropTypes.func.isRequired
}

export default BooksShelf;