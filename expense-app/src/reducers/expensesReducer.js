import { CREATE_EXPENSE,GET_EXPENSE,DESTROY_EXPENSE,EDIT_EXPENSE,GET_SOFT_EXPENSE,UNDO_EXPENSE,DELETE_EXPENSE,DELETE_MANY_EXPENSE,SET_ID} from "../actions/expenseAction"

const expenseInitialState={
    data:[],
    editId:''
}

const expensesReducer=(state=expenseInitialState,action)=>{
    switch(action.type){
        case GET_EXPENSE:{
            return {...state,data:action.payload}
        }
        case GET_SOFT_EXPENSE:{
            return {...state,data:action.payload}
        }
        case SET_ID:{
            return {...state,editId:action.payload}
        }
        case CREATE_EXPENSE:{
            return {...state,data:[...state.data,action.payload]}
        }
        case EDIT_EXPENSE:{
            return  {...state,data:state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {ele,...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case DESTROY_EXPENSE:{
            return  {...state, data:state.data.filter(ele=> ele._id !== action.payload._id)}
        }
        case UNDO_EXPENSE :{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)
            }
        }
        case DELETE_EXPENSE:{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)
        }}
        case DELETE_MANY_EXPENSE :{
            return  {...state,data:[]}
        }
        default:{
            return {...state}
        }
    }
}

export default expensesReducer