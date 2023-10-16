import { Container } from 'react-bootstrap'
import Header from "./Components/Header"

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to the Sahara Store</h1>

        </Container>

      </main>
    
    </>
  )
}

export default App

