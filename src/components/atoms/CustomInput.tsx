const CustomInput = ({ ...props }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{props.name}</label>
      <input className="form-control" {...props} />
    </div>
  );
};

export default CustomInput;
