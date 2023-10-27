import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
// The LinkCOntainer option makes the link faster
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg= "dark" variant="dark" expand="md" collapseOnSelect>   {/* to make hamburger menu appear sonner, use md instead of lg on expand */}
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Sahara Store</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='ms-auto'>
                  <LinkContainer to='cart'>
                    <Nav.Link><FaShoppingCart />Cart</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="login">
                    <Nav.Link><FaUser />Sign in</Nav.Link>
                  </LinkContainer>

                </Nav>

            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
