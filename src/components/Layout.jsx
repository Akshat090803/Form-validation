import { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout(){
     
  const [details,setDetails]=useState({})
  return (
    <>
    <div>
      <Outlet context={{details,setDetails}}/>
    </div>
    </>
  )
}

export default Layout