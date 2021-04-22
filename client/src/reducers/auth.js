import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT } from '../actions/types'
import { getCookie, setCookie, eraseCookie } from '../utils/cookies'

const initialState = {
    jwt: getCookie('jwt') || null,
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function authentication(state = initialState, action) {
    const { type, payload } = action
    
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            setCookie('jwt', payload.jwt, 3600000)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            eraseCookie('jwt')
            return {
                ...state,
                jwt: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}