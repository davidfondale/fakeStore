import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Update from './Update';

function ProductDetails() {
  const { productId } = useParams();          
  const [product, setProduct] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [updateVisible, setUpdateVisible] = useState(false);

  // Fetch user and todos for the specific userId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const Response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const Data = await Response.json();
        setProduct(Data);

      } catch (err) {
        setError(`Error loading products: ${err.message}`);

      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]); // Refetch products if productId changes

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
          Loading Product Details...
        </h3>
      </Container>
    )
  }

  if (error) return <p>{error}</p>;
/*
  {updateVisible && <div>
    <Update />  
    </div>
  }
*/
  return (
    <Container>
      <h1>Product Details</h1>
      <h2>{product.title}</h2>
      <img src={product.image} />
      <h3><b>Category: </b>{product.category}</h3>
      <h3><b>Price: </b>${product.price}</h3>
      <h4>
        <b>Description:</b><br></br> {product.description}
      </h4>
      <Button className="btn btn-success btn-lg m-2">Add to Cart</Button>
      <Button className="btn btn-secondary btn-lg m-2">Update Item</Button>
      <Button href={`/delete-product/${product.id}`} className="btn btn-danger btn-lg m-2">Delete Item</Button>
    </Container>
  );
}

export default ProductDetails;