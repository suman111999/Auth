import { useState } from "react";
import axios, { AxiosError } from 'axios'
import { useNavigate } from "react-router-dom";

const Form = ({ mode }) => {
    const baseUrl = 'http://localhost:4000/'
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        apiError: ''
    })
    const handleChange = (e) => {
        // const value = e.target.value;
        // if (!value) {
        //     setErrors(prev => ({
        //         ...prev,
        //         [e.target.name]: 'This is re'
        //     }))
        // }
        setUserDetails(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    let url = mode === 'login' ?
        baseUrl + 'login' : baseUrl + 'signup';
    const payload = mode === 'login' ?
        {
            email: userDetails?.email,
            password: userDetails?.password
        }
        : userDetails;
    const callAPI = async () => {
        const res = await axios.post(url, payload)
        console.log('res', res);
        return res;
        // try {
        //     const res = await axios.post(url, payload)
        //     console.log('res', res);
        //     return res;
        // } catch (err) {
        //     console.log('err', err?.response?.data)
        //     return err;
        /*
        axios error handling
        //if server respond
        if (err.response) {
            setErrors(prev => ({
                ...prev,
                apiError: err.response.data.message
            }))
            console.log('eres', err.response.data);
        } else if (err.request) {
            //request is made but no response recieved
            console.log('ereq', err?.request?.response)
        } else {
            console.log('em', err.message)
        }*/
        // }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails)
        try {
            const apiRes = await callAPI()
            console.log('apires', apiRes)
            mode === 'signup' ? navigate('/login') : navigate('/welcome')
        } catch (err) {
            console.log('apierr', err)
            //need to check whether we need this prev
            setErrors(prev => ({
                ...prev,
                apiError: err.response.data.message || err?.request?.response || err?.message
            }))
        }
    }

    return (
        <div style={{ margin: 'auto', marginTop: '5%', maxWidth: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <h1>{mode === 'login' ? 'Login' : 'SignUp'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                {mode === 'signup' ? (
                    <>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text"
                            required
                            onChange={handleChange}
                            value={userDetails?.name}
                        />
                    </>
                ) : null}
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email"
                    onChange={handleChange}
                    value={userDetails?.email}
                    required
                />
                <label htmlFor="password">Password</label>
                <input id="password" name="password"
                    required
                    type="password"
                    onChange={handleChange}
                    value={userDetails?.password}
                />
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: "center"
                }}>
                    <button style={{
                        fontSize: 'large',
                        fontWeight: 'bold',
                        padding: '0.3rem',
                        // width: '50%',
                    }}>{mode === 'login' ? 'Login' : 'SignUp'}</button>
                </div>
                <p style={{ color: 'red', fontStyle: 'italic' }}>{errors?.apiError}</p>
            </form>
        </div>
    )
}

export default Form;