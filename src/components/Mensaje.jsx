
const Mensaje = ({children, tipo}) => {
  return (
    <div className={`bg-slate-200 text-center text-red-500 mt-4 p-3 font-bold mb-8 ${tipo}`}>
        {children}
    </div>
  )
}

export default Mensaje
