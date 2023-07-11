import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetCategory } from '../actions/categoryAction'
import { asyncGetExpense } from '../actions/expenseAction'

const ExpenseForm = (props) => {

    const { formSubmission } = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCategory())
        dispatch(asyncGetExpense())
    }, [dispatch])

    // GET STATE 

    const result = useSelector((state) => {
        return state
    })

    const result1 = result.expense.data.find((ele) => {
        return ele._id === result.expense.editId
    })

    const [title, setTitle] = useState(result1?.title ? result1.title : '')
    const [amount, setAmount] = useState(result1?.amount ? result1.amount : '')
    const [date, setDate] = useState(result1?.date ? result1.date : '')
    const [categoryId, setCategoryId] = useState(result1?.categoryId ? result1.categoryId : '')

    const handleAddExpense = (e) => {
        e.preventDefault()
        const formData = {
            title, amount, date,
            categoryId
        }
        const reset = () => {
            setAmount('')
            setCategoryId('')
            setDate('')
            setTitle('')
        }
        formSubmission(formData, reset, result1?._id)
    }
    return (
        <div className='container-fluid'>
            <div className='col-md-8'>
                <form onSubmit={handleAddExpense}>

                    <label className="form-label"> Title </label>
                    <input type="text"
                        value={title}
                        placeholder="Enter the title"
                        className='form-control'
                        style={{ width: 200 }}
                        onChange={(e) => { setTitle(e.target.value) }} /> <br />

                    <label className="form-label"> Amount </label>
                    <input type="number"
                        value={amount}
                        className='form-control'
                        placeholder="Enter the amount"
                        onChange={(e) => { setAmount(e.target.value) }} /> <br />

                    <label className="form-label"> Date </label>
                    <input type="date"
                        value={date}
                        className='form-control'
                        onChange={(e) => setDate(e.target.value)} /><br />

                    <select  className='form-control' value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }}>
                        <option > select category  </option>
                        {result.category.data.map((ele) => {
                            return <option key={ele._id} value={ele._id}>{ele.title}</option>
                        })}
                    </select><br />

                    <input type="submit"
                        value={result.expense.editId ? "edit" : "Add"}
                        className='btn btn-primary'
                         />
                </form>
            </div>
        </div>)

}

export default ExpenseForm