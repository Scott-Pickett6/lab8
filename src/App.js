import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Messages from './pages/Messages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="messages" element={<Messages/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
