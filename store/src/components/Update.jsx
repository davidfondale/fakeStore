import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Update = (props) => {
  const [product, setProduct] = useState(props.prod);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [validated, setValidated] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (evt) => {
      const { name, value } = evt.target;
      setProduct({
        ...product,
        [name]: value
      });
  }

  const handleSubmit = async (evt) => {
    const form = evt.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false){
      evt.stopPropagation();
    } else {
        setUpdating(true);
        try { const response = await fetch(`https://fakestoreapi.com/products/${props.prod.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
                });
              const updateData = await response.json();
              setUpdatedProduct(updateData);
              setSubmitted(true);

            } catch (err) {
              setErrorMessage(`Update to the API failed: ${err.message}`);
              setError(true);

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
      {submitted && <Alert variant="success" dismissible>{updatedProduct.title} updated successfully!</Alert>}
      {error && <Alert variant="danger" dismissible>{errorMessage}</Alert>}

      <h2>Update Product</h2>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Col md="5">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a product ID"
                name="id"
                value={product.id}
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
                value={product.image}
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
                value={product.category}
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
                value={product.title}
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
                value={product.price}
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
                value={product.description}
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