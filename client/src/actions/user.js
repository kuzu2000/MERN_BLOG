import { UPDATE_USER, DELETE_USER } from '../constants/actionTypes';
import * as api from './../api/index';

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, formData);
        dispatch({type: UPDATE_USER, payload: data})
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({type: DELETE_USER, payload: id})
    } catch (err) {
        console.log(err.message)
    }
}