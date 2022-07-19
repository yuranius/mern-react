import { useCallback, useEffect, useState } from "react"


const storageName = 'userData'

export const useAuth = () => {


    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userLogin, setuserLogin] = useState(null)


    const login = useCallback(
      (jwtToken, id, userLogin) => {
        console.log('📢 [auth.hook.js:16]', jwtToken, id, userLogin);
        setToken(jwtToken)
        setUserId(id)
        setuserLogin(userLogin)
        localStorage.setItem (storageName, JSON.stringify({ token:jwtToken,  userId:id, userLogin }))
      },
      [],
    )

    const isLogin = useCallback(
      (userLogin) => {
        setuserLogin(userLogin)
        localStorage.setItem (storageName, JSON.stringify({ userLogin }))
      },
      [],
    )
 

    const logout = useCallback(
      () => {
        setToken(null)
        setUserId(null)
        setuserLogin(null)
        localStorage.removeItem(storageName)
      },
      [],
    )

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))
      if (data && data.token) {
        login(data.token, data.userId, data.userLogin)
      }

    }, [login])
    

    return {login ,logout, isLogin, token, userId, userLogin}
    
}