import * as AuthApi from '../api/AuthRequest';

// export const logIn = (formData) => async (dispatch) => {

//     dispatch({ type: 'AUTH_START' })
//     try {
//         const { data } = await AuthApi.logIn(formData);
//         dispatch({ type: 'AUTH_SUCCESS', data: data })
//     } catch (error) {
//         console.log(error);
//         dispatch({ type: 'AUTH_FAIL' })
//     }
// }



// export const signUp = (formData) => async (dispatch) => {

//     dispatch({ type: 'AUTH_START' })
//     try {
//         const { data } = await AuthApi.signUp(formData);
//         dispatch({ type: 'AUTH_SUCCESS', data: data })
//     } catch (error) {
//         console.log(error);
//         dispatch({ type: 'AUTH_FAIL' })
//     }
// }


export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" })
}

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
    } catch (error) {
        console.error('Login Error:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            stack: error.stack
        });
        dispatch({ type: 'AUTH_FAIL', error: error.response ? error.response.data : 'Unknown Error' });
    }
};

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
    } catch (error) {
        console.error('Sign Up Error:', {
            message: error.message,
            response: error.response ? error.response.data : null,
            stack: error.stack
        });
        dispatch({ type: 'AUTH_FAIL', error: error.response ? error.response.data : 'Unknown Error' });
    }
};
