import * as types from './ActionTypes'

const initialstate = {
    payload: {},
    birthdaypayload: [{}],
    status: '',
    report: false,
    request: false,
    manageEmployee: false,
    selectedOption: null,
    holidaypayload: [{}],
    weeklypayload: {},
}

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.Request:
            return {
                ...state,
                request: action.request,
            }
        case types.Report:
            return {
                ...state,
                report: action.report
            }
        case types.HOLIDAYLIST:
            return {
                ...state,
                holidaypayload: action.holidaypayload,
            }

        case types.ManageEmployee:
            return {
                ...state,
                manageEmployee: action.manageEmployee,
            }
        case types.SelectedOption:
            return {
                ...state,
                selectedOption: action.selectedOption,
            }
        case types.EmpDetails:
            return {
                ...state,
                payload: action.payload,
            }
        case types.BirthdayData:
            return {
                ...state,
                birthdaypayload: action.birthdaypayload,
            }
        case types.WeeklyReport:
            return {
                ...state,
                weeklypayload: action.weeklypayload,
            }

        case types.RESET_INITIAL_STATE:
            return {
                ...initialstate,
            };
        default:
            return state;
    }
}
export default userReducer