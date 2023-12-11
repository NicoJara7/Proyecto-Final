import { Children, createContext, useState } from 'react';
import App from './App';

const contexto = createContext();

const contextoProvider = ( {Children} )=>{

   const [datos, setDAtos] = useState();
   const informacion = ()=>{

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

  return <contexto.Provider value={datos}>
    {Children}
  </contexto.Provider>


  }
}


  

const datos = JSON.stringify(data,null,2);


export default {contexto, contextoProvider}; 
  