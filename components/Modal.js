import Form from "components/Form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delLoading, delModal, setLoading, setModal } from "redux/utils";
import { delTodo, setTodo, updateTodo } from "redux/todo";
import axios from "axios";

const BASE_URL = process.env.BASE_URL + "/";

const Modal = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const { utils } = useSelector((state) => state);
  const [date, setdate] = useState(new Date());
  const [error, seterror] = useState("");
  const [_delete, _setdelete] = useState(false);

  const deleteTodo = async () => {
    dispatch(setLoading());
    try {
      const response = await axios.delete(BASE_URL + utils.payload._id);
      if (response.data) {
        dispatch(delTodo(utils.payload._id));
        dispatch(delModal());
      }
    } catch (error) {
      seterror(error.response.data);
    }
    dispatch(delLoading());
  };

  const patchTodo = async () => {
    dispatch(setLoading());
    try {
      const payload = {
        content,
        date: date.toISOString(),
        _id: utils.payload._id,
        status: utils.payload.status,
      };
      const response = await axios.patch(BASE_URL, payload);
      if (response.data) {
        dispatch(updateTodo({ ...utils.payload, ...payload }));
        dispatch(delModal());
      }
    } catch (error) {
      seterror(error.response.data);
    }
    dispatch(delLoading());
  };

  const postTodo = async () => {
    dispatch(setLoading());
    try {
      const payload = { content, date: date.toISOString() };
      const response = await axios.post(BASE_URL, payload);
      if (response.data) {
        dispatch(setTodo({ ...payload, _id: response.data }));
        dispatch(delModal());
      }
    } catch (error) {
      seterror(error.response.data);
    }
    dispatch(delLoading());
  };

  const handleUpdate = () => {
    if (utils.payload) patchTodo();
    else postTodo();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  const listener = (event) => {
    if (event.target.className === "modal__container") dispatch(delModal());
    else if (event.key === "Escape") dispatch(delModal());
  };

  useEffect(() => {
    document.addEventListener("keyup", listener);
    return () => document.removeEventListener("keyup", listener);
  }, []);

  useEffect(() => {
    if (utils.payload) {
      const { content, date } = utils.payload;
      setContent(content);
      setdate(new Date(date));
    }
  }, []);

  return (
    <div className="modal__container" onClick={listener}>
      <Form
        title={utils.payload ? "Upadte Todo" : "Create Todo"}
        onSubmit={onSubmit}
        error={error}
      >
        <label>Content</label>
        <div>
          <input
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <label>Date</label>
        <div>
          <DatePicker selected={date} onChange={(date) => setdate(date)} />
        </div>
        <div className="button__grid">
          {utils.payload && (
            <button className="button__danger" onClick={deleteTodo}>
              Delete
            </button>
          )}
          <button className="button__secondary" onClick={handleUpdate}>
            {utils.payload ? "Update" : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Modal;
