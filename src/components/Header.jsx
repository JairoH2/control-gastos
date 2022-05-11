import { useState } from "react";
import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Head = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {

  //------> DEFINIMOS LOS HOOKS
  console.log(typeof presupuesto);

  //------> DEFINIMOS EL CONTENIDO DEL CONTENEDOR
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {/*De acuerdo al estado la validación de presupuesto, muestra un contenido u otro*/}
        {isValidPresupuesto ? (
          <ControlPresupuesto
            setGastos={setGastos}
            gastos={gastos}
            presupuesto = {presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
          <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto = {setPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
        />
        )}
        
    </header>
  )
}

export default Head
