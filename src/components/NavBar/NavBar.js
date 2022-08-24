import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <React.Fragment>
   <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
<div class="container">
  <Link to={'/'} ><i className='fa fa-mobile text-warning' />Contact <span className='text-warning'>Manager</span></Link>
</div>


   </nav>



    </React.Fragment>
  )
}

export default NavBar