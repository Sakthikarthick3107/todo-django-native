export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (username ,  email) => ({
    type : 'SET_USER_DATA',
    payload : {username , email}
});