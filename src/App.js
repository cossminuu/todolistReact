import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [current, setCurrent] = useState("");
  const [filter, setFilter] = useState(" ");

  // CURRENT DATE(day, month, year)
  let date = new Date().getDate();
  let month = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let year = new Date().getFullYear();

  //save todo in local storage
  function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodo() {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }
  useEffect(loadTodo, []);
  useEffect(saveTodo, [todos]); //quando [todos] cambia vera eseguita la function save Todo

  //save todo in local storage

  //user input
  const handleChange = function(e) {
    setCurrent(e.target.value);
  };

  //add value to list on click
  const handleClick = function() {
    if (current !== "") {
      setTodos([
        {
          text: current,
          completed: false
        },
        ...todos
      ]);
    }
    setCurrent("");
  };

  //add value to list on keyPress
  const handleKeyUp = function(e) {
    if (current !== "" && e.key === "Enter") {
      setTodos([
        {
          text: current,
          completed: false
        },
        ...todos
      ]);
      setCurrent("");
    }
  };

  const handleToggle = function(index) {
    setTodos([
      ...todos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    ]);
  };

  //delete Todo
  const handleDelete = function(index) {
    setTodos(todos.filter((_, i) => i !== index));
  };

  //delete all the completed Todo
  // const removeCompleted = function() {
  //   setTodos(todos.filter(todo => !todo.completed));
  // };
  //filter Todo completed
  const completed = todos.filter(todo => todo.completed).length;

  return (
    <div className="App">
      <div className="todolist">
        <div className="todolist__main">
          <h1 className="alltodo">
            {filter}
            ToDo List
          </h1>
          <div className="filterA">
            <div className="filterB" onClick={() => setFilter("All ")}>
              <span> All </span>
            </div>
            <div className="filterB" onClick={() => setFilter("Active ")}>
              <span> Active </span>
            </div>
            <div className="filterB" onClick={() => setFilter("Completed ")}>
              <span> Completed </span>
            </div>
          </div>
          <div className="todolist__header">
            <div className="todolist__header--date">
              <span className="date--day"> {date} </span>
              <div className="warpper">
                <span className="date--month">{months[month.getMonth()]}</span>
                <span className="date--year"> {year} </span>
              </div>
              <button className="add__circle">
                <i className="fa fa-plus-circle" onClick={handleClick}></i>
              </button>
            </div>

            <input
              className="add__input"
              type="text"
              value={current}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              placeholder="Press 'Enter' to add your task.. "
            />
          </div>
          <div className="todolist__result">
            <ul className="result__list">
              {todos
                .filter(todo => {
                  if (filter === "Completed ") return todo.completed;
                  else if (filter === "Active ") return !todo.completed;
                  return true;
                })
                .map((todo, i) => (
                  <li key={i} className="list__task" id="task-0">
                    <i
                      className={
                        todo.completed
                          ? "list__task--check fa fa-check-circle list-checked"
                          : "list__task--check fa fa-check-circle"
                      }
                      checked={todo.completed}
                      onClick={() => handleToggle(i)}
                    ></i>
                    <div className="list__task--text"> {todo.text}</div>
                    <i
                      className="fa fa-trash list__task--del"
                      onClick={() => handleDelete(i)}
                    ></i>
                  </li>
                ))}
            </ul>
          </div>
          <div className="allTasks">
            <div className="all">
              All: <span> {todos.length} </span>
            </div>
            <div className="active">
              Active: <span> {todos.length - completed} </span>
            </div>
            <div className="completed">
              Completed: <span> {completed} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
