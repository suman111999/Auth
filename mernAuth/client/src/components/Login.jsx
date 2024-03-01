import Form from "./Form"
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <Form mode='login' ></Form>
            <p style={{ display: "flex", justifyContent: 'center', marginTop: '1%' }}>Do not have an account? <Link style={{ marginLeft: '0.5%' }} to={'/signup'}>Sign up here</Link></p>
        </>
    )
}

export default Login