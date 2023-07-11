import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetExpense } from "../actions/expenseAction"
import CategoryForm from "./CategoryForm"
import AddExpense from "./AddExpense"
import EditExpense from "./EditExpense"
import ExpenseTable from "./ExpenseTable"


const CategoriesList = (props) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(asyncGetExpense())
    }, [dispatch])

    const result = useSelector((state) => {
        return state.expense
    })


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <CategoryForm />
                    {result.data.length > 0 && <ExpenseTable />}
                </div>
                <div className="col-md-4">
                    {result?.editId ? <EditExpense /> : <AddExpense />}
                </div>
            </div>
        </div>)

}

export default CategoriesList