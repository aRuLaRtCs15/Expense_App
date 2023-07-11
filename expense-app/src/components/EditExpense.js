import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { asyncEditExpense,asyncGetExpense, asyncSetEditId } from '../actions/expenseAction'
import ExpenseForm from './ExpenseForm'
import Swal from 'sweetalert2'

const EditExpense=(props)=>{

    const dispatch = useDispatch()

    useEffect(()=>{
     dispatch(asyncGetExpense())
    },[dispatch])
    

    const formSubmission = (formData,reset,id) => {
        if (formData.title === '' || formData.amount === '' || formData.date === '' || formData.categoryId === '') {
            Swal.fire('Enter the details')
        } else {
            dispatch(asyncEditExpense(formData, reset,id))
            dispatch(asyncSetEditId(''))
        }
    }


    return(<div>
        <h2>Edit Expense Form</h2>
        <ExpenseForm  formSubmission={formSubmission}/>
    </div>)
}

export default EditExpense