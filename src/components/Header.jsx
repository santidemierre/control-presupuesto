import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"

const Header = ({
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto, 
    esValidoPresupuesto, 
    setEsValidoPresupuesto,
  }) => {
  return (
    <header className="">
        <h1 className="font-extrabold">Maneja tus Gastos</h1>

        {esValidoPresupuesto ? (
          <ControlPresupuesto 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setEsValidoPresupuesto={setEsValidoPresupuesto}
          />
        ) : (
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setEsValidoPresupuesto={setEsValidoPresupuesto}
        />
        )}
        
    </header>
  )
}

export default Header
