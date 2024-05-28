import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    let todoSrting = localStorage.getItem("todos")
    if (todoSrting) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplated: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isComplated = !newTodos[index].isComplated;
    setTodos(newTodos)
    saveToLocalStorage()
  }


  return (
    <>
      <Navbar />
      <div className="container w-auto md:w-1/2 md:mx-auto m-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className='font-bold text-center text-xl md:text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-3">
          <h2 className='text-lg md:text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 p-1' />
          <button onClick={handleAdd} disabled={todo.length<5} className='bg-violet-700 hover:bg-violet-800 px-7 text-sm font-bold py-1 text-white rounded-full disabled:bg-violet-500 mx-2'>Save</button>
          </div>
        </div>
        <input className='mb-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label htmlFor="show" className='mx-5'>Show Finished Todo</label>
        <div className='h-[1.5px] rounded-full bg-black opacity-20 my-2 w-[90%] mx-auto'></div>
        <h2 className='text-lg md:text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isComplated) && <div key={item.id} className="todo flex w-full justify-between my-2">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isComplated} id="" />
                <div className={item.isComplated ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-violet-700 hover:bg-violet-800 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-800 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App