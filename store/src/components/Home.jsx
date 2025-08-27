import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';

function Home() {
  return(
    <Container>
      <Row>
        <Col>
          <h3>Welcome to The Fake Store</h3>
          <p>The Fake Store is somewhat like George Costanza's Jerk Store. 
             It isn't a real store at all. Neither is the Fake Store a way to attempt to zing Riley. 
             But that doesn't mean you can't still fly to Akron, OH with a large shrimp platter, anyway. 
             What the Fake Store really is, is a good way to test an API front end. Enjoy 
             browsing our full selection of non-existant products!
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./assets/clothing.png"
                alt="clothing and accessories"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>Clothing and Accessories</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./assets/general.png"
                alt="general merchandise"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>General Merchandise</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./assets/electronics.png"
                alt="electronics"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>Electronics</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;