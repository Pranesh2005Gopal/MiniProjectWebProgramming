/*23BCE0947_L7_MP_PRANESH GOPAL*/
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      name: '',
      author: '',
      status: 'Plan to Read',
      editingIndex: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, author, status, books, editingIndex } = this.state;

    if (name.trim() && author.trim()) {
      const newBook = { name, author, status };

      if (editingIndex === null) {
        this.setState({ books: [...books, newBook] });
      } else {
        books[editingIndex] = newBook;
        this.setState({ books, editingIndex: null });
      }

      this.setState({ name: '', author: '', status: 'Plan to Read' });
    }
  }

  handleEdit = (index) => {
    const book = this.state.books[index];
    this.setState({ 
      name: book.name, 
      author: book.author, 
      status: book.status,
      editingIndex: index 
    });
  }

  handleDelete = (index) => {
    const books = this.state.books.filter((_, i) => i !== index);
    this.setState({ books });
  }

  toggleStatus = (index) => {
    const books = [...this.state.books];
    const statusOptions = ["Plan to Read", "Reading", "On-Hold", "Dropped", "Read"];
    const currentIndex = statusOptions.indexOf(books[index].status);
    books[index].status = statusOptions[(currentIndex + 1) % statusOptions.length];
    this.setState({ books });
  }

  getStatusCount = (status) => {
    return this.state.books.filter(book => book.status === status).length;
  }

  render() {
    const { books, name, author, status, editingIndex } = this.state;

    return (
      <div className="App">
        <h1>📚 Book Management System</h1>
        
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Book Name" 
            value={name} 
            onChange={this.handleChange} 
          />
          <input 
            type="text" 
            name="author" 
            placeholder="Author" 
            value={author} 
            onChange={this.handleChange} 
          />
          <select name="status" value={status} onChange={this.handleChange}>
            <option value="Plan to Read">Plan to Read</option>
            <option value="Reading">Reading</option>
            <option value="On-Hold">On-Hold</option>
            <option value="Dropped">Dropped</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">{editingIndex === null ? 'Add Book' : 'Update Book'}</button>
        </form>

        <div className="summary">
          <h2>📊 Summary</h2>
          <p>Total Books: {books.length}</p>
          <p>Plan to Read: {this.getStatusCount('Plan to Read')}</p>
          <p>Reading: {this.getStatusCount('Reading')}</p>
          <p>On-Hold: {this.getStatusCount('On-Hold')}</p>
          <p>Dropped: {this.getStatusCount('Dropped')}</p>
          <p>Completed: {this.getStatusCount('Completed')}</p>
        </div>

        <ul>
          {books.map((book, index) => (
            <li key={index} className={book.status.toLowerCase().replace(/\s/g, '-')}>
              <strong>{book.name}</strong> by {book.author} - 
              <span 
                onClick={() => this.toggleStatus(index)} 
                style={{ cursor: 'pointer', color: 'blue' }}>
                {book.status}
              </span>
              <button onClick={() => this.handleEdit(index)}>Edit</button>
              <button onClick={() => this.handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;




