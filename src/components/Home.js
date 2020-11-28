import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksShelf from './BooksShelf';

const Home = (props) => {
	const { books, updateShelf } = props;
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
						updateShelf={updateShelf}
					/>
					<BooksShelf
						books={books.filter(book => book.shelf === 'wantToRead')}
						title='Want to Read'
						updateShelf={updateShelf}
					/>
					<BooksShelf
						books={books.filter(book => book.shelf === 'read')}
						title='Read'
						updateShelf={updateShelf}
					/>
				</div>

				{/* Link to search page */}
				<div className="open-search">
					<Link to='/search'>
						<button>Add a book</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

Home.propTypes = {
	books: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired
}

export default Home;
