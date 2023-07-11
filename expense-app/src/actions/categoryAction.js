import axios from "../config/axios"
import Swal from "sweetalert2"
export const GET_CATEGORY='GET_CATEGORY'
export const CREATE_CATEGORY='CREATE_CATEGORY'
export const DESTROY_CATEGORY='DESTROY_CATEGORY'
export const GET_ONE_CATEGORY='GET_ONE_CATEGORY'


export const getCategory=(data)=>{
    return{
        type:GET_CATEGORY,
        payload:data
    }
}

export const asyncGetCategory=()=>{
    return(dispatch)=>{
        axios.get('/api/categories',{headers:{'authorization':localStorage.getItem('token')}})
            .then((response)=>{
                const result=response.data
                dispatch(getCategory(result))
            })
            .catch((err)=>{
                Swal.fire(err.message)
            })
    }
}

export const getOneCategory=(data)=>{
    return{
        type:GET_ONE_CATEGORY,
        payload:data
    }
}

export const asyncGetOneCategory=(id)=>{
    return(dispatch)=>{
        axios.get(`/api/categories/${id}`,{headers:{'authorization':localStorage.getItem('token')}})
            .then((response)=>{
                const result=response.data
                dispatch(getOneCategory(result))
            })
            .catch((err)=>{
                Swal.fire(err.message)
            })
    }
}

export const createCategory=(data)=>{
    return{
        type:CREATE_CATEGORY,
        payload:data
    }
}

export const asyncCreateCategory=(body)=>{
    return (dispatch)=>{
        axios.post('/api/categories',body,{headers:{'authorization':localStorage.getItem('token')}})
            .then((response)=>{
                const result=response.data 
                dispatch(createCategory(result))  
            })
            .catch((err)=>{
                Swal.fire(err.message)
            })
    }
}

    

export const destroyCategory=(data)=>{
    return{
        type:DESTROY_CATEGORY,
        payload:data
    }
}


export const asyncDestroyCategory=(id)=>{
    return(dispatch)=>{
        axios.delete(`/api/categories/${id}`,{headers:{'authorization':localStorage.getItem('token')}})
            .then((response)=>{
                const result=response.data
                dispatch(destroyCategory(result))  
            })
            .catch((err)=>{
                Swal.fire(err.message)
            })
    }
}