import React, { useState, useEffect } from "react";
import Input from "./Input";
import Show from "./Show";
import axios from "axios"
import { v4 as uuid } from 'uuid';
import style from './todo.module.css';
import PostTodo, { DeleteTodo, UpdateStatus } from '../api/allrequest';
import pagination from './page';

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalPage, setTotalPage] = useState([]);
  const [recentPage, setRecentPage] = useState(1);
  useEffect(() => {
    const handleGetApi = async () => {
      axios.get(`http://localhost:3000/todo?_page=${recentPage}&_limit=3`)
        .then(
          res => {
            const page = pagination(res.headers["x-total-count"]);
            setTotalPage(page);
            setTodo(res.data);
          }
        )
    }
    handleGetApi();
  }, [loader, recentPage]);
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
            setLoader(false);
          })
        break;
      }

    }
  }
  const handleDelete = (id) => {
    setLoader(true)
    DeleteTodo(id).then((res) => {
      setLoader(false)
    })
    // setTodo(todo.filter((item)=>item.id!==id))
  }

  const handlePage = (e) => {
    setRecentPage(e.target.value);
  }
  return (
    <>
      <Input key={uuid()} onTaskCreate={handleTaskCreate} />
      {

        loader ? <div>Loading....</div> : todo.map((item) => (
          <>
            <Show key={item.id} handleDelete={handleDelete} handleToggle={handleToggle} id={item.id} title={item.title} status={item.status} />

          </>
        ))
      }
      <h5>Page {recentPage}</h5>
      <div className={style.pagination}>
        {totalPage.map(page =>
          <button key={uuid()} value={page} onClick={handlePage}>{page}</button>
        )}
      </div>
    </>
  );
};

export default Todo;