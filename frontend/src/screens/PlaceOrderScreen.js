import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { orderCreate } from "../redux/order/orderSlice";

const PlaceOrderScreen = () => {
  const [orderDetails, setOrderDetails] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { order, isSuccess, isError, errorMessage, isLoading } = useSelector(
    (state) => state.orderCreate
  );

  //Calculate Prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  );

  const shippingPrice = addDecimals(Number(itemsPrice > 500 ? 0 : 50));

  const taxPrice = addDecimals(Number((0.17 * itemsPrice).toFixed(2)));

  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  useEffect(() => {
    setOrderDetails((prev) => ({
      ...prev,
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingDetails,
      paymentMethod: cart.paymentMethod,
      itemsPrice: Number(itemsPrice),
      shippingPrice: Number(shippingPrice),
      taxPrice: Number(taxPrice),
      totalPrice: Number(totalPrice),
    }));
  }, []);

  const placeOrderHandler = () => {
    if (cart?.cartItems.length !== 0) {
      dispatch(orderCreate(orderDetails));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`order/${order?._id}`);
    }
  }, [navigate, order?._id]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart?.shippingDetails.address},{" "}
                {cart?.shippingDetails.postalCode} {cart?.shippingDetails.city},{" "}
                {cart?.shippingDetails.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart?.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart?.cartItems.length === 0 ? (
                <Message>Your Cart Is Empty!</Message>
              ) : (
                <ListGroup varaint="flsuh">
                  {cart?.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            {cart?.cartItems.length === 0 ? (
              <Message variant={"danger"}>
                Your Cart Is Empty! Kindly add something in the Cart
              </Message>
            ) : (
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Order Summary</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  {order?.message && (
                    <Message variant={"danger"}>{order?.message}</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Button
                      type="button"
                      disabled={cart?.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
