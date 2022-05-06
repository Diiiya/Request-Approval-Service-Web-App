import React, { useState, useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    useNavigate 
  } from "react-router-dom";
import { getAllUsers, createPolicy, resetTypeValue } from "../../Redux/actions";
import { allUserSelector, requestResponseSelector } from "../../Redux/selectors";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import './CreatePolicy.css';

function getStyles(name, shareholder, theme) {
    return {
      fontWeight:
      shareholder.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
};

function CreatePolicy(props) {
    const navigate = useNavigate();
    const { getAllUsersAction, users, createPolicyAction, requestResponse, resetTypeValueAction } = props;
    const theme = useTheme();
    const [policyName, setPolicyName] = useState('');
    const [threshold, setThreshold] = useState(0);
    const [shareholders, setShareholders] = useState([]);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {        
        getAllUsersAction();         
    }, [getAllUsersAction]);

    useEffect(() => {
        if (requestResponse === true) {
          navigate("/create-request");
          resetTypeValueAction();
        } else if (requestResponse === false) {
        }
    }, [requestResponse]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        createPolicyAction(policyName, threshold, shareholders);
        setIsHidden(false);
    }; 

  
    return (
      <div className='createPolicyBody'>
        <div className='createPolicyTitle'>CREATE POLICY FOR REQUEST APPROVAL</div>
        <form onSubmit={handleSubmit}>
            <div className='createPolicyFields'>
                <TextField 
                    id="standard-basic"
                    label="Name" 
                    value={policyName}
                    variant="standard"    
                    sx={{ 
                        input: { color: 'white' },
                        width: '250px' }} 
                    onChange={(e) => setPolicyName(e.target.value)}
                />
                <TextField 
                    id="standard-basic"
                    label="Threshold" 
                    variant="standard"
                    value={threshold}
                    sx={{ 
                        input: { color: 'white' },
                        width: '250px' }}  
                    onChange={(e) => setThreshold(e.target.value)}
                />
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={shareholders}
                    sx={{width: "300px", marginTop: "10px", marginBottom:"10px"}}
                    onChange={(e) => setShareholders(e.target.value)}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )}
                    >
                    {users?.map((name) =>  (
                        <MenuItem
                        key={name.userId}
                        value={name.userId}
                        style={getStyles(name.username, shareholders, theme)}
                        >
                        {name.username}
                        </MenuItem>
                    ))}
                </Select>
                <Button 
                    sx={{
                        background: 'rgb(0, 58, 117)'
                    }}
                    variant="contained"
                    type="submit" >CREATE POLICY</Button>
                    <Box hidden={isHidden} sx={{ marginLeft: "auto", marginRight: "auto" }}>
                        <CircularProgress />
                    </Box>
            </div>
        </form>
      </div>
    );
}
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllUsersAction: getAllUsers,
    createPolicyAction: createPolicy,
    resetTypeValueAction: resetTypeValue,
}, dispatch);

const mapStateToProps = (state) => ({
    users: allUserSelector(state) ? allUserSelector(state) : [],
    requestResponse: requestResponseSelector(state) ? requestResponseSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(CreatePolicy));