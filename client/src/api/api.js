import axios from "axios";
import {mapDispatchToPropsFactory} from "react-redux/es/connect/mapDispatchToProps";

// const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

const instance = axios.create({
    //withCredentials: true,
    headers: {
        'Content-Type':'application/json'
    },
    //baseURL: "https://social-network.samuraijs.com/api/1.0/",
});


export const loginAPI = {
    login(email, password) {
        return instance.post(`/api/auth/login`, { email, password}).then((response) => {
            return response.data;
        });
    },
    logout() {
        return instance.delete('/api/auth/login').then((response)=>{
            return response.data;
        });
    }
}







// export const authAPI = {
//     getAuth() {
//         return axios.post(`/api/auth/login`, {}).then((response) => {
//             return response.data;
//         });
//     },
// }


// export const usersAPI = {
//     getUsers(currentPage, pageSize) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`, {}).then((response) => {
//             return response.data;
//         });
//     },
//     deleteFollow(userId) {
//         return instance.delete(`follow/${userId}`, {}).then((response) => {
//             return response.data;
//         });
//     },
//     postFollow(userId) {
//         return instance.post(`follow/${userId}`, {}).then((response) => {
//             return response.data;
//         });
//     },
// };

















// export const profileAPI = {
//     getProfile(userId) {
//         return instance.get(`profile/${userId}`, {}).then((response) => {
//             return response.data;
//         });
//     },
//     getStatus(userId) {
//         return instance.get(`profile/status/${userId}`, {}).then((response) => {
//             return response.data;
//         });
//     },
//     updateStatus(status) {
//         return instance.put(`profile/status/`, { status: status }).then((response) => {
//             return response.data;
//         });
//     },
//     savePhoto(file) {
//         let formData = new FormData();
//         formData.append("image", file) // "image" - берется из документации к бэкэнду
//         return instance.put(`profile/photo`,  formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
//             return response.data;
//         });
//     },
// }





