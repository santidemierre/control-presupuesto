import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setEsValidoPresupuesto}) => {

    // State local, solo lo necesito aca
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = e => {
        e.preventDefault();
        if(!presupuesto || presupuesto < 0) {            
            setMensaje("No es un numero válido")
            return
        } 
        setMensaje('') // Limpio el state al colocar un presupuesto válido
        setEsValidoPresupuesto(true)

    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">   
        <form 
            className="formulario"
            onSubmit={handlePresupuesto}>
            <div className="campo">
                <label className="font-bold text-center mt-6">¿Cuál es el límite de tu tarjeta?</label>
                <input 
                    type="number"
                    placeholder="Ej: 1000"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-center text-2xl"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input 
                type="submit"
                value="Añadir"
                className="w-full py-2 px-4 font-bold text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity mt-4"
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>      
        
    </div>
  )
}

export default NuevoPresupuesto
