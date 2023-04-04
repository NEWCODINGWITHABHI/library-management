import React from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
function LoginPage({setLoginUser}) {
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
    });
    const navigate=useNavigate();
    function handleForm(e) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    function formSubmit(e) {
      e.preventDefault();
      console.log(user);
      sendFormData();
    }
    async function sendFormData() {

      const {email ,password,username}=user;
      if(!email&&!username){
        alert("Email or Username is Empty")
        return ;
      }
      const res = await fetch(
        "https://librarymanagementbackend-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data=await res.json();
      console.log(data,"KKKKKKKLLLLLLL")
      if(res.status==200){
        navigate("/dashboard");
        alert("hhhhhh")
        alert(data.message);
        setLoginUser(data.user);
      }
    }
    return (
      <div className="register">
        <form action="" onSubmit={formSubmit}>
          <div className="input-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={(e) => handleForm(e)}
            />
          </div>
               <h3 style={{textAlign:"center",margin:"0px",padding:"0px"}}>OR</h3>
          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="input-control">
            <button style={{ maxWidth: "95%" }}
            >Login</button>
          </div>
          <div className="input-control">
            <div styel={{ Width: "100%" }}>
              <button type="button" style={{ width: "150px" }}>
                Forget Password
              </button>
              <button type="button" style={{ minWidth: "150px", marginLeft: "20px" }}>
                Resend Verification
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default LoginPage
