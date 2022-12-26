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
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userProfile, userUpdateProfile } from "../redux/user/userDetailsSlice";

const ProfileScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, isError, errorMessage, user } = userDetails;

  const userAuth = useSelector((state) => state.userAuth);
  const { userInfo } = userAuth;

  useEffect(() => {
    if (userInfo === null && userInfo?.message) {
      navigate("/login");
    } else {
      if (!user?.name) {
        dispatch(userProfile());
      } else {
        setName(user?.name);
        setEmail(user?.email);
      }
    }
  }, [dispatch, navigate, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(userUpdateProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {isError && <Message variant={"danger"}>{errorMessage}</Message>}
        {message && <Message variant={"danger"}>{message}</Message>}
        {userInfo?.message ? (
          <Message variant={"info"}>{userInfo?.message}</Message>
        ) : null}
        {isLoading ? (
          <Loader />
        ) : (
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
                Update
              </Button>
            </Col>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
