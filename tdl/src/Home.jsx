import { useEffect, useState } from "react"
import Create from "./Create"
import axios from "axios"
import { BsFillCircleFill, BsCircleFill ,BsFillTrashFill  } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([])
    
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then(result =>setTodos(result.data))
      .catch(err=>console.log(err))
    },[])
    const handleEdit = async (id) => {
      try {
        await axios.put(`http://localhost:3001/update/${id}`);
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, done: true } : todo
        );
        setTodos(updatedTodos);
      } catch (err) {
        console.log(err);
      }
    };
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        const filteredTodos = todos.filter((todo) => todo._id !== id);
        setTodos(filteredTodos);
      } catch (err) {
        console.log(err);
      }
    };
    
    
  return (
    <div className="home" >
        <h2>Todo List</h2>
        <Create/>
        {todos.length === 0 
        ?
        <div><h2>No Record</h2></div>
        :    
        todos.map((todo) => (
          <div key={todo.id} className="task" >
            <div className="checkbox" >
              {todo.done===true ?
                <BsFillCircleFill className='icon' > </BsFillCircleFill>
                :
                <BsCircleFill className='icon' onClick = {()=>handleEdit(todo._id)} />

              }
                <p className={todo.done ? "line_through" : ""} >{todo.task}</p>
            </div>

            <div className="checkbox" >
               <span> <BsFillTrashFill className='icon'
                  onClick={()=>handleDelete(todo._id)} / > </span>
                
            </div>

          </div>
        ))
        }
    </div>
  )
}

export default Home