import { useState } from "react"
import Mensaje from "./Mensaje";


const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  //------> DEFINIMOS LOS HOOKS
  const [mensaje, setMensaje] = useState('');


  //------> DEFINIMOS LAS FUNCIONES
  const handlePresupuesto = (e)=>{
    e.preventDefault();

    if(!presupuesto || presupuesto < 0){ 
      setMensaje('No es un presupuesto válido');
      return; //Evita que se ejecute el demás código en caso de error.  
    }

    setMensaje('');
    setIsValidPresupuesto(true);
  }

  //------> DEFINIMOS EL CONTENIDO DEL COMPONENTE
  return (
    <div className="contenedor-presupuesto contenedor sombra">

      <form onSubmit={handlePresupuesto} className="formulario">
        
        <div className="campo">
          <label>Definir Presupuesto</label>
          {/*Al hacer type=number: permite trabajar correctamente al estar usando onChange() que trata de convertir a numeros los valores ingresados y al tener nuumber, permite solo agregar numeros lo que facilita la conversion de forma correcta*/}
          <input 
            className="nuevo-presupuesto"
            type="number" 
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange = { e => setPresupuesto(Number(e.target.value))}
          />
        </div> {/*Termina Campo-Formulario*/}

        <input type="submit" value="Añadir"/>

        {/*Si no se ingresa un número válido, se activa el componente que permite notificar el error*/}
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

      </form>{/*Termina el formulario*/}

    </div>
  )
}

export default NuevoPresupuesto
