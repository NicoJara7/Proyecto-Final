import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import FormStyle from "../Css/formulario.module.css"


const Form = () => {
  // Storage //

  const [historial, setHistorial] = useState(() => {
    let storage = localStorage.getItem("historial");
    if (storage) return JSON.parse(storage);
    localStorage.setItem("historial", JSON.stringify([]));
    return [];
  });

  const [load, setLoad] = useState(false);
  const [listaUno, setlistaUno] = useState(null);
  const [listaDos, setlistaDos] = useState(null);
  const [opcionUno, setOpcionUno] = useState(null);
  const [opcionDos, setOpcionDos] = useState(null);
  const [value, setValue] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetch("data/destino.json")
      .then((res) => res.json())
      .then((datos) => {
        setlistaUno(datos);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoad(false);
      });
  }, []);

  const opcionesDestino = listaUno
    ? listaUno.map(({ destino, idDestino }) => (
        <option value={idDestino} id={idDestino} key={idDestino}>
          {destino}
        </option>
      ))
    : [];

  useEffect(() => {
    setLoad(true);
    fetch("data/envio.json")
      .then((res) => res.json())
      .then((datos) => {
        setlistaDos(datos);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoad(false);
      });
  }, []);

  const opcionesEnvio = listaDos
    ? listaDos.map(({ envio, idEnvio }) => (
        <option value={idEnvio} key={idEnvio}>
          {envio}
        </option>
      ))
    : [];

  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(historial));
  },[historial]);

  const Cotizar = (e) => {
    e.preventDefault();
    if (value <= 0 || opcionUno == null || opcionDos == null) {
      return Swal.fire(
        '',
        'Completa Todos Los Campos',
        'error'
      )
    }
    setLoad(true);
      value;
      const peso = parseInt(value);
      let factorPeso = 0;
      if (peso >= 1 && peso <= 3) {
        factorPeso = 1.5;
      } else if (peso >= 4 && peso <= 7) {
        factorPeso = 2.0;
      } else if (peso >= 8 && peso <= 10) {
        factorPeso = 2.5;
      } else {
        console.log("valor incorrecto");
      }
    setTimeout(() => {
      let factorDestino =  listaUno.find(({ idDestino })=> idDestino == opcionUno)
        let factorEnvio = listaDos.find(({ idEnvio })=> idEnvio == opcionDos)
      setTotal(2000 * factorDestino.factor * factorEnvio.factor * factorPeso);
      setLoad(false);
      e.target.reset();
    }, 2000);
  };

  const guardar = () => {
    setHistorial([
      ...historial,
      {
        fecha: new Date().toLocaleDateString(),
        destinoFinal: listaUno.find(({ idDestino })=> idDestino == opcionUno),
        envioFinal: listaDos.find(({ idEnvio })=> idEnvio == opcionDos),
        peso: value,
        total: total,
      }
    ]);
    setTotal(null)
    return Swal.fire("Exito", "operacion Guardada", "success");
  };
  
const formulario2 = document.getElementById("formulario2")
console.log(formulario2);

  return (
    <>
      <h2 className={FormStyle.titulo}>Cotizador de Viajes</h2>
      {load && <p className={FormStyle.cargando}>Cargando</p>}
      {!load && (
        <form onSubmit={Cotizar} className={FormStyle.formularioprincipal} >
          <fieldset>
            <label htmlFor="destino">Destino</label>
            <select
              name="destino"
              id="destino"
              defaultValue={0}
              onChange={({ target }) => setOpcionUno(target.value)}
            >
              <option value={0} disabled>
                Seleccionar Destino
              </option>
              {opcionesDestino}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="envio">Envio</label>
            <select
              name="envio"
              id="envio"
              defaultValue={0}
              onChange={({ target }) => setOpcionDos(target.value)}
            >
              <option value={0} disabled>
                Seleccionar Envio
              </option>
              {opcionesEnvio}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="peso">
              Peso<span> {value}</span>
            </label>
            <input
              type="range"
              name="peso"
              id="peso"
              min={1}
              max={10}
              defaultValue={1}
              onInput={({ target }) => setValue(target.value)}
              className={FormStyle.rango}
            />
          </fieldset>
          <button type="submit" className="boton-cotizar">Cotizar</button>    
        </form>     
      )}
      {total && (<form className={FormStyle.formulariosecundario} id="formulario2" onSubmit={(e)=> e.preventDefault()}>
        <h2>El Valor Del Envio Es: {total.toFixed(2)}</h2>
        <button type="button" onClick={guardar}>Guardar</button>

        </form>)}
    </>
  );
};

export default Form;
