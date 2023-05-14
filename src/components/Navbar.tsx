import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { findIndex } from "lodash";
import AvatarCard from "./AvatarCard";

const Navbar = () => {
  const theme = useTheme();
  const navLinksArray = ["Общая база сотрудников", "Navlink2", "Navlink3"];
  const [activeNavLink, setActiveNavLink] = useState<string>(navLinksArray[0]);

  const onChangeActiveNavLink = (key: string) => {
    let activeNLIndex = findIndex(navLinksArray, (i) => i === activeNavLink);
    switch (key) {
      case "next":
        if (activeNLIndex < navLinksArray.length - 1) {
          activeNLIndex++;
          setActiveNavLink(navLinksArray[activeNLIndex]);
        } else {
          activeNLIndex = 0;
          setActiveNavLink(navLinksArray[activeNLIndex]);
        }
        break;
      case "prev":
        if (activeNLIndex > 0) {
          activeNLIndex--;
          setActiveNavLink(navLinksArray[activeNLIndex]);
        } else {
          activeNLIndex = navLinksArray.length - 1;
          setActiveNavLink(navLinksArray[activeNLIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          borderTopLeftRadius: "50px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ padding: "4px" }}
            onClick={() => onChangeActiveNavLink("prev")}
          >
            <ArrowLeftIcon />
          </IconButton>
          <IconButton
            sx={{ padding: "4px" }}
            onClick={() => onChangeActiveNavLink("next")}
          >
            <ArrowRightIcon />
          </IconButton>
          {navLinksArray.map((i) => (
            <Button
              key={i}
              sx={{
                color: "lightgray",
                display: "block",
                borderBottom:
                  activeNavLink === i
                    ? `${theme.palette.primary.main} 3px solid`
                    : "lightgray 1px solid",
                borderRadius: "0",
                transition: "all",
                transitionDuration: "100ms",
              }}
              onClick={() => setActiveNavLink(i)}
            >
              <Typography
                variant="h6"
                fontSize={16}
                color={
                  activeNavLink === i
                    ? `${theme.palette.text.primary}`
                    : `${theme.palette.text.disabled}`
                }
              >
                {i}
              </Typography>
            </Button>
          ))}
          <AvatarCard />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
