import React, { useEffect } from "react";
import {
  Image,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import {
  fetchSingleProduct,
  goBack,
} from "../redux/products/productDetailsSlice";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { isLoading, error, product } = productDetails;

  const handleGoBack = () => {
    dispatch(goBack());
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <Container>
        <Col className="btn btn-light my-3" onClick={handleGoBack}>
          Go Back
        </Col>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : product?.message ? (
          <Message variant={"danger"}>{product?.message}</Message>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image src={product?.image} alt={product?._id} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>{product?.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating
                      value={product?.rating}
                      text={`${product?.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem>Price: ${product?.price}</ListGroupItem>
                  <ListGroupItem>
                    Description: {product?.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product?.price}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product?.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row className="mx-auto ">
                        <Button>Add To Cart</Button>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
