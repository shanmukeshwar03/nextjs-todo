import Modal from "components/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initTodo, updateStatus, updateTodo } from "redux/todo";
import { delLoading, setLoading, setModal, setPayload } from "redux/utils";
import Todo from "components/Todo";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const Dashboard = () => {
  const { auth, utils, todo } = useSelector((state) => state);
  const [pending, setPending] = useState([]);
  const [today, setToday] = useState([]);
  const [later, setLater] = useState([]);
  const date = new Date().toLocaleDateString();

  const dispatch = useDispatch();

  const getTodosFromServer = async () => {
    dispatch(setLoading());

    try {
      const response = await axios.get(BASE_URL);
      if (response.data) dispatch(initTodo(response.data));
    } catch (error) {
      console.log(error.response.data);
    }

    dispatch(delLoading());
  };

  useEffect(() => getTodosFromServer(), []);
  useEffect(() => filterTodos(), [todo.todos]);

  const handleClick = (paylaod) => {
    dispatch(setPayload(paylaod));
    dispatch(setModal());
  };

  const filterTodos = () => {
    const restTodos = todo.todos.filter(
      (t) => new Date(t.date).toLocaleDateString() !== date
    );
    setToday(
      todo.todos.filter((t) => new Date(t.date).toLocaleDateString() === date)
    );
    setPending(
      restTodos.filter((t) => new Date(t.date).getTime() < new Date().getTime())
    );
    setLater(
      restTodos.filter((t) => new Date(t.date).getTime() > new Date().getTime())
    );
  };

  const handleUpdate = async (_id) => {
    try {
      const response = await axios.patch(BASE_URL + "/" + _id);
      if (response.data) dispatch(updateStatus(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {utils.modal && <Modal />}
      <div className="dashboard__container">
        {pending.length > 0 && (
          <h2 className="todo__header pending">Pending</h2>
        )}
        {pending.map((t, i) => (
          <Todo
            todo={t}
            key={i}
            handleClick={handleClick}
            update={handleUpdate}
          />
        ))}
        {today.length > 0 && <h2 className="todo__header today">Today</h2>}
        {today.map((t, i) => (
          <Todo
            todo={t}
            key={i}
            handleClick={handleClick}
            update={handleUpdate}
          />
        ))}
        {later.length > 0 && (
          <h2 className="todo__header upcoming">Upcoming</h2>
        )}
        {later.map((t, i) => (
          <Todo
            todo={t}
            key={i}
            handleClick={handleClick}
            update={handleUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
