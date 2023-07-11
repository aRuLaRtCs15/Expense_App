import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { asyncDestroyExpense,asyncGetExpense,asyncSetEditId } from "../actions/expenseAction"


const ExpenseTable=(props)=>{  

    const dispatch=useDispatch()
    
    const result=useSelector((state)=>{
        return state.expense
    })

    useEffect(()=>{
      dispatch(asyncGetExpense())
    },[dispatch])

  

    const handleDestroyExpense=(id)=>{
       dispatch(asyncDestroyExpense(id))
    }

    const handleEditExpense=(id)=>{
      dispatch(asyncSetEditId(id))
    }


    return(<div>
        <table className="table">
       <thead>
        <tr>
           <th scope='col'> S.No </th>
           <th scope='col'> Title </th>
           <th scope='col'> Amount </th>
           <th scope='col'> Date </th>
           <th scope='col'> Edit </th>
           <th scope='col'> Delete </th>
        </tr>
       </thead>
       <tbody>
        
        {result.data.map((ele,i)=>{
            return (
                <tr key={i}> 
                 <td> {i + 1} </td>
                 <td> {ele.title} </td>
                 <td> {ele.amount} </td>
                 <td> {ele.date} </td>
                 <td> <button className="btn btn-info" onClick={()=>{handleEditExpense(ele._id)}} > Edit </button></td>
                 <td> <button  className='btn btn-danger' onClick={()=>{handleDestroyExpense(ele._id)}} > Delete </button></td>
                 </tr>
            )
        })}
        
       </tbody>
        </table>
    </div>)
}

export default ExpenseTable