import * as types from './ActionTypes'

const initialstate = {
    logoutpayload: '',
    ans: '',
    canactiveerror: '',
    refreshError:''
}

const validateReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.RefereshTokencallError:
            return {
                ...state,
                refreshError:action.refreshTokenError
            }
        case types.CanactiveError:
            return {
                ...state,
                canactiveerror: action.can_Active_Error
            }
        case types.Logout:
            return {
                ...state,
                logoutpayload: action.payload,
            }
        case types.AuthGuard:
            return {
                ...state,
                ans: action.data,
            }
        case types.RESET_VALIDATION:
            return {
                ...initialstate,
            };
        default:
            return state;
    }
}
export default validateReducer