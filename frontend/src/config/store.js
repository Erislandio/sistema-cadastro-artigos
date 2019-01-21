// ! Area de armazenamento de informações dentro dos componentes

// todo esse arquivo funciona como um redux no react - armazena so estados da aplicação

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
            console.log(`toggleMenu ${state.isMenuVisible}`)
        }
    }
})