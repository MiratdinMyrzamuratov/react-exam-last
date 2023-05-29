import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../API/api";
import { homeTodo } from "../../store/reducers/Home/home.actions";
import "./Home.scss";
const Home = () => {
  const { todos } = useSelector((store) => store.todos);
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(homeTodo());
  }, []);
  console.log(todos);

  useEffect((e) => {
    if (!token) {
      navigate("/login", { replace: true })
    }
  }, [token])



  async function createTask() {
    const dataPost = {
      task: taskInput,
      category_id: 3,
    };

    await axios
      .post(`${baseURL}/tasks`, dataPost, {
        headers: {
          "Content-type": "Application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(homeTodo());
        setTaskInput("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(dataPost);
      });
  }

  function deleteTask(id) {
    axios
      .delete(`${baseURL}/tasks/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(homeTodo());
      });
  }

  function selectTask(item) {
    setId(item.id);
    setUpdate(true);
    const currentTask = todos.find((x) => x.id === id);
    setTaskInput(currentTask.task);
  }

  async function UpdateTask() {
    const data = {
      id: id,
      task: taskInput,
      category_id: 3,
    };

    await axios
      .patch(`${baseURL}/tasks/${id}}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(homeTodo());
        setUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(id);
        console.log(data);
        setTaskInput("");
      });
  }

  function submit(e) {
    e.preventDefault();
    if (update === true) {
      UpdateTask();
    } else if (update === false) {
      createTask();
    }
  }


  async function isDoneFunc(id) {
    const data = todos.find(item => item.id === id)

    await axios.put(`${baseURL}/tasks/${id}`, { is_done: !data.is_done }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        dispatch(homeTodo())
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log(id);
      })
  }

  return (
    <div className="flex h-[90vh] flex-col gap-4 p-8 shadow-md justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container px-[347px] pt-[70px]">
        <div className="flex items-center justify-center gap-3 py-[40px]">
        <h1 className="text-4xl text-white ">to<span className="text-purple-800">do</span></h1>
        </div>
        <form className="w-full flex bg-white rounded-md" onSubmit={submit}>
          <input
            className="w-[90%] bg-gray-100 p-4 outline-none rounded-md"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            type="text"
            placeholder="Add a new task"
          />
          <button
            className={`w-[20%] text-center  cursor-pointer text-white m-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
          >
            {update === true ? "Update" : update === false ? "Add" : ""}
          </button>
        </form>
        <div>
          <h1 className="font-bold flex items-center justify-center">
            Created tasks <span className="bg-cyan-500-500 text-white p-1 text-[12px] rounded-[50%]">{todos.length}</span>
          </h1>
        </div>
        <ul className="h-[450px] overflow-y-auto w-full">
          {todos.map((item) => (
            <li
              className="mb-2 flex justify-between items-center mr-6 bg-gray-200 rounded-md p-4 cursor-pointer"
              key={item.id}
            >
              <span className="flex gap-4 items-center">
                <span onClick={() => isDoneFunc(item.id)}>
                  <i className={`text-xl ${item.is_done === false ? "bx bx-checkbox text-blue-500" : item.is_done === true ? "bx bxs-checkbox-checked text-blue-500" : ""}`}></i>
                </span>
                <span className={`text-xl ${item.is_done === true ? "line-through" : item.is_done === false ? "" : ""}`}>
                  {item.task}
                </span>
              </span>
              <span className="flex gap-2 items-center">
                <button
                  className="bg-red-500 rounded-md p-2 text-white"
                  onClick={() => deleteTask(item.id)}
                >
                  <i class="bx bx-trash"></i>
                </button>
                <button
                  className="bg-green-500 rounded-md p-2 text-white"
                  onClick={() => selectTask(item)}
                >
                  <i class="bx bxs-edit"></i>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
