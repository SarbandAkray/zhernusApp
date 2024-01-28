import Container from './components/Container'
import FileUpload from './components/FileUpload'
import Footer from './components/Footer'
import Intro from './components/Intro'

export function App() {
  return (
    <div className="font-rabar h-screen bg-gray-800">
      <Container>
        <Intro />
        <FileUpload />
      </Container>
      <Footer />
    </div>
  )
}

export default App
