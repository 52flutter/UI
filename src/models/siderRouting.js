/**
 * Created by yin on 2017/11/3.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
let initialize={
  corps:[],
  oneCorp: {
    sites: [

    ]
  }
};
export default {
  namespace:"corp",
  state:initialize,
  subscriptions:{

  },
  effects: {
    *modifySitesStatus({payload}, {select, call, put}){

    }
  },
  reducers:{
    //getCorpSites:(state, action)=>{
    //  return Object.assign({}, state, {oneCorp:
    //    Object.assign({}, state.sites,
    //      {sites: action.payload})
    //  })
    //},
    getCorpsResult:(state, action)=>{
      return Object.assign({},state,{corps:action.payload});
    },
    clearData:  (state, action) =>{
      return initialize
    }
  }
}
