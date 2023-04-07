import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [bookData, setBookData] = useState({
    isUpdate: false,
    title: "",
    author: "",
    category: "",
    price: "",
  });

  const [isDelete, setIsDelete] = useState(false);
  const [booksCollection, setBooksCollection] = useState([]);

  function handleBookData(e) {
    console.log(bookData, "handlebookdta");
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  }

  function submitBookData(e) {
    e.preventDefault();

    const { title, author, price, category, isUpdate } = bookData;

    if (!title && !author && !price && !category) {
      alert("Book field can not be empty ");
      return;
    }
    sendBookData(bookData);
  }
  function sendBookData(bookData) {
    fetch("https://librarymanagementbackend-production.up.railway.app/book", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(bookData),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        setBooksCollection([...data]);
      })
      .catch(function (err) {
        console.log(err);
      });
    setBookData({
      title: "",
      author: "",
      price: "",
      category: "",
      isUpdate: false,
    });
  }

  async function getBookData() {
    const res = await fetch(
      "https://librarymanagementbackend-production.up.railway.app/book"
    );
    const data = await res.json();
    console.log(data, "json fetching data");
    setBooksCollection([...data]);
  }
  useEffect(() => {
    getBookData();
  }, [bookData, isDelete]);

  async function deleteBook(id) {
    await fetch(
      "https://librarymanagementbackend-production.up.railway.app/book/" + id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((res) => res);

    setIsDelete(!isDelete);
  }
  async function updateBook(id, book) {
    if (book.isUpdate == false) {
      alert(
        "For updating the book ,please write details in input box and then click on confirm button"
      );
      book.isUpdate = true;

      await handleUpdateBook(id, book);
      setBookData({ ...book, isUpdate: false });
    } else {
      alert("Book is updated successfully");

      book.isUpdate = false;
      book = { ...book, ...bookData };

      await handleUpdateBook(id, book);
      setBookData({
        isUpdate: false,
        title: "",
        author: "",
        category: "",
        price: "",
      });
    }
  }
  async function handleUpdateBook(id, book) {
    await fetch(
      "https://librarymanagementbackend-production.up.railway.app/updatebook/" +
        book._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(book),
      }
    );
  }
  return (
    <div className="dashboard">
      <div className="header">
        <h1>Inventory Management</h1>
      </div>
      <div className="input-container">
        <form action="" onSubmit={(e) => submitBookData(e)}>
          <div className="input-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => handleBookData(e)}
              name="title"
              value={bookData.title}
            />
          </div>
          <div className="input-control">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              onChange={(e) => handleBookData(e)}
              name="author"
              value={bookData.author}
            />
          </div>
          <div className="input-control">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              onChange={(e) => handleBookData(e)}
              name="price"
              value={bookData.price}
            />
          </div>
          <div className="input-control">
            <label htmlFor="category">Category</label>
            <input
              onChange={(e) => handleBookData(e)}
              type="text"
              id="category"
              name="category"
              value={bookData.category}
            />
          </div>
          <div className="input-control">
            <button>Add Book</button>
          </div>
        </form>
      </div>
      <div className="book-container">
        <h2>All Books</h2>
        <div className="book-wrapper">
          {booksCollection.map((book) => (
            <div className="book-card" key={book._id}>
              <h2>{book.title}</h2>
              <span>{book.author}</span>
              <p>{book.category}</p>
              <p>
                <b>RS . {book.price}</b>
              </p>

              <div className="upd-delete-btn-box">
                <button
                  type="button"
                  id="update"
                  onClick={() => updateBook(book._id, book)}
                >
                  {book.isUpdate == false ? "Update" : "Confirm"}
                </button>

                <button
                  type="button"
                  id="delete"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
