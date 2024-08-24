import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, AppSidebarMember } from '../components/index'
import { Navigate } from 'react-router-dom';

const DefaultLayout = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );  
  
  const [islogin, setislogin] = useState(
    JSON.parse(localStorage.getItem("islogin")) || false
  ); 
  const layout = () => {
    return (
      <div>
        {currentUser && currentUser.user.role === "2012" ? <AppSidebarMember /> : <AppSidebar />}
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }
  
  return (
    islogin ? layout() :  <Navigate to = "/login"/> 
    
  )
}

export default DefaultLayout
