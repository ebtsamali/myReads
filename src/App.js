import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import './App.css'

const BooksApp = () => {
		return (
			<BrowserRouter>
				<Route exact path='/' component={Home} />
				<Route exact path='/search' component={Search} />
			</BrowserRouter>
		);
}

export default BooksApp
