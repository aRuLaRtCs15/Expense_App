import { useDispatch } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { asyncCreateExpense } from '../actions/expenseAction'
import Swal from 'sweetalert2'

const AddExpense = (props) => {

    const dispatch = useDispatch()

    const formSubmission = (formData, reset) => {
        if (formData.title === '' || formData.amount === '' || formData.date === '' || formData.categoryId === '') {
            Swal.fire('Enter the details')
        } else {
            dispatch(asyncCreateExpense(formData, reset))
        }
    }


    return (
    <div>
        <h2 style={{color:"orange"}}> Add Expense Form </h2>
        <ExpenseForm formSubmission={formSubmission} />
    </div>
    )
}

export default AddExpense