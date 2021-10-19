import Triangle from "./triangle";
const Bubble = (props) => {
  var className = props.className;
  return (
    <div className={className} style={{ backgroundColor: props.color }}>
      <div style={{ marginBottom: "20%" }}>
        <div style={{ fontSize: "10px", float: "right" }}>
          <div> Room: {props.user.roomname}</div>
          @: {props.user.time}
        </div>
        <div style={{ float: "left", fontWeight: "bolder" }}>
          {props.user.from}:<div></div>
        </div>
      </div>
      <br />
      <span style={{ fontWeight: "bold" }}> {props.user.text}</span>
      <br />
      <Triangle color={props.user.colour} alignTriangle={props.alignTriangle} />
    </div>
  );
};
export default Bubble;
