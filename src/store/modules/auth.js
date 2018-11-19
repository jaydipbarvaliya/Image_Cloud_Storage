import api  from '../../api/imgur';
import qs from 'qs';
import { router } from '../../main'

const state = {
    token: window.localStorage.getItem('imgur_token')
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token; //here !!state.token give data as boolean 
    }
};


const actions = {

    logout: ({ commit}) => {
        commit('setToken',null);
        window.localStorage.removeItem('imgur_token');
    },



    finalizeLogin :({commit},hash)=>{
        const query=qs.parse(hash.replace('#',''));
        
        commit('setToken',query.access_token);
        window.localStorage.setItem('imgur_token',query.access_token);
        router.push('/');
    },

    

    login : () =>{
        api.login();
    }

};

const mutations = {

    setToken: (state, token) => {
        state.token=token;
    }
};

export default{
    state: state,
    getters:getters,
    actions:actions,
    mutations:mutations
};