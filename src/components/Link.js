import { NavLink } from 'react-router-dom'
import React, { component } from 'react'

const Link = ({ children, to, ...other }) => {

  

  if (to.substr(0,4)==='https') {
    return (
      <a href={to} {...other}>
        {children}
      </a>
      
    )
  } else {
    return (
      
      <NavLink activeStyle={{color: "blue"}} to={`/${to}`} {...other} >
        {children}
      </NavLink>
      
    )
  }
}

export default Link;