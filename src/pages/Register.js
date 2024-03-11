import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// import navigate from 'react-router-dom'


export const Register = () => {
    const apiURL = "https://web-paint-backend.onrender.com";

    const navigate = useNavigate();

    const [labelRegister, setLabelRegister] = useState("Register");
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    });
    const handleOnChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        setLabelRegister('Processing...');
        e.preventDefault();
        axios.post(`${apiURL}/user`,data)
          .then(function (response) {
            console.log(response);
            alert('Registered Successfully');
            setData({
                name: '',
                email: '',
                address: '',
                password: ''
            });
            navigate('/')
          })
          .catch(function (error) {
            console.log(error);
            alert('Failed to register');
          });
          setLabelRegister('Register');
        // console.log(data);
    }
  return (
    <div>
      <div className="container mt-3 flex flex-column">
        <h1>Register Form</h1>
        <Form className="col-sm-12 col-md-8 col-lg-6">
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={data.name} name="name" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={data.email} name="email" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" value={data.address} name="address" onChange={handleOnChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={data.password} name="password" onChange={handleOnChange} />
          </Form.Group>
         
          <Button variant="primary" type="submit" className="my-3" onClick={handleSubmit}>
            {labelRegister}
          </Button>
          <Button variant="success" className="my-3 float-right" onClick={()=> navigate('/')} >
            {"Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
