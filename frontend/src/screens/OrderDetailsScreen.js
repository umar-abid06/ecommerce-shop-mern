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
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import { getOrderDetails } from "../redux/order/orderDetailsSlice";

const OrderDetailsScreen = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.orderDetails.order);

  //   const { order, isSuccess, isError, errorMessage, isLoading } = orderDetails;
  console.log(order);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    Number(
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Order {order?._id}</h2>
              <strong>Shipping</strong>
              <p>
                <strong>Name: </strong> {order?.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress.address},{" "}
                {order?.shippingAddress.postalCode}{" "}
                {order?.shippingAddress.city}, {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant={"success"}>
                  Delivered On: {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant={"danger"}>Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant={"success"}>Paid On: {order?.paidAt}</Message>
              ) : (
                <Message variant={"danger"}>Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order Not Found!</Message>
              ) : (
                <ListGroup varaint="flsuh">
                  {order?.orderItems.map((item, index) => (
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
            {order?.orderItems.length === 0 ? (
              <Message variant={"danger"}>No Order Found!</Message>
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
                    <Col>${order?.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order?.taxPrice}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order?.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  {order?.message && (
                    <Message variant={"danger"}>{order?.message}</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    {/* <Button
                      type="button"
                      disabled={order?.cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button> */}
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

export default OrderDetailsScreen;
