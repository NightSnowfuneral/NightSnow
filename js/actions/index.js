import Ajax from '../components/Ajax'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_TYPE = 'SELECT_TYPE'
export const GET_WORKORDERID = 'GET_WORKORDERID'
export const CHANGE_SPINNING = 'CHANGE_SPINNING'
export const CHANGE_REFRESH = 'CHANGE_REFRESH'
export const CLEAR_POSTS = 'CLEAR_POSTS'

export const clearPosts=(obj) => ({
  type:CLEAR_POSTS,
  obj
})

export const requestPosts = (postTitle,listsName) => ({
  type: REQUEST_POSTS,
  postTitle
})

export const receivePosts = (postTitle,listsName,json) => ({
  type: RECEIVE_POSTS,
  postTitle,
  listsName,
  data: json,
})

export const fetchPosts = (postTitle,listsName,options) => dispatch => {
  dispatch(requestPosts(postTitle))
  const ajax=new Ajax(options)
  return ajax.get()
  		    .then((json)=>dispatch(receivePosts(postTitle,listsName,json)))
}

const shouldFetchPosts = (state, postTitle,isAlways) => {
  const posts = state.postsByPostTitle[postTitle]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return isAlways?true:false
}


export const fetchPostsIfNeeded = (postTitle,listsName,options,isAlways) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), postTitle,isAlways)) {
    return dispatch(fetchPosts(postTitle,listsName,options))
  }
}

export const selectType=(text,disabledState)=>({
  type:SELECT_TYPE,
  text,
  disabledState
})

export const changeSpinning=(state)=>({
  type:CHANGE_SPINNING,
  state
})

export const changeRefresh=(state)=>({
  type:CHANGE_REFRESH,
  state
})
