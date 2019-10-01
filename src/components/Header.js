import React from 'react'
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import logo from '../img/sitoo_logo.svg'; 

class Header extends React.Component{
	render(){
		return(
			<Router>
		      <div>
			    <nav>	
			      <div className="grey--background">
			      	<img src={logo}   className="logo" alt="Sitoo-Logo" />
			      </div>
			      <div className="dark-background">
			      	<ul className='list--item list--header' >
			          <li><NavLink activeClassName="current" to="/users">Users</NavLink></li>
			          <li><NavLink activeClassName="current" to="/products">Products</NavLink></li>
			          <li><NavLink activeClassName="current" to="/manufacturers">Manufacturers</NavLink></li>
			      	</ul>
			      </div>
			      
			    </nav>
		 		<hr />   
		      </div>
		    </Router>
			)
	}
		
}
export default Header