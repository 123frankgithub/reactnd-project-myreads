import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = { shelfChange: false }

  onShelfChange() {
    this.setState({ shelfChange: true })
    this.props.notifyShelfChange();
  }

  render() {
    const { books } = this.props

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            book={book}
            key={ book.id }
            changeShelf={this.props.changeShelf}
          />
        ))}
      </ol>
    )
  }

}

export default BookShelf
