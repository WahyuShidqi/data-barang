import { BrowserRouter, Route, Routes } from "react-router-dom";
import DaftarBarang from "./components/daftarBarang";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DaftarBarang />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
