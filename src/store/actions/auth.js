import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fetchRecipes } from './recipes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        // url for check signup
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC9Y7nUYTw5OGYGbPL5eE1PagvqHPsBB0E';

        // url for check login
        if (isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC9Y7nUYTw5OGYGbPL5eE1PagvqHPsBB0E';
        }

        try {
            const result = await axios.post(url, authData);
            const expirationDate = new Date(new Date().getTime() + result.data.expiresIn * 1000); 
            localStorage.setItem('token', result.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', result.data.localId);
            dispatch(authSuccess(result.data.idToken, result.data.localId));
            dispatch(fetchRecipes(result.data.idToken, result.data.localId));
            dispatch(checkAuthTimeout(result.data.expiresIn));
        } catch (error) {
            dispatch(authFail(error.response.data.error));
        }
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));

                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));

            } else {
                dispatch(logout());
            }
        }
    }
}