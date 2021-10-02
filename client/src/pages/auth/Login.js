import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import AuthForm from '../../components/forms/AuthForm';
import { USER_CREATE } from '../../graphql/mutations';
import './Login.css';

const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('richardepitts@gmail.com');
    const [password, setPassword] = useState('Donkey');
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    const [userCreate] = useMutation(USER_CREATE);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password).then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                console.log(user.email)
                console.log(`idTokenResult:`)
                console.log(idTokenResult)
                console.log(idTokenResult.token)
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                });

                // send user info to our server mongodb to either update/create
                userCreate();
                history.push('/');
            });
        } catch (error) {
            console.log('login error', error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: { email: user.email, token: idTokenResult.token }
            });

            // send user info to our server mongodb to either update/create
            //  btn btn-raised btn-danger  mt-5
            userCreate();
            history.push('/');
        });
    };

    return (
        <div className="ChildContainerRP">
            {loading ? <h4 className="text-danger">Loading...</h4> : 
                <div className='LoginContainer'>
                    <h4 className='Login'>Login</h4>
                </div>
            }
            <div className='googleBtnContainer'>
                <button onClick={googleLogin} className="googleBtn btn-login">
                    Login with Google
                </button>
            </div>
            <div className='authFromParentContainer'>
                <AuthForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    showPasswordInput="true"
                />
            </div>
            <div className='forgotPasswordContainer'>
                <Link className="forgotPassword" to="/password/forgot">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
};

export default Login;
