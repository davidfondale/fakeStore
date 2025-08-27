import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ProductForm = () => {

  const [formData, setFormData] = useState({
    id: '',
    image: '',
    category: '',
    title: '',
    price: '',
    description: '',
    });

  const [submitted, setSubmitted] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    } else {

        try { const response = await fetch('https://fakestoreapi.com/products', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(formData),
                                    });
            
            const productData = await response.json();
            setNewProduct(productData);
            setSubmitted(true);
            setError(null);
            } catch (err) {
            setError(`Error submitting the form: ${err.message}`);
            setSubmitted(false);
            }
        }    
        setValidated(true);
  };

  return (
    <Container className="mt-5">
      <h2>Create Product</h2>

      {submitted && newProduct && <Alert variant="success" dismissible>{newProduct.title} created successfully!</Alert>}
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
                value={formData.id}
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
                value={formData.image}
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
                value={formData.category}
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
                value={formData.title}
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
                value={formData.price}
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
                value={formData.description}
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
};

export default ProductForm;