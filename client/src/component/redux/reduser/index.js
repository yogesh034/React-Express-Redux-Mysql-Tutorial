import {combineReducers} from 'redux'
import {get_post_reducer} from './blog_reduscer';

const reducer = combineReducers({
    allblogs : get_post_reducer,

})

export default reducer;