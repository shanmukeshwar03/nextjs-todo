const Todo = (props) => {
  return (
    <div className={props.todo.status ? 'filled' : 'unfilled'}>
      <div
        onClick={() => props.update(props.todo._id, props.todo.status)}
      ></div>
      <span>{props.todo.description}</span>
      <button onClick={() => props.handleClick(props.todo)}>...</button>
    </div>
  )
}
export default Todo
