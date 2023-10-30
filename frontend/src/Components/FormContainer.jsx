import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {/* Chilren passed in as a prop, destructured from above */}
                { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer
