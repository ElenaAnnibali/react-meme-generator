const Button = (props) => {
  return (
    <div>
      <button onClick={props.click}>{props.children}</button>
    </div>
  );
};

export default Button;
