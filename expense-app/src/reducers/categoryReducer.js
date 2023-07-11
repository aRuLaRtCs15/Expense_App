import { GET_CATEGORY,CREATE_CATEGORY,DESTROY_CATEGORY,GET_ONE_CATEGORY } from "../actions/categoryAction"


const categoryInitialState={
    data:[]
}

const categoryReducer=(state=categoryInitialState,action)=>{
    switch(action.type){
        case GET_CATEGORY:{
            return {...state,data:action.payload}
        }
        case GET_ONE_CATEGORY:{
            return {...state,editId:action.payload}
        }
        case CREATE_CATEGORY:{
            return {...state,data:[...state.data,action.payload]}
        }
        case DESTROY_CATEGORY:{
            return {...state,data:state.data.filter((ele)=>{
                return ele._id !== action.payload._id})}
        }
        default:{
            return {...state}
        }
    }
}

export default categoryReducer