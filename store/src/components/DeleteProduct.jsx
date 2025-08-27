import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function DeleteProduct() {
  const { productId } = useParams();          
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(true);  
  const [error, setError] = useState("");

  useEffect(() => {
    const Delete = async () => {
      try{
        const Result = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
        });
        const Data = await Result.json();
        setMessage(Data.id);

      } catch (err) {
        setError(`Error deleting product: ${err.message}`);

      }finally {
        setDeleting(false);
      }
    }
    Delete();
  }, [productId]);

  if (deleting) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Deleting Product...
        </h3>
      </Container>
    )
  }
    
  if (error) return <p>{error}</p>;

  if(message == productId) {
    return(
        <Alert variant="success" dismissible>
            Success! The product has been deleted.
        </Alert>
    )
  } else{
    return(
        <Alert variant="danger" dismissible>
            The product was not deleted. Please try again.
        </Alert>
    )
  }
}

export default DeleteProduct