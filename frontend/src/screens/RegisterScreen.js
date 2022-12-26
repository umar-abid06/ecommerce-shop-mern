import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userSignup } from "../redux/user/userRegisterSlice";

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.userRegister);
  const { isLoading, isError, errorMessage, isSuccess } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [navigate, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(userSignup({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {isError && <Message variant={"danger"}>{errorMessage}</Message>}
      {message && <Message variant={"danger"}>{message}</Message>}
      {isSuccess?.message ? (
        <Message variant={"info"}>{isSuccess?.message}</Message>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email">
              <FormLabel>Name</FormLabel>
              <FormControl
                placeholder="Enter Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="email" className="py-3">
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

            <FormGroup controlId="confirmPassword" className="py-3">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Col className="py-2">
              <Button type="submit" variant="primary">
                {" "}
                Sign Up
              </Button>
            </Col>
          </Form>

          <Row className="py-3">
            <Col>
              Already a Customer?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default RegisterScreen;
