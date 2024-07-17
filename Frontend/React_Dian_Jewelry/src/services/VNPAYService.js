import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

function VNPAYService() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const postOrderId = async (orderId) => {
            try {
                const response = await axios.post(`${API_URL}/purchaseorders/confirm-vnpay-payment?orderId=${orderId}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        };

        const params = queryString.parse(location.search);
        if (params.vnp_ResponseCode === '00') {
            const orderId = localStorage.getItem('orderId'); 
            if (orderId) {
                postOrderId(orderId).then(() => {
                    navigate('/invoice', { state: params });
                }).catch(() => {
                    navigate('/transaction-fail');
                });
            } else {
                navigate('/transaction-fail');
            }
        } else {
            navigate('/transaction-fail');
        }
    }, [location.search, navigate]);

    return null;
}

export default VNPAYService;
