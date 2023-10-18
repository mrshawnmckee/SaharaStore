import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
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
                    <Nav.Link href="/cart"><FaShoppingCart />Cart</Nav.Link>
                    <Nav.Link href="/login"><FaUser />Sign in</Nav.Link>

                </Nav>

            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
