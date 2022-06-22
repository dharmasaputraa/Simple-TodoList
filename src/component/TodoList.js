import React, { useState } from "react";

function TestingTodo() {
  const [activity, setActivity] = useState("");
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage("Nama aktivitas jangan kosong");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
      },
    ]);
    setActivity("");
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);

    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id === todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <div className="todoApp">
      <h1>Todo List</h1>
      <div className="todoForm">
        <form onSubmit={saveTodoHandler}>
          <input
            className="todoForm-input"
            type="text"
            placeholder="Nama Aktivitas"
            value={activity}
            onChange={function (event) {
              setActivity(event.target.value);
            }}
          />
          <button type="submit" className="todoForm-submit">
            {edit.id ? "Ubah" : "Tambah"}
          </button>
          {edit.id && (
            <button className="todoForm-submit" onClick={cancelEditHandler}>
              Batal
            </button>
          )}
        </form>
        {message && <p className="alertText">{message}</p>}
      </div>
      <div className="todo-list">
        {todos.length > 0 ? (
          <ul>
            {todos.map(function (todo) {
              return (
                <li key={todo.id}>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      // checked={todo.done}
                      onChange={doneTodoHandler.bind(this, todo)}
                    />
                  </div>
                  {todo.activity} {todo.done ? "(done)" : ""}
                  <div className="buttonList">
                    <button
                      className="todoForm-edit"
                      onClick={editTodoHandler.bind(this, todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="todoForm-edit"
                      onClick={removeTodoHandler.bind(this, todo.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="alertText">Tidak ada todo</p>
        )}
      </div>
    </div>
  );
}

export default TestingTodo;
