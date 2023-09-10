import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ValuesType } from "../models";

interface PayPalPaymentProps {
  payload: ValuesType;
}
const PayPalPayment: React.FC<PayPalPaymentProps> = (props) => {
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:5000/api/payment/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        product: {
          description: "Portal Subscription",
          cost: "149.00",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server
    return fetch(`http://localhost:5000/api/payment/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: props.payload.emailAddress,
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data)}
      onApprove={(data, actions) => onApprove(data)}
    />
  );
};

export default PayPalPayment;
