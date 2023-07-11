import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetCategory, asyncDestroyCategory } from "../actions/categoryAction"
import { asyncGetSoftExpense, asyncUndoExpense, asyncDeleteExpense, asyncDeleteManyExpense } from "../actions/expenseAction"
import Swal from "sweetalert2"

const Settings = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCategory())
        dispatch(asyncGetSoftExpense())
    }, [dispatch])

    const result = useSelector((state) => {
        return state
    })

    const handleDestroyCategory = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    dispatch(asyncDestroyCategory(id))
                    dispatch(asyncGetSoftExpense())
            }
        })
    }


const handleRestoreExpense = (id) => {
    dispatch(asyncUndoExpense(id))
}

const handleDeleteExpense = (id) => {
    dispatch(asyncDeleteExpense(id))
}

const handleDeleteMany = () => {
    dispatch(asyncDeleteManyExpense())
}


return (<div className="container">
    <div className="col-md-4">
        {result.category.data.length > 0 && <div >
            <h2 style={{ color: 'SlateBlue' }}> List Of Categories </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'> S.No </th>
                        <th scope='col'> Title </th>
                        <th scope='col'> Remove </th>
                    </tr>
                </thead>
                <tbody>
                    {result.category.data.map((ele, i) => {
                        return (<tr key={i}>
                            <td> {i + 1} </td>
                            <td> {ele.title} </td>
                            <td><button className="btn btn-warning" onClick={() => { handleDestroyCategory(ele._id) }}> Delete </button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
        }
    </div>
    <div >
        {result.expense.data.length > 0 &&
            <div >
                <h2 style={{ color: 'Brown' }}> List Of Soft Deleted Expense - <button className="btn btn-danger" onClick={handleDeleteMany}> Delete All </button> </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope='col'> S.No </th>
                            <th scope='col'> Title </th>
                            <th scope='col'> Amount </th>
                            <th scope='col'> Date </th>
                            <th scope='col'> Undo </th>
                            <th scope='col'> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.expense.data.map((ele, i) => {
                            return (<tr key={i}>
                                <td> {i + 1} </td>
                                <td> {ele.title} </td>
                                <td> {ele.amount} </td>
                                <td> {ele.date} </td>
                                <td><button className="btn btn-info" onClick={() => { handleRestoreExpense(ele._id) }}>  Restore </button></td>
                                <td><button className="btn btn-success" onClick={() => { handleDeleteExpense(ele._id) }}>  Delete </button></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        }
    </div>
</div>)
}

export default Settings