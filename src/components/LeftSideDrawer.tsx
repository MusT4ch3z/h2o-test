import { ListItemButton, ListItemIcon } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/logo.png";
import Box from "@mui/material/Box";

const LeftSideDrawer = () => {
  return (
    <Box sx={{ position: "absolute", width: "60px" }}>
      <img src={logo} alt="Logo" style={{ height: "40px", margin: "10px" }} />
      <ListItemButton>
        <ListItemIcon aria-label="dataBase">
          <PeopleAltIcon fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon aria-label="calendar">
          <CalendarMonthIcon fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon aria-label="settings">
          <SettingsIcon fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );
};

export default LeftSideDrawer;
