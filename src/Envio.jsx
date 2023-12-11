import { useEffect, useState } from 'react'

const InputEnvio = ({CambiodeEnvio})=>{

  //Peticion de Informacion//

  const [data, setData] = useState(null);

  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const respuesta = await fetch("data/envio.json")
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

  const datosEnvio = data ? data.map(item => item.envio) : [];

  const factorEnvio = data ? data.map(factor => factor.factor) : [];


//Envio Props//
const [selectedEnvio, setSelectedEnvio] = useState('');


const cambiarEnvio = (evento)=>{
  const valorSeleccionado = evento.target.value;
  setSelectedEnvio(valorSeleccionado);

  CambiodeEnvio(valorSeleccionado);

}



    return(
        <>
        
        <select name="SeleccionarDestino" id="SeleccionarDestino" onChange={cambiarEnvio} value={selectedEnvio}>
            <option value="...">...</option>
            <option >{datosEnvio[0]}</option>
            <option >{datosEnvio[1]}</option>
            <option value={factorEnvio[2]}>{datosEnvio[2]}</option>
            <option value={factorEnvio[3]}>{datosEnvio[3]}</option>
            <option value={factorEnvio[4]}>{datosEnvio[4]}</option>
        </select>
        </>
        
    )
    }

export default InputEnvio;
