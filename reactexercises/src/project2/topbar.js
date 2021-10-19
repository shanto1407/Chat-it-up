import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
const TopBar = (props) => {
  const onIconClicked = () => props.viewDialog(); // notify the parent
  const showIcon = props.showIcon;
  return (
    <AppBar position="fixed">
      <Toolbar color="primary" title="Sample Toolbar">
        <Typography variant="h6" color="inherit">
          Chat it Up!
        </Typography>
        {showIcon === true && (
          <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
            <IconButton onClick={onIconClicked}>
              <EmojiPeopleIcon
                style={{ color: "white", height: 70, width: 70 }}
              />
            </IconButton>
          </section>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
