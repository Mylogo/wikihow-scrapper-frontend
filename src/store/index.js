import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'
import { createScrap, createText } from "../utilities/scrap";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    axios,
    baseUri: 'http://localhost:6543/',
    allenUri: 'http://localhost:6543/allen',
    allenHowUri: 'http://localhost:6543/allen_how',
    scraps: [],
  },
  mutations: {
    'scrap/add': (state, scrap) => state.scraps.unshift(scrap),
    'scrap/remove/id': (state, id) => state.scraps = state.scraps.filter(scrap => scrap.id !== id),
    'scrap/set': (state, { scrap, update }) => Object.assign(scrap, update),
  },
  actions: {
    'scrap/do/add': ({ commit, getters }) => commit('scrap/add', createEmptyScrap({ getters })),
    'text/do/add': ({ commit, getters }) => commit('scrap/add', createEmptyText({ getters })),
  },
  modules: {

  },
  getters: {
    'scrap/get/id': state => id => state.scraps.find(scrap => scrap.id === id),
  },
})

function newScrapId({ getters }) {
  let i = 0
  while (getters['scrap/get/id'](i)) i++
  return i
}

function createEmptyScrap({ getters }) {
  return createScrap(newScrapId({ getters }))
}

function createEmptyText({ getters }) {
  return createText(newScrapId({ getters }))
}
