import axios from "axios";
import {body} from "express-validator";




// const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type':'application/json'
    },
    //baseURL: "https://social-network.samuraijs.com/api/1.0/",
});


export const loginAPI = {
    register(email, password) {
        return instance.post('/api/auth/register', {email, password}).then((response) => {
            return response.data
        })
    },
    login(email, password) {
        return instance.post(`/api/auth/login`, { email, password}).then((response) => {
            return response.data;
        });
    }
}

export const profileAPI = {
    changeLogin( userId, userLogin ) {
        return instance.post(`/api/profile/login`, { userId, userLogin }).then((response) => {
            return response.data;
        });
    },
}



export const collocutorsAPI = {
    getApiAllCollocuters( payload ) {
        return instance.get(`/api/find/collocuter/?userId=${payload.userId}&page=${payload.pageNumber}&limit=${payload.pageSize}`, {}).then((response) => {
            return response.data;
        });
    },
    getApiCollocuters(collocuter) {
        return instance.get(`/api/find/collocuter/${collocuter}`, {}).then((response) => {
            return response.data;
        });
    },
}


export const friendsAPI = {
    addFriend( payload ) {
        return instance.post(`/api/friend/add`, { payload}).then((response) => {
            return response.data;
        });
    },
    deleteFriend( payload ) {
        return instance.post(`/api/friend/delete`, {payload}).then((response) => {
            return response.data;
        });
    },
    getFriends( payload ) {
        return instance.get( `api/find/friends/?userId=${payload}`, {}).then((response) => {
            return response.data
        })
    }
}

export const messagesAPI = {
    getUsersWhoHaveMassages( payload ) {
        return instance.get(`/api/massages/collocuters/?userId=${payload}`, {}).then((response) => {
            return response.data;
        });
    },
    getMassages( payload ) {
        return instance.get(`/api/massages/?userId=${payload}`, {}).then((response) => {
            return response.data;
        });
    },
    addMassage( payload ) {
        return instance.post(`/api/massages/add`, {}).then((response) => {
            return response.data;
        });
    },
    changeMassage( payload ) {
        return instance.post(`/api/massages/${payload}`, {}).then((response) => {
            return response.data;
        });
    },
    deleteMassage( payload ) {
        return instance.post(`/api/massages/delete`, {}).then((response) => {
            return response.data;
        });
    },
}























