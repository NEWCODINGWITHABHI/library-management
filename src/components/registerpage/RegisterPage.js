import React, { useState } from 'react'
import "./RegisterPage.css"
function RegisterPage() {
   const [user,setUser]=useState({
    name:"",
    username:"",
    phonenumber:"",
    email:"",
    password:"",
   })
    function handleForm(e){
      
        setUser({
            ...user,
            [e.target.name]:e.target.value,
        })
    }
    function formSubmit(e){
     e.preventDefault();
     console.log(user);
     sendFormData();
    }
    async function sendFormData(){
        const res=await fetch("/register",{
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify(user),
        })
        setUser({
          name:"",
          username:"",
          email:"",
          password:"",
          phonenumber:""
        })
    }
  return (
    <div className='register'>
      <form action=""
      onSubmit={formSubmit}
      >
        <div className='input-control'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={user.name} 
            onChange={(e)=>handleForm(e)}
             />
        </div>
        <div className='input-control'>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={user.username} 
            onChange={(e)=>handleForm(e)}
             />
        </div>
        <div className='input-control'>
            <label htmlFor="phonenumber">Phone Number</label>
            <input type="text" id="phonenumber" name="phonenumber" value={user.phonenumber}
            onChange={(e)=>handleForm(e)}
             />
        </div>
        <div className='input-control'>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email"
            value={user.email} 
            onChange={(e)=>handleForm(e)}
             />
        </div>
        <div className='input-control'>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" value={user.password}
            onChange={(e)=>handleForm(e)}
             />
        </div>
        <div className='input-control'>
            <button style={{maxWidth:"95%"}}
            >Register</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
