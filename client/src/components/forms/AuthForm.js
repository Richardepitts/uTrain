import React from 'react';
import './AuthForm.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from "@material-ui/core/styles";

const AuthForm = ({
    email = '',
    password = '',
    loading,
    setEmail = (f) => f,
    setPassword,
    handleSubmit,
    showPasswordInput = true,
    hideEmailInput = false
}) => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
    <form className="parent-form" onSubmit={handleSubmit}>
        {!hideEmailInput && (
            <div className="form-group">
                <div className='emailAddressContainer'>
                    <label className='emailAddress' style={{color: 'white'}}>Email Address</label>
                </div>
                <div className={isPhone ? 'emailInputContainerParentPhone' : 'emailInputContainerParent'}>
                <div className={isPhone ? 'emailInputContainerMobile' : 'emailInputContainer'}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="emailInput"
                        placeholder="Enter email"
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
        )}

        {showPasswordInput && (
            <div className="form-group">
                <div className='passwordContainer'>
                    <label className='password' style={{color: 'white'}}>Password</label>
                </div>
                <div className='passwordInputContainerParent'>
                <div className={isPhone ? 'passwordInputContainerMobile' : 'passwordInputContainer'}>
                    <input
                        type="password"
                        className='passwordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
        )}
        <div className='submitBtnContainer'>
            <button className="submitBtn btn-login" disabled={loading}>
                Submit
            </button>
        </div>
    </form>
    )
};

export default AuthForm;
