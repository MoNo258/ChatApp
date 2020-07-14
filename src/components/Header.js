import React from "react";
import {Link} from "react-router-dom";
import {auth} from '../services/firebase'

function Header() {
    return(
        <header>
            <nav className='navbar navbar-expand-sm fixed-top navbar-light'>
                <Link to='/' className='navbar-brand' >ChatApp</Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation' >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse justify-content-end' id='navbarNavAltMarkup'>
                    {auth().currentUser
                    ?
                    <div className='navbar-nav'>
                        <Link to='/chat' className='nav-item nav-link mr-3' >Profile</Link>
                        <button className='btn btn-primary mr-3' onClick={()=> auth().signOut() } >Logout</button>
                    </div>
                    :
                    <div className='navbar-nav'>
                        <Link to='/login' className='nav-item nav-link mr-3'>Login</Link>
                        <Link to='/signup' className='nav-item nav-link mr-3'>Sign Up</Link>
                    </div>}
                </div>
            </nav>
        </header>
    )
}

export default Header;