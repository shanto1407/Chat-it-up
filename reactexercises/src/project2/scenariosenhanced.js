import { useReducer, useEffect, useState } from "react";
import io from "socket.io-client";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TopBar from "./topbar";
import logo from "./img/logo.png";
import MsgList from "./massageBubble";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PersonIcon from "@material-ui/icons/Person";
import "../App.css";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import theme from "../theme";
const Scenario1Test = () => {
  const initialState = {
    messages: [],
    status: "",
    showjoinfields: true,
    alreadyexists: false,
    chatName: "",
    roomName: "",
    typingMsg: "",
    isTyping: false,
    message: "",
    //TopBar
    looged_in: false,
    //datas
    showimg: true,
    roomList: [],
    userList: [],
    showCardMessage: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const serverConnect = () => {
    // connect to server
    //const socket = io.connect("localhost:5000", { forceNew: true });
    const socket = io();
    socket.on("nameexists", onExists);
    socket.on("welcome", addMessageFirst);
    socket.on("someonejoined", addMessage);
    socket.on("someoneleft", addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    socket.on("tooall", onToAll);
    socket.on("roomlist", onReceiveRoomList);
    setState({ socket: socket });
  };
  const onReceiveRoomList = (dataFromServer) => {
    setState({ roomList: dataFromServer.roomdetails });
  };
  const onExists = (dataFromServer) => {
    setState({ status: dataFromServer.text });
  };

  const onTyping = (dataFromServer) => {
    if (dataFromServer.from !== state.chatName) {
      setState({
        typingMsg: dataFromServer.text,
      });
    }
  };
  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.chatName }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };
  // generic handler for all other messages:
  const addMessageFirst = (dataFromServer) => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({
      messages: messages,
      users: dataFromServer.users,
      showjoinfields: false,
      alreadyexists: false,
      looged_in: true,
      showCardMessage: true,
      showimg: false,
    });
  };
  // generic handler for all other messages:
  const addMessage = (dataFromServer) => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({
      messages: messages,
      users: dataFromServer.users,
      showjoinfields: false,
      alreadyexists: false,
    });
  };
  const onToAll = (dataFromServer) => {
    setState({ userList: dataFromServer.roomdetails });
  };
  const onNewMessage = (dataFromServer) => {
    addMessage(dataFromServer);
    setState({ typingMsg: "" });
  };
  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: state.chatName, text: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };
  // handler for join button click
  const handleJoin = () => {
    state.socket.emit("join", {
      chatName: state.chatName,
      roomName: state.roomName,
    });
  };
  // handler for name TextField entry
  const onNameChange = (e) => {
    setState({ chatName: e.target.value, status: "" });
  };
  // handler for room TextField entry
  const onRoomChange = (e) => {
    setState({ roomName: e.target.value });
  };
  const handleSelected = (e) => {
    setState({
      roomName: e.target.value,
    });
  };
  //For TopBAR
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <TopBar viewDialog={handleOpenDialog} showIcon={state.looged_in} />
        <Dialog open={open} onClose={handleCloseDialog} style={{ margin: 20 }}>
          <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
          <DialogContent>
            <Table>
              <TableBody>
                {state.userList.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{ width: "25%" }}>
                      <IconButton
                        style={{ color: row.color, marginTop: "15%" }}
                      >
                        <PersonIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: "100%",
                      }}
                    >
                      <DialogContent>
                        {row.name} is in room {row.room}
                      </DialogContent>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
      {state.showimg === true && (
        <div style={{ marginTop: "20%", marginBottom: "10%" }}>
          <img
            src={logo}
            alt="Chat LOGO"
            style={{
              height: "20%",
              width: "20%",
              justifyContent: "center",
              marginTop: "2%",
              marginLeft: "40%",
              position: "inherit",
            }}
          />
        </div>
      )}
      {state.showjoinfields && (
        <div>
          <div
            style={{
              border: "solid",
              padding: "3vw",
              margin: "2vw",
              borderColor: "rgba(246, 93, 10, 1)",
              position: "relative",
            }}
          >
            <TextField
              onChange={onNameChange}
              label="Chat Name"
              variant="outlined"
              autoFocus={true}
              required
              value={state.chatName}
              error={state.status !== ""}
              helperText={state.status}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              border: "solid",
              padding: "3vw",
              margin: "2vw",
              borderColor: "rgba(246, 93, 10, 1)",
            }}
          >
            <div
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "rgba(246, 93, 10, 1)",
                marginBottom: "5%",
              }}
            >
              Join Existing or Create Room to Join
            </div>
            <div>
              {state.roomList.map((value) => (
                <span key={value}>
                  {value}{" "}
                  <input
                    label="Primary"
                    type="radio"
                    name="Radio"
                    checked={state.roomName === value}
                    value={value}
                    onChange={handleSelected}
                  />
                </span>
              ))}
            </div>
            <TextField
              onChange={onRoomChange}
              label="Create Room"
              variant="outlined"
              required
              value={state.roomName}
              style={{ width: "100%", marginTop: "5%" }}
            />
            <p></p>
          </div>
          <div
            style={{
              padding: "5vw",
              margin: "1vw",
              borderColor: "rgba(246, 93, 10, 1)",
            }}
          >
            <Button
              variant="contained"
              data-testid="submit"
              color="primary"
              style={{
                width: "100%",
                padding: "3vw",
              }}
              onClick={() => handleJoin()}
              disabled={state.chatName === "" || state.roomName === ""}
            >
              Join
            </Button>
          </div>
        </div>
      )}

      {state.showCardMessage === true && (
        <Card style={{ marginTop: "20%", marginBottom: "25%" }}>
          <CardContent>
            <div
              className="usersList"
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                top: "20%",
              }}
            >
              {state.messages.map((message, index) => (
                <MsgList msg={message} key={index} chatName={state.chatName} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {state.showCardMessage === true && (
        <Card
          style={{
            position: "fixed",
            bottom: "0",
            right: "2%",
            left: "2%",
          }}
        >
          <CardContent>
            {!state.showjoinfields && (
              <TextField
                onChange={onMessageChange}
                placeholder="type message here"
                helperText={state.typingMsg}
                autoFocus={true}
                value={state.message}
                onKeyPress={(e) =>
                  e.key === "Enter" ? handleSendMessage() : null
                }
                color="primary"
              />
            )}
          </CardContent>
        </Card>
      )}
    </MuiThemeProvider>
  );
};
export default Scenario1Test;
