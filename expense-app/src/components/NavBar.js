import { Link, Route, withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { asyncGetLog } from '../actions/userAction'
import Swal from 'sweetalert2'
import Home from './Home'
import Register from './Register'
import LogIn from './LogIn'
import ExpenseDashboard from './ExpenseDashboard'
import Settings from "./Settings"
import ChartsDisplay from './ChartsDisplay'
import DeleteAccount from './DeleteAccount'

const NavBar = (props) => {
   const dispatch=useDispatch()
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   
  useEffect(()=>{
   if(localStorage.getItem('token'))
   dispatch(asyncGetLog())
  },[dispatch])

   const user=useSelector((state)=>{
      return state.user.userDetails
   })

   useEffect(() => {

      if (user[0]?.hasOwnProperty('username')){
         setIsLoggedIn(true)}
   }, [user])

   return (<div>
      {
        (!(isLoggedIn)) ? <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor:"DodgerBlue"  }}>
                  <h1 className="navbar-brand" ><span style={{ backgroundColor: "Orange" }}>EXPENSE APP</span></h1>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                     <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                           <Link className="nav-link" to='/'> Register</Link>
                        </li>
                        <li className="nav-item active">
                           <Link className="nav-link" to='/login'> LogIn </Link>
                        </li>
                     </ul>
                  </div>
            </nav>
         </div> :
            <div className="container-fluid">
               <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "MediumSeaGreen" }}>
                     <h1 className="navbar-brand" ><span style={{ backgroundColor: "Tomato" }}>EXPENSE APP</span></h1>
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                           <li className="nav-item">
                              <Link className="nav-link" to='/home'>Home Page </Link>
                           </li>
                           <li className="nav-item">
                              <Link className="nav-link" to='/account'> Account </Link>
                           </li>
                           <li className="nav-item">
                              <Link className="nav-link" to='/settings'>  Backup </Link>
                           </li>
                           <li className="nav-item">
                              <Link className="nav-link" to='/chart'> Chart </Link>
                           </li>
                           <li className="nav-item">
                              <Link className="nav-link" to='/delete'>Delete Account </Link>
                           </li>
                           <li className="nav-item">
                              <Link  className="nav-link" to='#' onClick={() => {
                                 localStorage.removeItem('token')
                                 Swal.fire('Are you sure !!!')
                                 props.history.push('/login')
                                 setIsLoggedIn(false)
                              }} > LogOut</Link>
                           </li>
                        </ul>
                     </div>
               </nav>
            </div>}

      {!isLoggedIn && <div>
         <Route path='/' render={(props) => {
            return <Register
               {...props}  />
         }} exact={true} />
         <Route path='/login' render={(props) => {
            return <LogIn
               {...props} setIsLoggedIn={setIsLoggedIn} />
         }}  />
             
      </div>
      }

      {(isLoggedIn) && <div>
         <Route path='/home' component={Home} />
         <Route path='/account' render={(props) => {
            return <ExpenseDashboard
               {...props} />
         }} />
         <Route path='/settings' component={Settings} exact={true} />
         <Route path='/chart' component={ChartsDisplay} exact={true} />
         <Route path='/delete' render={(props) => {
            return <DeleteAccount
               {...props} setIsLoggedIn={setIsLoggedIn} />
         }} />
      </div>
      }
   </div>)
}



export default withRouter(NavBar)


