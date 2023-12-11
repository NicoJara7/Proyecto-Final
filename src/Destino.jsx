import { useEffect, useState } from 'react'

const InputDestino = ()=>{

  const [data, setData] = useState(null);

  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const respuesta = await fetch("data/data.json")
        const jsonData = await respuesta.json();
        setData(jsonData)

      }
      catch(error){
        console.error("error al cargar el archivo json");
       

      }

    }

    fetchData();

  }, [])


  const datos = JSON.stringify(data,null,2)

  const datosDestino = data ? data.map(item => item.destino) : [];

  const factorDestino = data ? data.map(factor => factor.factor) : [];






    return(
        <>
        
        <select name="SeleccionarDestino" id="SeleccionarDestino">
            <option value={factorDestino[0]} >{datosDestino[0]}</option>
            <option value={factorDestino[1]}>{datosDestino[1]}</option>
            <option value={factorDestino[2]}>{datosDestino[2]}</option>
            <option value={factorDestino[3]}>{datosDestino[3]}</option>
            <option value={factorDestino[4]}>{datosDestino[4]}</option>
        </select>
        </>
        
    )
}

export default InputDestino;
