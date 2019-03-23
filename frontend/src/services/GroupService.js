import axios from 'axios'
import userService from './UserService'
import recipesService from './RecipeService'
// TODO: UPDATE TO THE ACTUAL PROJ NAME
const GROUP_ROUTE = (process.env.NODE_ENV !== 'development') ? '/group' : 'http://localhost:3005/group'

function query(filterBy) {
    if (filterBy) {

        let filterQuery = '?';
        if (filterBy.hashtags.length >= 1) filterQuery += `hashtags=${filterBy.hashtags}&`
        if (filterBy.cuisineType) filterQuery += `cuisineType=${filterBy.cuisineType}&`
        if (filterBy.eventType) filterQuery += `eventType=${filterBy.eventType}&`
        if (filterBy.guests) filterQuery += `guests=${filterBy.guests}&`
        // if (filterBy.type !== 'All' && filterObj.type) filterQuery += `type=${filterObj.type}&`
        // if (filterBy.inStock !== 'All' && filterObj.inStock) filterQuery += `inStock=${filterObj.inStock}&`
        // filterQuery += `sortBy=${filterObj.sortBy}`
        // console.log(filterQuery);

        return axios.get(`${GROUP_ROUTE}/${filterQuery}`).then(filterdGroups => filterdGroups.data)
        // axios.get(`${GROUP_ROUTE}/${filterQuery}`).then(groups => groups.data)
    }
    else return axios.get(`${GROUP_ROUTE}`).then(groups => groups.data)
}

function add(group) {
    console.log('inside add group with', group)
    return axios.post(`${GROUP_ROUTE}`, group)
        .then(res => {
            return res.data
        })
}

function update(group) {
}

function remove(groupId) {
}

function getById(groupId) {
    return axios.get(`${GROUP_ROUTE}/${groupId}`)
        .then(res => res.data)
        .then(group => {
            console.log('group', group)
            var groupUsers = group.users.map(userId => {
                return userService.getUserById(userId)
            })
            var groupRecipes = group.recipes.map(recipeId => {
                return recipesService.getRecipeById(recipeId)
            })
            var promiseArray = [Promise.all(groupUsers), Promise.all(groupRecipes)]
            return Promise.all(promiseArray)
                .then(array => {
                    group.users = array[0]
                    group.recipes = array[1]
                    return group
                })
        })
}

function askJoinGroup(ids) {
    return axios.put(`${GROUP_ROUTE}/join/${ids.groupId}`, ids).then((res) => res.data)
}
function addUserToGroup(ids) {
    return axios.put(`${GROUP_ROUTE}/accept/${ids.groupId}`, ids).then((res) => res.data)


}
function declineUserRequest(ids) {
    return axios.put(`${GROUP_ROUTE}/decline/${ids.groupId}`, ids).then((res) => res.data)


}

export default {
    query,
    getById,
    add,
    remove,
    update,
    askJoinGroup,
    addUserToGroup,
    declineUserRequest
}