import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userLogin } from "../redux/user/userAuthSlice";

const LoginScreen = () => {
  const registeredUser = useSelector(
    (state) => state.userRegister.registeredUser
  );
  const [email, setEmail] = useState(
    registeredUser ? registeredUser?.email : ""
  );

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.userAuth);
  const { isLoading, isError, errorMessage, userInfo } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!(userInfo === null) && !userInfo?.message) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {isError && <Message variant={"danger"}>{errorMessage}</Message>}
      {userInfo?.message ? (
        <Message variant={"danger"}>{userInfo?.message}</Message>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="password" className="py-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Col className="py-2">
              <Button type="submit" variant="primary">
                {" "}
                Sign In
              </Button>
            </Col>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/regitser"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
