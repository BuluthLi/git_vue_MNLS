var language = window.localStorage.getItem('language') ? window.localStorage.getItem('language') : 'zh';
console.log(language);
const state = {
    language: language
}
const getters = {
    value: (state, getters, rootState) => {
        return state.language;
    }
}
const actions = {
    acChangeLanguage: ({ commit, state }, data) => {
        commit('changeLanguage', data);
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
    }
}
export default {
    namespaced: true,
    state, getters, actions, mutations
}