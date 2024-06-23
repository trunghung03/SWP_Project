import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function VNPAYService() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = queryString.parse(location.search);
        if (params.vnp_ResponseCode === '00') {
            navigate('/invoice', { state: params });
        } else {
            navigate('/transaction-fail');
        }
    }, [location.search, navigate]);

    return null; 
}

export default VNPAYService;
