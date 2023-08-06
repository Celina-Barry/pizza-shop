import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const OrderContainer = styled.div`
 background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${fadeIn} 0.5s ease-in;
`;
const Confirmation = () => {
    const [confirmationInfo, setConfirmationInfo] = useState(null);
    const { orderId } = useParams();
   
    useEffect(() => {
        console.log("order ID:", orderId );
        fetch(`/orders/${orderId}`)
        .then((res) => res.json())
        .then((parsed) => {
            console.log("fetched-data", parsed.data);
            setConfirmationInfo(parsed.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [orderId]);

return (
    <OrderContainer>
        <h2>Order Confirmation</h2>
        <h3>Your order has been received</h3>
        {confirmationInfo ? (
            <>
            <p>Order ID: {confirmationInfo.id}</p>
          <p>First Name: {confirmationInfo.fname}</p>
          <p>Last Name: {confirmationInfo.lname}</p>
          <p>Phone: {confirmationInfo.phone}</p>
          <p>Address: {confirmationInfo.address}</p>
          <p>Email: {confirmationInfo.email}</p>
          <p>Pizza: {confirmationInfo.pizza}</p>
          <p>Price: {confirmationInfo.price}</p>
            </>
        ) : (
            <p>Loading</p>
        )}
    </OrderContainer>
)
}

export default Confirmation;