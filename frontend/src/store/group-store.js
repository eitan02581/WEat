import Vue from 'vue'
import Vuex from 'vuex'

import groupService from '../services/GroupService.js'
import RecipeService from '../services/RecipeService.js';
Vue.use(Vuex)

const groupStore = {
    state: {
        groups: [],
        group: null

    }, getters: {
        groups(state) {
            return state.groups
        },
        group(state) {
            return state.group
        }
    },
    mutations: {
        setGroups(state, { groups }) {
            state.groups = groups
        },
        setGroup(state, { group }) {
            state.group = group
        },
        removeRecipeFromGroup(state, { recipeId }) {
            let recipeIdx = state.group.recipes.findIndex(recipe => recipe._id === recipeId)
            state.group.recipes.splice(recipeIdx, 1)
        }
    },
    actions: {
        getGroups({ commit }) {
            groupService.query().then(groups => commit({ type: 'setGroups', groups }))
        },
        filterGroups({ commit }, { filterBy }) {
            groupService.query(filterBy).then((groups) => commit({ type: 'setGroups', groups }))
        },
        // getGroup({ commit }, { groupId }) {
        //     return groupService.getById(groupId).then((group) => {
        //         commit({ type: 'setGroup', group })
        //     })
        // },    }
        getGroupById({ commit, state }, payload) {
            state.group = null
            setTimeout(() => {
                groupService.getById(payload._id)
                    .then(group => commit({ type: 'setGroup', group }))
            }, 1500)
        },
        removeRecipeFromGroup({ commit }, { recipeId, groupId }) {
            groupService.removeRecipeFromGroup(recipeId, groupId)
                .then(() => commit({ type: 'removeRecipeFromGroup', recipeId }))
        },
        addGroup({ commit, state }, { group }) {
            console.log('user to group is', group.admin)
            return groupService.add(group)
                .then(newGroup => {
                    console.log('newly added group is', newGroup)
                    commit({ type: 'setGroup', newGroup })
                    return newGroup
                })
        }
    }
}

export default groupStore
