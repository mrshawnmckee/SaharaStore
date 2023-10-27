import { Badge, Navbar, Nav, Container } from 'react-bootstrap'  
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux' //This is for the count on the cart, selecting from the global state
// The LinkCOntainer option makes the link faster
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

  // Destructuring from state using useSelector, the state.cart is coming from store.js and cart:cartSliceReeducer
  const { cartItems } = useSelector((state) => state.cart);
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
                    <Nav.Link>
                      <FaShoppingCart />Cart
                      {
                        cartItems.length > 0 && (
                          <Badge pill bg='success' style={{marginLeft: '5px'}}>     {/*Badge is a rounded background */}
                          {/* a = accumulator, c = current item, cty in case there is more than one current item, 0 is default for the acc*/}
                            { cartItems.reduce((acc, cur) => acc + cur.qty, 0) }
                          </Badge>
                        )
                      }
                      </Nav.Link>
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
