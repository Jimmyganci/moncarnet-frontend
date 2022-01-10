
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Logout = ({history, isLogged }) =>  {
  console.log("Particular is loged out")
  const handleClick = () => (e: React.FormEvent) => {
    history.push('/')
    isLogged(false)
    e.preventDefault();
}

return  (

  <nav>


<button className= "logoutParticularButton" onClick= {handleClick}>Log out</button>



  
 
  



  </nav>
)

}
