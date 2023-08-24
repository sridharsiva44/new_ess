import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { CanActive } from './Redux/Action'
function Protectedpage({ children }) {
    const dispatch = useDispatch()
    const { logoutpayload, ans } = useSelector((state) => state.validate)
    const fetchUserDetails = useSelector((state) => state.data)
    const access_token = localStorage.getItem('AccessToken');
    const refresh_token = localStorage.getItem('RefreshToken');
    useEffect(() => {
        if (access_token === null && refresh_token === null) {
            <Navigate to="/" replace />
        } else if(Object.keys(fetchUserDetails.payload).length === 0) {
            dispatch(CanActive())
        }
    }, [dispatch,access_token, refresh_token,fetchUserDetails.payload])
    
    if ((ans && ans === false) || (logoutpayload === '/Login')) {
        return (<Navigate to="/" replace />)
    }
    else {
        return children;
    }
}
export default Protectedpage