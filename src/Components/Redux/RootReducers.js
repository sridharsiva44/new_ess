import {combineReducers} from 'redux'
import userReducer from './Reducers';
import validateReducer from './Validatereducer'

const rootReducer=combineReducers(
    {
        data:userReducer,
        validate:validateReducer
    }
)

export default rootReducer;