import React from 'react'
import {Router,browserHistory} from 'react-router'

const redirectToLogin=(nextState, replace)=>{
	if(!sessionStorage.LoginId){
		replace('/login')
	}
}
const redirectToDashboard=(nextState, replace)=>{
	if(sessionStorage.LoginId){
		replace('/')
	}
}
const rootRoute = {
	component: require('../components/Admin'),
	childRoutes:[
		{ path: '/logout',
	      getComponent: (nextState, cb) => {
	        require.ensure([], (require) => {
	          cb(null, require('../containers/Logout'))
	        })
	      }
	    },
	    { onEnter: redirectToDashboard,
	      childRoutes: [
	        { path: '/login',
	          getComponent: (nextState, cb) => {
	            require.ensure([], (require) => {
	              cb(null, require('../containers/Login'))
	            })
	          }
	        }
	      ]
	    },
	    { onEnter: redirectToLogin,
	      path: '/',
	      getComponent: (nextState, cb) => {
	        return require.ensure([], (require) => {
              cb(null, require('../containers/Dashboard'))
            })
	      },
	      childRoutes: [
	      	{ path: '/monitor',
	      	  getComponent:(nextState, cb)=>{
	      	  	require.ensure([], (require)=>{
	      	  		cb(null, require('../containers/Monitor'))
	      	  	})
	      	  },
	      	  childRoutes:[
	      	  	{ path: '/monitor/fault', 
	      	  	  getComponent:(nextState, cb)=>{
		      	  	require.ensure([], (require)=>{
		      	  		cb(null, require('../containers/Monitor/Fault'))
		      	  	})
		      	  },
		      	  childRoutes:[
		      	  	{ path:"/monitor/fault/havesent",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/HaveSent'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/received",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/Received'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/arrive",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/Arrive'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/complete",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/Complete'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/file",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/File'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/longrange",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/Longrange'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/fault/Fallback",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Fault/Fallback'))
			      	  	})
			      	  }
		      	  	},
		      	  ]
	      	  	},

	      	  	{ path:'/monitor/sendorder',
	      	  	  getComponent:(nextState, cb)=>{
		      	  	require.ensure([], (require)=>{
		      	  		cb(null, require('../containers/Monitor/SendOrder'))
		      	  	})
		      	  },
		      	  childRoutes:[
		      	  	{ path:"/monitor/sendorder/havesent",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/SendOrder/HaveSent'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/sendorder/notsend",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/SendOrder/Notsend'))
			      	  	})
			      	  }
		      	  	},
		      	  ]
	      	  	},

	      	  	{ path: '/monitor/personal',
	      	  	  getComponent:(nextState, cb)=>{
		      	  	require.ensure([], (require)=>{
		      	  		cb(null, require('../containers/Monitor/Personal'))
		      	  	})
		      	  },
		      	  childRoutes:[
		      	  	{ path:"/monitor/personal/havesent",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Personal/HaveSent'))
			      	  	})
			      	  }
		      	  	},
		      	  	{ path:"/monitor/personal/agency",
		      	  	  getComponent:(nextState, cb)=>{
			      	  	require.ensure([], (require)=>{
			      	  		cb(null, require('../containers/Monitor/Personal/Agency'))
			      	  	})
			      	  }
		      	  	},
		      	  ]
	      	    },

	      	    { path:'/monitor/tracking',
	      	      getComponent:(nextState, cb)=>{
	      	      	require.ensure([],(require)=>{
	      	      		cb(null,require('../containers/Monitor/Tracking'))
	      	      	})
	      	      }

	      	    }


	      	  ]
	        },
	      ]
	    }
	]
}

const routes=(
  <Router 
    history={browserHistory}
    routes={rootRoute}
  />
)

export default routes