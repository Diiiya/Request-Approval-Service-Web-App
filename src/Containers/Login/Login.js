import React, { useState, useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    useNavigate 
  } from "react-router-dom";
import { loginUser, resetTypeValue } from "../../Redux/actions";
import { requestResponseSelector } from "../../Redux/selectors";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Login.css";

function Login(props) {
    const navigate = useNavigate();
    const { loginUserAction, requestResponse, resetTypeValueAction } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMsg, setResponseMsg] = useState(""); 

    useEffect(() => {
        if (requestResponse === true) {
          navigate("/user-requests/" + username);
          resetTypeValueAction();
          setResponseMsg("");
        } else if (requestResponse === false) {
          setResponseMsg("Invalid credentials!");
        }
    }, [requestResponse, username, navigate, resetTypeValueAction]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUserAction(username, password)
    }; 

    return(
        <div className='loginBody'>
            <form onSubmit={handleSubmit}>
                <div className='loginTitle'>LOGIN</div>
                <div className='loginFields'>
                    <TextField 
                        id="standard-required"
                        required
                        label="Username" 
                        value={username}
                        size="small"
                        sx={{ 
                            input: { color: 'white' },
                            width: '250px' }}  
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        id="standard-password-input"
                        type="password"
                        required
                        label="Password" 
                        value={password}
                        size="small"
                        sx={{ 
                            input: { color: 'white' },
                            width: '250px' }}  
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="errorMsg">{responseMsg}</div>       
                    <Button 
                        sx={{
                            background: 'rgb(0, 58, 117)',
                            marginTop: "30px"
                        }}
                        variant="contained"
                        type="submit" >LOGIN</Button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loginUserAction: loginUser,
    resetTypeValueAction: resetTypeValue,
}, dispatch);

const mapStateToProps = (state) => ({
    requestResponse: requestResponseSelector(state) ? requestResponseSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Login));