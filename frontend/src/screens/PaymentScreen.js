import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/cart/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingDetails = useSelector((state) => state.cart.shippingDetails);
  console.log(shippingDetails);
  if (!shippingDetails) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPayl");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="mb-2">
          <FormLabel as="legend">Select Method</FormLabel>

          <Col>
            <Row className="mb-4">
              <FormCheck
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck>
              {/* <FormCheck
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck> */}
            </Row>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
