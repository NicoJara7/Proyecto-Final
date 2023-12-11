import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HistorialStyle from "../Css/historial.module.css"

const Historial = () => {
  const [historial, setHistorial] = useState(() => {
    let storage = localStorage.getItem("historial");
    if (storage) return JSON.parse(storage);
    localStorage.setItem("historial", JSON.stringify([]));
    return [];
  });

  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(historial));
  }, [historial]);

  const borrarHistorial = ()=>{
    localStorage.clear()
    setHistorial([]);
  }


 const eliminarElemento = (index) => {
  const nuevoHistorial = [...historial];
  nuevoHistorial.splice(index, 1);
  setHistorial(nuevoHistorial);
};

  
 

  return (
    <>
      <h2 className={HistorialStyle.titulo}>Historial</h2>
      <button type="button" onClick={borrarHistorial} className={HistorialStyle.borrartodo}>Borrar Historial</button>
      <ul>
        {historial.map((elemento, index) => (
          <li key={index}>
            <p>Fecha: {elemento.fecha}</p>
            <p>
              Destino: {elemento.destinoFinal && elemento.destinoFinal.destino}
            </p>
            <p>Envío: {elemento.envioFinal && elemento.envioFinal.envio}</p>
            <p>Peso: {elemento.peso} Kg</p>
            <p>Total: ${elemento.total}</p>
            <button type="button" onClick={()=> eliminarElemento(index) }>Eliminar</button>
          </li>
        ))}
      </ul>
   <Link to="/">Volver</Link>
    </>
  );
};

export default Historial;
