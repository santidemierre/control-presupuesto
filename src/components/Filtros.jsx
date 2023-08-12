import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select 
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)} // Se ejecuta cada vez que el usuario modifique la selección
                >
                    <option value="">-- Todas las Categorias --</option>
                    <option value="comida">Comida</option>
                    <option value="super">Supermercado</option>
                    <option value="casa">Casa</option>
                    <option value="hijos">Hijos</option>
                    <option value="cumples">Cumpleaños</option>
                    <option value="colegio">Colegio</option>
                    <option value="baradero">Baradero</option>
                    <option value="campo">Campo</option>
                    <option value="cuotas">Gastos con Cuotas</option>
                    <option value="mercadolibre">Mercado Libre</option>
                    <option value="debitos">Débitos automáticos</option> 
                    <option value="free_time">Tiempo libre</option>     
                </select>
            </div>
        </form>
        

    </div>
  )
}

export default Filtros
