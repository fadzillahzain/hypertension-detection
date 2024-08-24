import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../axios";

const Logout = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [islogin, setislogin] = useState(
    JSON.parse(localStorage.getItem("islogin")) || null
  );
  const navigate = useNavigate()
  localStorage.setItem("user", null);
  localStorage.setItem("islogin", false);
  
  
  useEffect(async ()=>{
    if(!islogin)
      window.location.href = "/";
      // navigate('/login')
    await makeRequest.delete('/logout', {headers:{Authorization:`Bearer ${currentUser.token}`}})
    setislogin(false)
    setCurrentUser(null)
    // navigate("/login");
    window.location.href = "/";
  })
  return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/login">Kembali ke login</Link>
            </div>
        </article>
  )
}

export default Logout;