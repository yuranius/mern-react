import { createContext } from "react";

function noop () {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    avatar: null,
    login: noop,
    logout: noop,
    isLogin: noop,
    isAuthenticated: false,
    userLogin: null

})

