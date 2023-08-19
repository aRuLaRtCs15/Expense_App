import axios from '../config/axios'
import Swal from 'sweetalert2'
export const CREATE_USER = 'CREATE_USER'
export const GET_USER = 'GET_USER'
export const SET_LOG = 'SET_LOG'


export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const asyncCreateUser = (formData, props, reset) => {
    return (dispatch) => {
        axios.post('api/users', formData)
            .then((response) => {
                const result = response.data
                if (!(result.hasOwnProperty('errors'))) {
                    dispatch(createUser(result))
                    props.history.push('./login')
                }
                else {
                    Swal.fire('Enter valid details')
                    props.history.push('./')
                    reset()
                }
            })
            .catch((err) => {
                Swal.fire(err.message)
            })
    }
}

export const getLog = (data) => {
    return {
        type: SET_LOG,
        payload: data
    }
}


export const asyncGetLog = (data) => {

    return (dispatch) => {
        axios.get('/api/users', { headers: { 'authorization': data } })
            .then((response) => {
                const result = response.data
                dispatch(getLog(result))
            })
            .catch((err) => {
                Swal.fire(err.message)
            })
    }
}


export const asyncLogInUser = (formData, props, reset) => {

    return (dispatch) => {
        axios.post('/api/users/login', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('error')) {
                    Swal.fire(result.error)
                    reset()
                }
                else {
                    localStorage.setItem('token', result)
                    props.history.push('./account')
                   dispatch(asyncGetLog(result))
                    Swal.fire('successfully logged in')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}

export const asyncGetUser = () => {
    return (dispatch) => {
        axios.get('/api/users', { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                dispatch(getUser(result))
            })
            .catch((err) => {
                Swal.fire(err.message)
            })
    }
}

export const asyncDestroyUser = (id, props, setIsLoggedIn) => {
    return (dispatch) => {
        axios.delete(`/api/users/delete/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('username')) {
                    props.history.push('./register')
                    setIsLoggedIn(false)
                    localStorage.removeItem('token')
                }
            })
            .catch((err) => {
                Swal.fire(err.message)
            })
    }
}