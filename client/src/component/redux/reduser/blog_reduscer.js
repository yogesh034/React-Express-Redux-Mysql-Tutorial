import {ActionTypes} from '../constant/action-type'

const iniatialstate = {
    blogs:[]
}


export const get_post_reducer = (state=iniatialstate,{type,payload})=>{

    switch (type) {
        case ActionTypes.GET_POST:
            return{
                ...state,blogs:payload
            }
            break;

        case ActionTypes.ADD_POST:
            const newArray = [...state.blogs]; //Copying state array
            newArray.splice(2, 0, payload);
            //using splice to insert at an index
                return{
                    ...state,
                    blogs:newArray
                }
                break;
    
        default: return state;
            break;
    }
}
