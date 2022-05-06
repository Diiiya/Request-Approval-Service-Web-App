
import React, { useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllRequests } from "../../Redux/actions";
import { allRequestsSelector, requestResponseSelector } from "../../Redux/selectors";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, orange } from '@mui/material/colors';
import "./ViewRequests.css";

function ViewRequests(props) {
    const { getAllRequestsAction, requests } = props;
    useEffect(() => {
        getAllRequestsAction();
    }, [])

    return (
        <div className='viewRequestBody'>
            <div className="requestsDiv">
                <div className="title">Tasks:</div>
                {requests?.map(request => (
                    <div>
                        <div className="requestText">{request.name}</div>
                        <hr className='lineStyle'/>
                    </div>
                ))}                
            </div>
            <div className="statusDiv">
                <div className="title">Status:</div>
                {requests?.map(request => (
                    <CheckCircleIcon fontSize="large" sx={{ color: request.approved ? green[500] : orange[500], display: "block", width: "100%", marginBottom: "10px" }}/>
                ))}                
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllRequestsAction: getAllRequests,
}, dispatch);

const mapStateToProps = (state) => ({
    requests: allRequestsSelector(state) ? allRequestsSelector(state) : [],
    requestResponse: requestResponseSelector(state) ? requestResponseSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(ViewRequests));