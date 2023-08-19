import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { asyncGetUser } from "../actions/userAction"
import CategoriesList from "./CategoriesList"


const ExpenseDashboard=(props)=>{
    const dispatch=useDispatch()

    useEffect(()=>{
         dispatch(asyncGetUser())
    },[dispatch])

    const result=useSelector((state)=>{
        return state.user.data
    })

    return(<div className="container">
       <center><h2 > Dashboard Page</h2></center>
        {result.length > 0 &&
        <div>
         <h3 > Welcome - {result[0].username} </h3>
         <h3 > Your Budget - {result[0].budget}</h3>
         <hr className="horizontal"/>  
         <CategoriesList/>
         </div>
        }
    </div>)
}

export default ExpenseDashboard