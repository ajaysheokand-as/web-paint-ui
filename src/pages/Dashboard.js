import React, { useState, useEffect } from "react";
import { NavbarMain } from "../components/NavbarMain";
import { Tbl } from "../components/Tbl";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';


export default function Dashboard() {
  const [allUsers, setAllUsers] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const decodedToken = jwtDecode(user);


  const reloadUsers = () => {
    setLoadUser(true);
  }
  const getAllUsers = async () => {
    console.log("allUsers=>",allUsers);
    await axios
    .get("http://localhost:4040/user")
    .then(function (response) {
      console.log("allUser response =>",response);
      if (response.status === 200) {
        // console.log("response, all users=>", response.data, allUsers);
        setAllUsers(response.data);

      } else {
        // console.error("response, allUsersgfds=>", response);
        setAllUsers(null);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Failed to login Check your Id and Password");
    });
  }

  useEffect(() => {
    getAllUsers();
  },[loadUser]);
  return (
    <div className="container ">
      <NavbarMain />
      <div className="container text-center h3">
        Hi <span className="h3">{decodedToken.user?.name}</span>
      </div>
      {!allUsers ? <div className="btn btn-danger text-center" onClick={getAllUsers}>Get All User's</div> : <Tbl data={allUsers} reloadUsers={reloadUsers} />}
    </div>
  );
}
