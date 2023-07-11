import axios from "../config/axios"
import Swal from "sweetalert2"
export const GET_EXPENSE = 'GET_EXPENSE'
export const GET_SOFT_EXPENSE = 'GET_SOFT_EXPENSE'
export const SET_ID='SET_ID'
export const CREATE_EXPENSE = 'CREATE_EXPENSE'
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
export const DESTROY_EXPENSE = 'DESTROY_EXPENSE'
export const UNDO_EXPENSE = 'UNDO_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const DELETE_MANY_EXPENSE = 'DELETE_MANY_EXPENSE'

// GET ORIGINAL EXPENSES

export const getExpense = (data) => {
  return {
    type: GET_EXPENSE,
    payload: data
  }
}

export const asyncGetExpense = () => {
  return (dispatch) => {
    axios.get('/api/expenses', { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(getExpense(result))
      })
      .catch((err) => {
        Swal.fire(err.message)
      })
  }
}

// GET SOFT EXPENSES

export const getSoftExpense = (data) => {
  return {
    type: GET_SOFT_EXPENSE,
    payload: data
  }
}

export const asyncGetSoftExpense = () => {
  return (dispatch) => {
    axios.get('/api/expenses/soft', { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(getSoftExpense(result))
      })
      .catch((err) => {
        Swal.fire(err.message)
      })
  }
}

// CREATE EXPENSES

export const createExpense = (body) => {
  return {
    type: CREATE_EXPENSE,
    payload: body
  }
}

export const asyncCreateExpense = (body, reset) => {
  return (dispatch) => {
    axios.post(`api/expenses`, body, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        const result = response.data
        dispatch(createExpense(result))
        reset()
      })
      .catch((err) => {
        Swal.fire(err.message)
      })
  }
}



//EDIT EXPENSES

export const editExpense = (body) => {
  return {
    type: EDIT_EXPENSE,
    payload:body
  }
}

export const asyncEditExpense = (body, reset,id) => {
  return (dispatch) => {
    axios.put(`api/expenses/${id}`,body,{headers:{'authorization': localStorage.getItem('token')}})
      .then((response) => {
        const result = response.data
        dispatch(editExpense(result))
        reset()
      })
      .catch((err) => {
        Swal.fire(err.message)
      })
  }
}

//GET ONE EXPENSE - ASYNC/AWAIT

export const setEditId=(data)=>{
  return{
    type:SET_ID,
    payload:data
  }
}

export const asyncSetEditId=(id)=>{
  return(dispatch)=>{
    ( async()=>{ 
    try{
     const expense=await axios.get(`/api/expenses/${id}`,{headers: { 'authorization': localStorage.getItem('token') } })
     dispatch(setEditId(expense.data._id))
    }catch(e){
      Swal.fire(e.message)
    }
    })()
   
  }
}

// SOFT DELETE EXPENSES

export const destroyExpense=(data)=>{
  return {
    type:DESTROY_EXPENSE,
    payload:data
  }
}


export const asyncDestroyExpense=(id)=>{
  return(dispatch)=>{
      axios.delete(`/api/expenses/softdelete/${id}`,{headers:{'authorization':localStorage.getItem('token')}})
          .then((response)=>{
              const result=response.data
              dispatch(destroyExpense(result))  
          })
          .catch((err)=>{
              Swal.fire(err.message)
          })
  }
}


// UNDO EXPENSES

export const undoExpense=(data)=>{
  return {
    type:UNDO_EXPENSE,
    payload:data
  }
}


export const asyncUndoExpense=(id)=>{
  return(dispatch)=>{
      axios.put(`/api/expenses/undo/${id}`,{},{headers:{'authorization':localStorage.getItem('token')}})
          .then((response)=>{
              const result=response.data
              dispatch(undoExpense(result))  
          })
          .catch((err)=>{
              Swal.fire(err.message)
          })
  }
}

// COMPLETELY DELETE EXPENSES

export const deleteExpense=(data)=>{
  return {
    type:DELETE_EXPENSE,
    payload:data
  }
}


export const asyncDeleteExpense=(id)=>{
  return(dispatch)=>{
      axios.delete(`/api/expenses/${id}`,{headers:{'authorization':localStorage.getItem('token')}})
          .then((response)=>{
              const result=response.data
              dispatch(deleteExpense(result))  
          })
          .catch((err)=>{
              Swal.fire(err.message)
          })
  }
}

// DELETE MANY EXPENSES

export const deleteManyExpense=(data)=>{
  return {
    type:DELETE_MANY_EXPENSE,
    payload:data
  }
}


export const asyncDeleteManyExpense=()=>{
  return(dispatch)=>{
      axios.delete(`/api/expenses`,{headers:{'authorization':localStorage.getItem('token')}})
          .then((response)=>{
              const result=response.data
              if(result){
                dispatch(deleteManyExpense([]))
              }  
          })
          .catch((err)=>{
              Swal.fire(err.message)
          })
  }
}

