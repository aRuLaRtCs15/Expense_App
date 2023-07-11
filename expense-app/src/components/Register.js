import { useState } from "react"
import { useDispatch } from 'react-redux'
import { asyncCreateUser } from "../actions/userAction"
import Swal from 'sweetalert2'

const Register = (props) => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [budget, setBudget] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            username: userName, email, password, budget
        }
        if (formData.username === '' || formData.email === '' || formData.password === '' || formData.budget === '') {
            Swal.fire('Enter the details')
        } else {
            const reset=()=>{
                setBudget('')
                setEmail('')
                setPassword()
                setUserName()
            }
            dispatch(asyncCreateUser(formData, props,reset))
        }
    }

    return (<div className="container-fluid">
        <div className="col-md-8">
            <center><h2> Registration Form </h2></center>
            <form onSubmit={handleSubmit}>
                <label className="form-label"> Name </label>
                <input type='text'
                    placeholder='Enter your name'
                    className="form-control"
                    style={{ width: 200 }}
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }} /><br />

                <label className="form-label"> E-mail</label>
                <input type='text'
                    placeholder='Enter your email'
                    className="form-control"
                    value={email}
                    style={{ width: 200 }}
                    onChange={(e) => { setEmail(e.target.value) }} /><br />

                <label className="form-label"> Password </label>
                <input type='password'
                    placeholder='Enter your password'
                    className="form-control"
                    value={password}
                    style={{ width: 200 }}
                    onChange={(e) => { setPassword(e.target.value) }} /> <br />

                <label className="form-label"> Budget </label>
                <input type='number'
                    placeholder='Enter your budget'
                    className="form-control"
                    value={budget}
                    style={{ width: 200 }}
                    onChange={(e) => { setBudget(e.target.value) }} /> <br />

                <input type='submit'
                    value='Register'
                    className="btn btn-primary"
                     />
            </form>
        </div>
    </div>)
}

export default Register