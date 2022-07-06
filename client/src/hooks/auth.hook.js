import { useCallback, useEffect, useState } from "react"


const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback(
      (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        console.log('📢 [auth.hook.js:15]', jwtToken,id);

        localStorage.setItem (storageName, JSON.stringify({userId,token}))
      },
      [],
    )



    const logout = useCallback(
      () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
      },
      [],
    )

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))
    console.log('📢 [auth.hook.js:32]', data);
      if (data && data.token) {
        login(data.token, data.userId)
      }

    }, [login])
    
    console.log('📢 [auth.hook.js:39]', userId);

    return {login ,logout, token, userId}
    
}