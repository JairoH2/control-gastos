import { useState, useEffect } from "react";
import Filtro from "./components/Filtro";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers/index";
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  //------> DEFINIMOS LOS HOOKS
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  ); 
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //Permite ejecutar el modal para editar
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  //Permite escuchar cambios en gastos y actualizar el storage
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);


  //Verifica que se encuentre presupuesto, sino registra 0. 
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  //Permite filtrar elementos por alguno seleccionado
  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  //Verifica si hay algo en LS, de ser así evita mostrar la primer pantalla. 
  useEffect(()=>{
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, [])

  //------> DEFINIMOS LAS FUNCIONES

  const handleNuevoGasto = ()=>{
    setModal(true);
    setGastoEditar({}); //Peremite reiniciar el objeto que estad cargado en el state del modal.

    //Permite actiivar la transisicon del formulario
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto=>{

    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{
      // Nuevo Gasto

      //Generamos un Id único y lo agregamos al objeto de datos que se recibe en la función.
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    //Permite ocultar la ventana modal, primero se cambia estado de animación para que desaparezca primero visualmente el formulario. 
    setAnimarModal(false);
    setTimeout(() => {
        setModal(false);
    }, 500);
  }
  
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  //------> DEFINIMOS EL CONTENIDO DEL APP PRINCIPAL
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {/* Permite Agregar icono si presupuesto es válido*/}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
         </div> {/* Fin de icono de nueva tarea*/}
       </>
      )}

      {/* Permite visualizar la ventana modal si se pulsa sobre el boton de +*/}
      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}

    </div>
  );
}

export default App;
