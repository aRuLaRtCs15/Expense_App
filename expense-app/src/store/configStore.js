import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/usersReducer'
import categoryReducer from '../reducers/categoryReducer'
import expensesReducer from '../reducers/expensesReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
       user:usersReducer,
       category:categoryReducer,
       expense:expensesReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore