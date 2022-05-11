import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';



const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar,setGastoEditar}) => {

    //------> DEFINIMOS LOS HOOKS
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
          }
    }, [])

    //------> DEFINIMOS LAS FUNCIONES
    const ocultarModal = ()=>{
        setAnimarModal(false);
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        
        //Forma de validar es el estado al mismo tiempo de diferentes estados, en esta caso que no sean vacíos.
        if([nombre, cantidad, categoria].includes("")){
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 1000);
            return;
        }

        //Validación correcta
        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }

    //------> DEFINIMOS EL CONTENIDO DEL CONTENEDOR
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} alt="cerrar modal" 
                    onClick={ocultarModal}
                />
            </div>

            {/*Permite agregar el formulario con algunas animacion de acuerdo si el estado de la animación cambia*/}
            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`} 
            >

                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto:</label>

                    <input 
                        id="nombre" 
                        type="text" 
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange = { e => setNombre(e.target.value)}
                    />
                </div> {/*Fin de campo 1*/}

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad:</label>

                    <input 
                        id="cantidad" 
                        type="text" 
                        placeholder='Añade la Cantidad del Gasto: ej. 300'
                        value={cantidad}
                        onChange = {e => setCantidad(Number(e.target.value))}
                    />
                </div> {/*Fin de campo 2*/}

                <div className="campo">
                    <label htmlFor="categoria">Categoría:</label>

                    <select 
                        id="categoria"
                        value={categoria}
                        onChange = {e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                </div> {/*Fin de campo 3*/}

                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Cambios'}
                />
            </form>
        </div>
    )
}

export default Modal
