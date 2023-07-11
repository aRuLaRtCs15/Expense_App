import { useState } from "react"
import { useDispatch } from "react-redux"
import { asyncCreateCategory } from "../actions/categoryAction"
import Swal from "sweetalert2"


const CategoryForm = (props) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')



    const addCategory = (e) => {
        e.preventDefault()
        const formData = {
            title
        }
        if (formData.title === '') {
            Swal.fire('Enter the Details')
        } else if (Object.keys(formData).length === 1) {
            dispatch(asyncCreateCategory(formData))
            setTitle('')

        }
    }



    return (
        <div className="container">
            <div className="col-md-4">
                <h2 style={{ color: "Brown" }}>Category Form</h2>
                <form onSubmit={addCategory}>

                    <label className="form-label"> Title </label>
                    <input type='text'
                        className="form-control"
                        style={{ width: 200 }}
                        placeholder='Enter the title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} /> <br />

                    <input type='submit'
                        value='Add'
                        className="btn  btn-primary"
                        />

                </form>
            </div>
        </div>
    )
}

export default CategoryForm