import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { asyncGetUser,asyncDestroyUser } from '../actions/userAction'
import Swal from 'sweetalert2'


const DeleteAccount=(props)=>{

    const dispatch=useDispatch()

    useEffect(()=>{
   dispatch(asyncGetUser())
    },[dispatch])

    const result1=useSelector((state)=>{
        return state.user.data
    })


    const deleteUser=()=>{
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
              dispatch(asyncDestroyUser(result1[0]._id,props,props.setIsLoggedIn))
            }
          })   
    }



    return(<div>
        <h4 style={{color:'Black'}}> Click below to delete your account...</h4>
        <button className='btn btn-danger' onClick={deleteUser}> Delete Account </button>
    </div>)
}

export default DeleteAccount