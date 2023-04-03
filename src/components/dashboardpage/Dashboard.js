import React, { useEffect, useState } from 'react'
import "./Dashboard.css";

function Dashboard() {
const [bookData,setBookData]=useState({
  title:"",
  author:"",
  category:"",
  price:"",
})
const [updatedBook,setUpdatedBook]=useState({  title:"",
  author:"",
  category:"",
  price:"",
  _id:""
})
const [isUpdate,setIsUpdate]=useState(false);
const [booksCollection,setBooksCollection]=useState([]);


function handleBookData(e){
  setBookData({
    ...bookData,
    [e.target.name]:e.target.value,
  })
  console.log(bookData);
}

function submitBookData(e){
  e.preventDefault();
  console.log(bookData,"JJJJJJJJ");
  if(isUpdate){
    sendBookData()
  }
}
function sendBookData(){
  fetch("http://localhost:8000/book", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bookData),
  })
    .then(function (res) {
   
      return res.json();
    }).then((data)=>{
      setBooksCollection([...data])

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

async function getBookData(){
const res = await fetch("http://localhost:8000/book");
const data=await res.json();
setBooksCollection([...data]);

}
useEffect(()=>{

    getBookData();
},[bookData,isUpdate])

function deleteBook(id){

  fetch("http://localhost:8000/book/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
    getBookData();
}
function updateBook(id,book){
  if(!isUpdate){

    setBookData(book);
    setUpdatedBook({...book})
    setIsUpdate(true)
  }
  else{
     setUpdatedBook({ ...updatedBook,...bookData,  });
     console.log(updatedBook,"iddd")
    fetch("http://localhost:8000/update-book/" + updatedBook._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    setBookData({title:"",author:"",price:"",category:""})
    setIsUpdate(false);
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
              type="text"
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
            {isUpdate ? (
              <button type="button" onClick={()=>updateBook()}>Update Book</button>
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
                <button id="update" onClick={() => updateBook(book._id, book)}>
                  Update
                </button>
                <button id="delete" onClick={() => deleteBook(book._id)}>
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

export default Dashboard
