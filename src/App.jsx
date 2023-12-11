import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Form from "./Componentes/Form";
import Layaut from "./Componentes/Layaut";
import Historial from "./Componentes/Historial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layaut/>
            }
          >
            <Route
              index
              element={
                <Form/>
              }
            />
            <Route
              path="historial"
              element={
                <Historial/>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
