var language = window.localStorage.getItem('language') ? window.localStorage.getItem('language') : 'zh';
console.log(language);
const state = {
    language: language,
    id: 3
}
const getters = {
    value: (state, getters, rootState) => {
        return state.language;
    },
    id: (state, getters, rootState) => {
        return state.id
    }
}
const actions = {
    acChangeLanguage: ({ commit, state }, data) => {
        commit('changeLanguage', data);
    },
    acChangeSaleId: ({ commit, state }, data) => {
        commit('changeSaleId', data);
    }
}
const mutations = {
    changeLanguage: (state, data) => {
        if (state.language == 'zh') {
            state.language = 'en'
        } else {
            state.language = 'zh'
        }
        window.localStorage.setItem('language', state.language)
        if (typeof data == 'function') {
            data();
        }
    },
    changeSaleId: (state, data) => {
        state.id = data;
    }
}
export default {
    namespaced: true,
    state, getters, actions, mutations
}