import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className="contenedor-gastos">
      <div className=""> 
      
          {
            filtro ? (
              <>
                <h2 className="titulo-gastos">{gastosFiltrados.length ? "Gastos" : "No hay Gastos en esta Categoría"}</h2>
                <div className="listado-gastos">              

                  {gastosFiltrados.map( gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="titulo-gastos">{gastos.length ? "Gastos" : "No hay Gastos Aún"}</h2>
                <div className="listado-gastos">
                  {gastos.map( gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                    ))}
                </div>
              </>
            )           
          }         

      </div>
    </div>
  )
}

export default ListadoGastos