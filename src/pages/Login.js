import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const Login = () => {
    const navigate = useNavigate();
   const [data, setData] = useState({email: "", password: "",});
   const handleOnChange = (e) => {
       e.preventDefault();
       setData({...data, [e.target.name]: e.target.value});
   }
   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4040/login',data)
    .then(function (response) {
        console.log(response);
        if(response.status === 200){
            alert('Login Successfully');
            console.log("response=>", response.data)
            localStorage.setItem("user",JSON.stringify(response.data));
            navigate("/dashboard");

        }else{
            alert('Failed to login Check your Id and Password');
        }
        
      })
    .catch(function (error) {
        console.log(error);
        alert('Failed to login Check your Id and Password');
      });
   }
  return (
    <div className='container mt-3 flex flex-column'>
        <h1>Login Form</h1>
      <Form className="col-sm-12 col-md-8 col-lg-6">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleOnChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={handleOnChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3" onClick={handleSubmit} >
          Login
        </Button>
        <Button variant="success" className="my-3 float-right" onClick={()=> navigate('/register')}>
          Register
        </Button>
      </Form>
    </div>
  )
}
