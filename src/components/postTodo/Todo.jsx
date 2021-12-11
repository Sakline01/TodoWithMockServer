import React, { useState,useEffect } from "react";
import Input from "./Input";
import Show from "./Show";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
// import Showcomplete from "./ShowComplete";
const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  // const [complete, setComplete]=useState([]);
  useEffect(() => {
    const handleApi=async ()=>{
      
      if (title) {
        const payload = {
          title: title,
          status: false,
          id: uuidv4
        };
        axios.post("http://localhost:3000/todo",payload)
        .then(response=>{
          setTodo(t=>([...t, response.data]));
        })
      }
  
    }
    handleApi();
  }, [title]);
  useEffect(() => {
    const handleGetApi= async ()=>{
      axios.get("http://localhost:3000/todo")
      .then(
        res=>{
          console.log("get",res);
          setTodo(res.data);
        }
      )
    }
    handleGetApi();
  }, []);
  const handleTaskCreate = (title) => {
    setTitle(title);
  };
  const handleToggle=(id)=>{
    // const updatedTodo= todo.map((item)=>(
    //     item.id===id?{...item,status:!item.status}:item
    // ));
    // setTodo(updatedTodo);
    console.log("handletoggle")
  }
  const handleDelete=(id)=>{
      // setTodo(todo.filter((item)=>item.id!==id))
      console.log("handledelete",uuidv4())
  }
  const handleComplete=(id)=>{
    // setComplete(...complete,todo.filter((item)=>item.id===id))
    // setTodo(todo.filter((item)=>item.id!==id))
    // console.log(complete)
    console.log("handlecomplete")
    }
  return (
    <>
      <Input key={uuidv4()} onTaskCreate={handleTaskCreate} />
      {todo.map((item) => (
        <>
        <Show key={item.id} handleComplete={handleComplete} handleDelete={handleDelete} handleToggle={handleToggle} id={item.id} title={item.title} status={item.status} />
        </>
      ))}
      {/* <Showcomplete key={item.id} id={item.id} title={item.title} status={item.status}/> */}
    </>
  );
};

export default Todo;