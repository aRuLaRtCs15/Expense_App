import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncLogInUser } from '../actions/userAction'
import Swal from 'sweetalert2'

const LogIn = (props) => {
    const dispatch = useDispatch()
    const { setIsLoggedIn } = props


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = (e) => {
        e.preventDefault()
        const formData = {
            email, password
        }
        const reset=()=>{
            setEmail('')
            setPassword('')
        }
        if (formData.email === '' || formData.password === '') {
            Swal.fire('Enter valid details')
        } else {
            dispatch(asyncLogInUser(formData, props, setIsLoggedIn,reset))
        }

    }

    return (<div className='container-fluid'>
        <div className='col-md-4'></div>
        <center><h2> Log-In Form  </h2></center>
        <form onSubmit={handleLogIn}>

            <label className='form-label'>E-mail</label>
            <input type='text'
                className="form-control"
                placeholder='Enter your email'
                value={email}
                style={{ width: 200 }}
                onChange={(e) => { setEmail(e.target.value) }} /><br />

            <label className='form-label'>Password</label>
            <input type='password'
                className="form-control"
                placeholder='Enter your password'
                value={password}
                style={{ width: 200 }}
                onChange={(e) => { setPassword(e.target.value) }} /><br />

            <input type='submit'
                value='login'
                className='btn btn-primary'
                 />
        </form>
    </div>)
}

export default LogIn