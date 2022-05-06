import React, { useState, useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { getAllUserRequests, updateRequest } from "../../Redux/actions";
import { allUserRequestsSelector, requestResponseSelector } from "../../Redux/selectors";

import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';

import "./UserRequests.css";

function UserRequests(props) {
    const { getAllUserRequestsAction, userRequests, updateRequestAction } = props;
    const [code, setCode] = useState('');

    // const { username } = useParams();
    const loggedInUserId = localStorage.getItem("userId");
    // const loggedInUsername = localStorage.getItem("user");

    useEffect(() => {
        getAllUserRequestsAction(loggedInUserId);
    }, [])

    return (
        <div className='viewRequestBody'>
            <div className="requestsDiv">
                <div className="title">Tasks:</div>
                {userRequests?.map(userRequest => (
                    <div>
                        <div className="requestText">{userRequest.name}</div>
                        <hr className="lineStyle"/>
                    </div>
                ))}
                
            </div>
            <div className='codeDiv'>
                <div className="title">Codes:</div>
                {userRequests?.map((userRequest) => (
                    <TextField 
                            id="outlined-multiline-static"
                            label="Code" 
                            key={userRequest.requestId}
                            required
                            value={code}
                            size="small"
                            sx={{ 
                                input: { color: 'white' },
                                height: "50px" }}  
                            onChange={(e) => setCode(e.target.value)} 
                        />
                ))}
            </div>
            <div className="actionDiv">
                <div className="title">Actions:</div>
                {userRequests?.map(userRequest => (
                    <div className='iconsDiv'>
                        <CheckCircleIcon 
                            fontSize="large"
                            sx={{ color: green[500], display: "block", width: "100%", marginBottom: "16px", cursor: "pointer" }}
                                onClick={() => 
                                    updateRequestAction(userRequest.requestId, userRequest.policyId, loggedInUserId, code, true)}
                            />
                        <CancelIcon 
                            fontSize="large" 
                            sx={{ color: red[500], display: "block", width: "100%", marginBottom: "16px", cursor: "pointer" }}
                            onClick={() => 
                                    updateRequestAction(userRequest.requestId, userRequest.policyId, loggedInUserId, code, false)}
                            />
                    </div>
                ))}
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllUserRequestsAction: getAllUserRequests,
    updateRequestAction: updateRequest,
}, dispatch);

const mapStateToProps = (state) => ({
    userRequests: allUserRequestsSelector(state) ? allUserRequestsSelector(state) : [],
    requestResponse: requestResponseSelector(state) ? requestResponseSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(UserRequests));