import { combineReducers } from 'redux'
import { REQUEST_POSTS,RECEIVE_POSTS,CLEAR_POSTS,SELECT_TYPE,CHANGE_SPINNING,CHANGE_REFRESH } from '../actions'
Array.prototype.unique = function(key) {
    var arr = this.reverse();
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] == n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n.reverse();
}

const initialState={
	isFetching: false,
	data:{},
	lists:[],
	options:[],
	list:{}
}

const posts = (state=initialState,action)=>{
	switch(action.type) {
		case REQUEST_POSTS:
			return {
				...state,
				isFetching: true,
			}
		case RECEIVE_POSTS:
			return {
				...state,
				isFetching: false,
				data:action.data,
				lists:[...state.lists,...action.data[action.listsName]].unique("WorkOrderID"),
				options:[...action.data[action.listsName]],
				list:action.data[action.listsName]
			}
		default:
			return state
	}
}
const postsByPostTitle=(state={},action)=>{
	switch(action.type) {
		case REQUEST_POSTS:
		case RECEIVE_POSTS:
			return {
				...state,
				[action.postTitle]:posts(state[action.postTitle],action)
			}
		case CLEAR_POSTS:
			return action.obj
		default:
			return state
	}
}

const selectType=(state={},action)=>{
	switch(action.type) {
		case SELECT_TYPE:
			return {...state,text:action.text,disabledState:action.disabledState}
		default :
			return state
	}
}

const spinning=(state=true,action)=>{
	switch(action.type) {
		case CHANGE_SPINNING:
			return action.state
		default :
			return state
	}
}

const refresh=(state=false,action)=>{
	switch(action.type) {
		case CHANGE_REFRESH:
			return action.state
		default :
			return state
	}
}


const rootReducer=combineReducers({
	postsByPostTitle,
	selectType,
	spinning,
	refresh
})

export default rootReducer
