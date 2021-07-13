const Form = (props) => {
  return (
    <form className='form__container' onSubmit={props.onSubmit}>
      {props.error && <span>{props.error}</span>}
      <h1>{props.title}</h1>
      {props.children}
    </form>
  )
}
export default Form
