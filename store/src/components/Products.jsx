import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Products() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);    // Error state

  // useEffect to fetch products when component mounts
  useEffect(() => {
    const getProducts = async () => {
      try{
        const Result = await fetch("https://fakestoreapi.com/products");
        const ProductData = await Result.json();
        setProducts(ProductData);

      } catch (err) {
        setError(`Error loading products: ${err.message}`);
        setLoading(false);
      
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading Products...
        </h3>
      </Container>
    )
  }

  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h3>Products</h3>
      <Row>
        {products.map(product => (
          <Col key={product.id} className="mt-4">
            <Card style={{ width: '25rem', height: '28rem'}} >
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <img src={product.image} style={{ width: '10rem', height: '15rem'}} />
                <Card.Text className="mt-3">Price: ${product.price}</Card.Text>
                <Button href={`/product-details/${product.id}`}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;