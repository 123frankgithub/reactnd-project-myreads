import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    query: '',
    books: [],
    shelfChange: false
  }

  getBooks = (event) => {
    this.setState({ query: event.target.value })
    let query = event.target.value
    BooksAPI.search(query, 10).then((books) => {
      this.setState({books})
    })
  }

  render() {
    let books = this.state.books
    const { query } = this.state
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={ this.getBooks} />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map((book) => (
                <Book
                  book={book}
                  key={ book.id }
                  changeShelf={this.props.changeShelf}
                />
              ))}
            </ol>
          </div>
        </div>
      )}
}
export default Search
