import { CREATE_USER,GET_USER,SET_LOG} from "../actions/userAction"

const usersInitialState={
    data:[],
    userDetails:{}
}

const usersReducer=(state=usersInitialState,action)=>{
    switch(action.type){
       case CREATE_USER:{
        return {...state,data:action.payload}
       }
       case GET_USER:{
        return {...state,data:action.payload}
       }
       case SET_LOG:{
        return {...state,userDetails:action.payload}
       }
        default:{
            return {...state}
        }
    }
}

export default usersReducer