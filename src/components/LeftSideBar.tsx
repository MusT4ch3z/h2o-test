import { IconButton } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/logo.png";
import Box from "@mui/material/Box";
import { styles } from "../styles";

const LeftSideBar = () => {
  return (
    <Box sx={{ position: "absolute", width: "60px" }} color="transparent">
      <img src={logo} alt="Logo" style={{ height: "40px", margin: "10px" }} />
      <Box component="div" sx={styles.leftSideBarBox}>
        <IconButton sx={styles.leftSideBarButtons}>
          <PeopleAltIcon fontSize="large" />
        </IconButton>
        <IconButton sx={styles.leftSideBarButtons}>
          <CalendarMonthIcon fontSize="large" />
        </IconButton>
        <IconButton sx={styles.leftSideBarButtons}>
          <SettingsIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
