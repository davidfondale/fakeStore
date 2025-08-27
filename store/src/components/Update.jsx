import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Update = (props) => {

  const [productData, setProductData] = useState({
    id: props.product.id,
    image: props.product.image,
    category: props.product.category,
    price: props.product.title,
  });

  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [validated, setValidated] = useState(false);
  const [updating, setUpdating] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
      setValidated(false);
    } else {

        try { const response = await fetch(`https://fakestoreapi.com/products/${props.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({productData})
              });
              const updateData = await response.json();
              setUpdatedProduct(updateData);
              setSubmitted(true);
              setError(false);

            } catch (err) {
              setError(`Update to the API failed: ${err.message}`);

            } finally {
              setUpdating(false);
            }
        }
      }

    if (updating) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Updating Product...
        </h3>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <h2>Update Product</h2>

      {submitted && <Alert variant="success" dismissible>{updatedProduct.title}updated successfully!</Alert>}
      {error && <Alert variant="danger" dismissible>{error}</Alert>}

      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Col md="5">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product ID"
                name="id"
                value={productData.id}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product ID
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="7">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product image uri"
                name="image"
                value={productData.image}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product image uri
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
        </Row>

        <Row>
          <Col md="5">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product category
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="7">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product title
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
        </Row>

        <Row>
          <Col md="5">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product price
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="7">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product description
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
        </Row>

        <Button variant="success" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );

}

export default Update;  