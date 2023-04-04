import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  });
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    _id: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAdded, setIsAdded] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [booksCollection, setBooksCollection] = useState([]);

  function handleBookData(e) {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  }

  function submitBookData(e) {
    e.preventDefault();
    console.log(bookData, "JJJJJJJJ", isAdded);
    if (!isUpdate) {
      const { title, author, price, category } = bookData;
      if (!title && !author && !price && !category) {
        alert("Book field can not be empty ");
        return;
      }

      sendBookData();
    }
  }
  function sendBookData() {
    fetch("https://library-management-production-b683.up.railway.app/book", {
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
      .catch(function (res) {
        console.log(res);
      });
    setBookData({
      title: "",
      author: "",
      price: "",
      category: "",
    });
  }

  async function getBookData() {
    const res = await fetch(
      "https://library-management-production-b683.up.railway.app/book"
    );
    const data = await res.json();
    setBooksCollection([...data]);

  }
  useEffect(() => {
    getBookData();
    console.log("object");
  }, [bookData,isAdded, isDelete, isUpdate]);

  async function deleteBook(id) {
   await fetch(
     "https://library-management-production-b683.up.railway.app/book/" + id,
     {
       method: "DELETE",
     }
   )
     .then((res) => res.json())
     .then((res) => console.log(res));
    setIsDelete(!isDelete);
  }
  function updateBook(id, book) {
    if (!isUpdate) {
      setBookData({ ...book });
      setUpdatedBook({ ...book });
      setIsUpdate((prev) => !prev);
      setIsAdded(false);
    } else {
      setUpdatedBook({ ...updatedBook });
      console.log(updatedBook, "iddd");
      fetch(
        "https://library-management-production-b683.up.railway.app/" +
          updatedBook._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookData),
        }
      );
      getBookData();
      setBookData({ ...updateBook });
      setIsUpdate((prev) => !prev);
      setIsAdded(true);
    }
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
            {isAdded == false ? (
              <button type="button" onClick={() => updateBook()}>
                Update Book
              </button>
            ) : (
              <button>Add Book</button>
            )}
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
                  Update
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
