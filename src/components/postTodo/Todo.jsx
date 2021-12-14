import React, { useState, useEffect } from "react";
import Input from "./Input";
import Show from "./Show";
import axios from "axios"
import { v4 as uuid } from 'uuid';
import PostTodo, { DeleteTodo, UpdateStatus } from '../api/allrequest';

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const handleGetApi = async () => {
      axios.get("http://localhost:3000/todo")
        .then(
          res => {
            console.log("get", res);
            setTodo(res.data);
          }
        )
    }
    handleGetApi();
  }, [loader]);
  const handleTaskCreate = (title) => {
    if (title) {
      const payLoad = {
        title,
        status: false,
        id: uuid()
      }
      setLoader(true)
      PostTodo(payLoad)
        .then((res) => {
          console.table(res);

          // GetTodo()
          //   .then((res) => {
          //     console.log(res);
          //     setTodo(res.data);
          //     setLoader(false)

          //   })
          setLoader(false);
        })
    }
  };
  const handleToggle = (id) => {
    for (let status of todo) {
      if (status.id === id) {
        setLoader(true)
        UpdateStatus(id, !status.status)
          .then((res) => {
            console.log(res)
            // GetTodo()
            //   .then((res) => {

            //     setTodo(res.data)
            //     setLoader(false)
            //   })
            setLoader(false);
          })
        break;
      }

      //    console.log(status.status)
    }
    console.log("handletoggle")
  }
  const handleDelete = (id) => {
    setLoader(true)
    DeleteTodo(id).then((res) => {
      //    console.log(res);
      // GetTodo()
      //   .then((res) => {
      //     console.log(res);
      //     setTodo(res.data);
      //     setLoader(false)

      //   })
      setLoader(false)
    })
    // setTodo(todo.filter((item)=>item.id!==id))
    console.log("handledelete", uuid())
  }
  const handleComplete = (id) => {
    // setComplete(...complete,todo.filter((item)=>item.id===id))
    // setTodo(todo.filter((item)=>item.id!==id))
    // console.log(complete)
    console.log("handlecomplete")
  }
  return (
    <>
      <Input key={uuid()} onTaskCreate={handleTaskCreate} />
      {

        loader ? <div>Loading....</div> : todo.map((item) => (
          <>
            <Show key={item.id} handleComplete={handleComplete} handleDelete={handleDelete} handleToggle={handleToggle} id={item.id} title={item.title} status={item.status} />
          </>
        ))}
      {/* <Showcomplete key={item.id} id={item.id} title={item.title} status={item.status}/> */}
    </>
  );
};

export default Todo;