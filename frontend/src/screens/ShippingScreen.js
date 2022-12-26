import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { saveShippingDetails } from "../redux/cart/cartSlice";

const ShippingScreen = () => {
  const shippingData = useSelector((state) => state.cart.shippingDetails);

  const shipping = {
    address: shippingData?.address,
    postalCode: shippingData?.postalCode,
    city: shippingData?.city,
    country: shippingData?.country,
  };
  const [shippingDetails, setShippingDetails] = useState(shipping);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setShippingDetails({
      ...shippingDetails,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingDetails(shippingDetails));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="mb-4">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="address"
            placeholder="Enter Address"
            name="address"
            value={shippingDetails.address}
            onChange={handleChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postalCode" className="mb-4">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="postalCode"
            placeholder="Enter Address"
            name="postalCode"
            value={shippingDetails.postalCode}
            onChange={handleChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city" className="mb-4">
          <FormLabel>City</FormLabel>
          <FormControl
            type="city"
            placeholder="City"
            name="city"
            value={shippingDetails.city}
            onChange={handleChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country" className="mb-4">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="country"
            placeholder="Country"
            name="country"
            value={shippingDetails.country}
            onChange={handleChange}
          ></FormControl>
          <Row className="mx-auto mt-4">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
