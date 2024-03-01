import axios from "axios"
import { useEffect, useState } from "react"
axios.defaults.withCredentials = true
const Welcome = () => {
    const [userData, setUserData] = useState()
    console.log(userData)
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get('http://localhost:4000/user',
                    {
                        // to send httponly cookie back to server
                        //also in server side in cors have to put 
                        // { credentials: true, origin: 'http://localhost:frontendport'}
                        withCredentials: true
                    }
                )
                console.log(res)
                setUserData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUserDetails()

    }, [])
    return (
        <div>{userData?.user?.name}</div>
    )
}

export default Welcome