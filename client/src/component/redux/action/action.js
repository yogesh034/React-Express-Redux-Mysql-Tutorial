import {ActionTypes} from '../constant/action-type'

export const addblogpost = (blogpost)=>{
    return {
        'type':ActionTypes.ADD_POST,
        'payload':blogpost
    }
}

export const getblogs = (posts)=>{
    return {
        'type':ActionTypes.GET_POST,
        'payload':posts
    }
}

export const editblogpost = (blogpost)=>{
    return {
        'type':ActionTypes.EDIT_POST,
        'payload':blogpost
    }
}

export const deleteblogpost = (blogpost)=>{
    return {
        'type':ActionTypes.DELETE_POST,
        'payload':blogpost
    }
}