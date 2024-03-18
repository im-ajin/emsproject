import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  console.log(error);

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        console.log('hi');
        setError(data.message)
      }
      if(res.ok){
        setError(null)
        localStorage.setItem('userData', JSON.stringify({"username":"ajin"}));
        navigate('/dashboard')
      }

    }catch(error){
      console.log(error); 
      setError(error.message)
    }
}

  return (
    <div className="border">
      <h1>EMS</h1>
      <div className="bg-yellow-300">
        <h3>Login Page</h3>
      </div>
      <div className="flex justify-center items-center min-h-[80vh]">
        
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <p className="text-red-500">{error && error}</p>
          <div className="flex gap-4">
            <label htmlFor="username">User Name</label>
            <input onChange={(e) => setFormData({...formData, username : e.target.value})} type="text" id="username" name="username" className="border border-gray-500" required/>
          </div>
          <div className="flex gap-7">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setFormData({...formData, password : e.target.value})} type="password" id="password" name="password" className="border border-gray-500" required/>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="border border-gray-800 py-1 px-4 rounded-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
