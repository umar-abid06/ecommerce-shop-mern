import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import Something from "./screens/Something";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
          {/* <Something /> */}
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
