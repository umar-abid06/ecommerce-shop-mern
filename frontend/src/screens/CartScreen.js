import React, { useEffect } from "react";
import {
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
  Button,
  Card,
  Stack,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigation } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Message from "../components/Message";

import { addToCart, removeFromCart } from "../redux/cart/cartSlice";

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, isLoading, error } = useSelector((state) => state.cart);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Stack direction="horizontal" gap={3} className=" align-items-start">
      <Row>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your Cart Is Empty! <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((item) => (
              <ListGroupItem key={item._id}>
                <Row className="align-items-center justify-content-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>{item.name}</Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            id: item._id,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Row>
      {cartItems?.length > 0 ? (
        <Row md={12}>
          <Col style={{ marginTop: "80px", width: "280px" }}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h4>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h4>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  <Row className="mx-auto">
                    <Button
                      type="button"
                      disabled={cartItems?.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Stack>
  );
};

export default CartScreen;
