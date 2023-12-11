import { Link, Outlet } from "react-router-dom";


const Layaut = () => {
  return (
    <>
      <header>
        <Link to="/">Formulario</Link>
        <Link to="/historial">Historial</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layaut;
