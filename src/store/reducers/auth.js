import ActionTypes from "../actions"

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    token: localStorage.getItem("token"),
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_USER:
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("token", action.token);
            return {
                ...state,
                isLoggedIn: true,
                token: action.token
            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("token");
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        default:
            return {...state};
    }
}

export default authReducer;