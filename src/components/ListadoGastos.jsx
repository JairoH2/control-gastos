import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
      {
        //Nos permite comprobar si es que existe algun contenido en filtro, de esta forma se agrega uno u otro contenido
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en Esta Categoría'}</h2>
            {
              gastosFiltrados.map(gasto =>(
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto = {eliminarGasto}
                />
              ))
            }
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
            {
              gastos.map(gasto =>(
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto = {eliminarGasto}
                />
              ))
            }
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos
