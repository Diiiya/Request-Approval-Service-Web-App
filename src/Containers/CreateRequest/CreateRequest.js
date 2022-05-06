import React, { useState, useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllPolicies, createRequest } from "../../Redux/actions";
import { allPoliciesSelector, requestResponseSelector } from "../../Redux/selectors";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './CreateRequest.css';

function CreateRequest(props) {
    const { getAllPoliciesAction, policies, createRequestAction, requestResponse } = props;
    const [requestName, setRequestName] = useState('');
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        getAllPoliciesAction();
    }, []);

    useEffect(() => {
        if (requestResponse === true)
        {
            setRequestName('');
            setPolicy('');
        }        
    }, [requestResponse])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (requestName !== "" && policy !== null)
        {
            createRequestAction(requestName, policy)
        }        
    }; 

    return (
        <div className='createRequestBody'>
            <div className='createRequestTitle'>CREATE REQUEST</div>
                <form onSubmit={handleSubmit}>
                    <div className='createRequestFields'>
                        <TextField 
                            id="outlined-multiline-static"
                            label="Request" 
                            multiline
                            maxRows={3}
                            value={requestName}
                            sx={{ 
                                input: { color: 'white' },
                                width: '250px' }}  
                            onChange={(e) => setRequestName(e.target.value)}
                        />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={policy}
                            label="Policy Type"
                            sx={{ 
                                input: { color: 'white' },
                                width: '250px' }}   
                            onChange={(e) => {
                                setPolicy(e.target.value)
                            }}
                        >
                        {policies?.map(policy => (
                            <MenuItem value={policy.policyId}>{policy.name}</MenuItem>
                        ))}                            
                        </Select>

                        <Button 
                            sx={{
                                background: 'rgb(0, 58, 117)'
                            }}
                            variant="contained"
                            type="submit" >SUBMIT REQUEST</Button>
                    </div>
                </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllPoliciesAction: getAllPolicies,
    createRequestAction: createRequest,
}, dispatch);

const mapStateToProps = (state) => ({
    policies: allPoliciesSelector(state) ? allPoliciesSelector(state) : [],
    requestResponse: requestResponseSelector(state) ? requestResponseSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(CreateRequest));