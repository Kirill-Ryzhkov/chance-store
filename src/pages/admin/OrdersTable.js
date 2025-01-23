import React, { useEffect, useState, useCallback } from "react";
import { useCookies } from 'react-cookie';
import { OrderTablesWithTabs } from "../../components/admin/OrderTablesWithTabs";
import Button from "../../components/common/Button";

const API_URI = process.env.REACT_APP_API_URL;
const ADMIN_LOGIN = process.env.REACT_APP_ADMIN_USER_LOGIN;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_USER_PASSWORD;
const EVENT_NAME = process.env.REACT_APP_EVENT_NAME;

export const OrdersTable = () => {

    const [auth, setAuth] = useState('');
    const [orders, setOrders] = useState([]);
    const [cookie, setCookie] = useCookies(['authToken']);
    const [isOpenCafe, setIsOpenCafe] = useState();

    const fetchData = useCallback(async (url, method = "GET", token = "", body = null) => {
        try {
            const headers = {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` })
            };
    
            const options = { method, headers };
            if (body) options.body = JSON.stringify(body);
    
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            if (!data) {
                throw new Error("Empty response");
            }
            return data;
        } catch (error) {
            console.error("Error in fetchData:", error);
            return null;
        }
    }, []);

    const orderList = useCallback((token) => {
        fetchData(`${API_URI}/order`, "GET", token)
            .then(data => setOrders(data?.orders ?? []))
            .catch(console.error);
    }, [fetchData]);

    const handleClose = useCallback(() => {
        fetchData(`${API_URI}/event/toggleCafe/${EVENT_NAME}`, "GET", auth)
            .then(() => setIsOpenCafe(!isOpenCafe))
            .catch(console.error);
    }, [auth, isOpenCafe, fetchData]);

    const handleComplete = useCallback((id) => {
        fetchData(`${API_URI}/order/complete`, "POST", auth, { order_id: id })
            .then(data => setOrders(data.orders))
            .catch(console.error);
    }, [auth, fetchData]);

    const authorize = useCallback(() => {
        if (!auth) {
            fetchData(`${API_URI}/user/signin`, "POST", "", {
                email: ADMIN_LOGIN,
                password: ADMIN_PASSWORD
            })
            .then(data => {
                if (data?.token) {
                    setCookie('authToken', data.token, { path: '/', expires: new Date(Date.now() + 3600000) });
                    setAuth(data.token);
                    orderList(data.token);
                } else {
                    console.error("Authorization failed: token not received");
                }
            })
            .catch(console.error);
        }
    }, [auth, fetchData, setCookie, orderList]);

    const handlePrompt = useCallback(() => {
        const password = window.prompt('Please enter the password:', '');
        if (password === null) {
            console.warn("Password prompt cancelled");
            return;
        }
    
        if (password === ADMIN_PASSWORD) {
            authorize();
        } else {
            console.error("Incorrect password");
        }
    }, [authorize]);

    const handleClearHistory = () => {
        fetchData(`${API_URI}/order/clear`, "POST", auth)
            .then(data => setOrders(data.orders))
            .catch(console.error);
    }

    useEffect(() => {
        if (cookie.authToken) {
            setAuth(cookie.authToken);
            orderList(cookie.authToken);
        }
    }, [cookie.authToken, orderList]);

    useEffect(() => {
        if (!auth) return;

        const intervalId = setInterval(() => {
            orderList(auth);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [auth, orderList]);

    useEffect(() => {
        fetchData(`${API_URI}/event/statusCafe/${EVENT_NAME}`)
            .then(data => setIsOpenCafe(data?.status?.open ?? false))
            .catch(console.error);
    }, [fetchData]);

    return (
        <div className="bg-background w-full min-h-screen text-colorPrimary flex">
            {!auth 
                ? 
                <div className="text-center">
                    <Button 
                        onClick={handlePrompt}
                        text={"Get Orders"}
                        color={"bg-green-400"} 
                    />
                </div>
                : <OrderTablesWithTabs
                    orders={orders}
                    completeOrder={handleComplete}
                    statusCafe={isOpenCafe}
                    toggleCafe={handleClose}
                    clearHistory={handleClearHistory}
                /> 
            }    
        </div>
    )
}