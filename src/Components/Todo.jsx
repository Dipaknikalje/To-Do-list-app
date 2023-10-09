import React, {useState} from 'react'
import './todo.css'
import SaveTask from './SaveTask';
import {FaCircle, FaTrash} from 'react-icons/fa'
const Todo = () => {
    const [task,setTask]=useState()
   
    const[taskTodo,setTaskTodo]=SaveTask("tasks",[]);

    //**handling the user input**
    const handleTask=(e)=>{
        e.preventDefault();
        setTask(e.target.value);
    }


    //**for creating task to perform**
    const createTodoTask=()=>{
           
        if(!task){

        }
        else{
            const taskObject={
                completed:false,
                Task:task
            }
            setTaskTodo((index)=>[...index,taskObject])
            setTask("")
        }
       
    }

       //**on key press */
       const handleKeyreturn = (e) => {
        if (e.key === "Enter") {
        createTodoTask();
        }
    };


// **to delete the task which is not required**

    const deleteItemHandle=(id)=>{
        const UpdatedItem=taskTodo.filter((elem,ind)=>{
            return ind !== id;
        })
        setTaskTodo(UpdatedItem)
        console.log(UpdatedItem)
    }
    const markTodoComplete = (id) => {
        console.log(id,"mark to complete")
        const updatedTask=taskTodo.map((elem,ind)=>{
            console.log(ind,"this is ind")
            console.log(elem,"complete elem")
            if(ind===id){
                return {...elem, completed:true}
            }
            return elem;
            
        })
        const CompletedTask=[
            ...updatedTask.filter((taskTodo) => taskTodo.completed).reverse(),
            ...updatedTask.filter((taskTodo) => !taskTodo.completed)
        ]
       setTaskTodo(CompletedTask)
      };

    //**to reset task list **

    const handleReset=()=>{
        localStorage.clear();
        window.location.reload()
    }
 

  return (
    <>
      <div className='todo-list'>
       <header>
          <div>
              <h1>TODO APP LIST</h1>
          </div>
          <button id="reset-btn" onClick={handleReset}>Reset</button>
      </header>
        <div className='enter-task'>
            <div className='input-btn'>
                <input type="text" 
                placeholder='Enter the task' 
                value={task} 
                onChange={handleTask}
                onKeyPress={handleKeyreturn}
                maxLength={50}  />
                <button onClick={createTodoTask}>Submit</button>
            </div>
        </div>
        <div className='tasks'>
            <div className='pending-task'>
                <div className='pending-task-heading'>
                <h2>Task To do</h2>
                </div>
                <hr/>
                <div classname="list-todo">
                {taskTodo.map((post,index)=>{
                if(post.completed===false){
                        return(
                            <div className='pending' key={index} onClick={()=>markTodoComplete(index)}>
                            <FaCircle id="circle"/>
                            <h3>{post.Task}</h3>
                            </div>
                        )
                    }
                    return null;
                    })}
                </div>
            </div>
            <div className='completed-task'>
            <div className='pending-task-heading'>
                <h2>Completed Task</h2>
                </div>
                <hr/>
               <div className='completed'>
               {taskTodo.map((post,index)=>{
                if(post.completed===true){
                  return (
                      <div className='task-done' key={index}>
                         <div className='btns'>
                            <FaTrash className='trash' onClick={()=>deleteItemHandle(index)}/>
                            </div>
                        <h3>{post.Task}</h3>
                       
                      </div>
                         );
                }
                  return null;
})}
               </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
