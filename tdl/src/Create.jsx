import { useState } from "react";
import axios from 'axios';

function Create() {

    const [task, setTask] = useState()
    
    const handleAdd = async () => {
        try {
          await axios.post('http://localhost:3001/add', { task: task });
          const updatedTodos = await axios.get('http://localhost:3001/get');
          setTodos(updatedTodos.data);
        } catch (err) {
          console.log(err);
        }
        setTask("");
      };
      
      

    return (
    <div className="create-form" >
        <input type="text" placeholder="Enter task..." onChange={(e)=> setTask(e.target.value)} />
        <button onClick={handleAdd} >Add</button>
    </div>
  )
}

export default Create