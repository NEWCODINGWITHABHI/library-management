import React from 'react'
import { useState } from 'react';
function LoginPage() {
    const [user, setUser] = useState({
    
      username: "",
      email: "",
      password: "",
    });
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

          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="input-control">
            <button style={{ maxWidth: "95%" }}>Login</button>
          </div>
          <div className="input-control">
            <div styel={{ Width: "100%" }}>
              <button style={{ width: "150px" }}>
                Forget Password
              </button>
              <button style={{ minWidth: "150px", marginLeft: "20px" }}>
                Resend Verification
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default LoginPage
