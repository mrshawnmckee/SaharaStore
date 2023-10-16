import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <header>
      <Navbar bg= "dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar href="/">Sahara Store</Navbar>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
