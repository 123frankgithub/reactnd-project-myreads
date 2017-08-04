import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import { Link } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfChange: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(response => {
        // ignore the response, update our own state here
        // first, update the shelf of our book object
        book.shelf = shelf

        // next, update state by filtering out the old book (if we have it)
        // and re-adding our updated book object
        this.setState({ books: this.state.books.filter(b => b.id !== book.id).concat([ book ]) })
      })
    }
  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path="/search" render={( { history }) => (
          <Search
            changeShelf={this.changeShelf}
          />
        )} />
        <Route exact  path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList books={ books }
              changeShelf={this.changeShelf}/>
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
