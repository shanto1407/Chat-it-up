import { useEffect, useRef } from "react";
import { ListItem } from "@material-ui/core";
import Bubble from "./bubble";
const MassageBubble = (props) => {
  const userRef = useRef(null);
  let msg = props.msg;
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);

  let chatname = props.chatName;
  var className = "left";
  var alignTriangle = "10%";

  if (chatname === props.msg.from) {
    className = "right";
    alignTriangle = "80%";
  }
  return (
    <div>
      <ListItem ref={userRef}>
        <Bubble
          user={msg}
          color={msg.colour}
          className={className}
          alignTriangle={alignTriangle}
        />
      </ListItem>
      <p></p>
    </div>
  );
};
export default MassageBubble;
