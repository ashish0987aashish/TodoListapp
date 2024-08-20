import { useState,useEffect } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";





function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {

    let todoString = localStorage.getItem("todos")
  
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  
  }, [])

const saveToLS = ()=>{

  localStorage.setItem("todos",JSON.stringify(todos))
}  



const handleChange = (e)=>{
 
   setTodo(e.target.value) 
    
}


const handleEdit = (e,id)=>{

   console.log("edit is clicked")

    let t = todos.filter( i =>  i.id === id )
    setTodo(t[0].todo)

    console.log(id)

   let newtodos = todos.filter(item =>{
 
    return item.id !== id    
    

  })
  setTodos(newtodos)
  saveToLS()

}

const handleDelete = (e,id)=>{


  console.log("delete is clicked")

   console.log(`the id is ${id}`)

   let newtodos = todos.filter(item =>{
 
     return item.id !== id    
   })

   setTodos(newtodos)
   saveToLS()
}


const handleAdd = ()=>{

    console.log("add is clicked")

    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    console.log(todo.id)
    
    saveToLS()

}

const handleSave = () =>{
 
    saveToLS()
}


const handleChecked = (e)=>{

 let id = e.target.name;
 console.log(`the id is ${id}`)
 let index = todos.findIndex(item=>{
    
  return item.id === id;
 })
   
 console.log(index)
  let newtodos = [...todos]
  newtodos[index].isCompleted = !newtodos[index].isCompleted
  setTodos(newtodos)
  console.log(newtodos)
  saveToLS()
}

const toggleFinished = () =>{

  setshowFinished(!showFinished)
}

  return (
    <>

       <Navbar/>     
     <div className=" container my-5 md:w-3/5 p-5 md:mx-auto rounded-xl  bg-violet-100 min-h-[80vh]">
         
      <h1 className='font-bold text-center text-2xl'>iTodo - manage your todos at one place </h1>
 
      <div className="addsave flex flex-col my-5 gap-4">
  
         
         <h2 className='text-xl font-bold'>Add a Todo</h2>

         <input onChange={handleChange} value={todo} type="text" className='w-full p-5 rounded-lg'/>
          <button onClick={handleAdd} disabled={todo.length <=3} className='bg-green-700 hover:bg-green-800 p-2 py-1 text-sm font-bold text-white rounded-lg mx-6 disabled:bg-violet-800 '>Add</button>

     

         
      <button onClick={handleSave}  className='bg-violet-800 hover:bg-green-700 p-2 py-1  gap-4 text-sm font-bold text-white rounded-lg mx-6 '>Save</button>
      </div>
    
      <label htmlFor="101" >
      <input type="checkbox" className='py-3' onChange={toggleFinished} name="" id="101" checked={showFinished} /> Show Finished </label>
 

      <h2  className='text-xl font-bold'> Your Todos</h2>
      
       <div className="todos">
      {todos.length ===0 &&  <div className='m-5'>The Todo is empty  :) </div> }

        {todos.map( item=>{
         
         
         
        return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex justify-between my-3 md:w-1/2 items-center">


            <input type="checkbox" className='' checked={item.isCompleted} onChange={handleChecked}  name={item.id} id="" />

            <div className='w-1/2 break-words md:mx-auto'>
            <div  className={ item.isCompleted?"line-through":"" }>
            {item.todo}
            </div>
            </div>

          <div className="buttons flex h-full ">
            
             <button onClick={(e) =>{handleEdit(e,item.id)}} className='bg-violet-800 hover:text-yellow-300 hover:bg-white p-2 py-1 text-sm font-bold text-white rounded-lg mx-2 '><FaEdit /></button>
             <button onClick={(e) =>{handleDelete(e,item.id)}} className='bg-violet-800 hover:text-red-600 hover:bg-white p-2 py-1 text-sm font-bold text-white rounded-lg mx-2 '><AiFillDelete /></button>
            
            </div>                   

          </div>

           })}
        </div> 
     
    </div>
    </>
  )
}

export default App
