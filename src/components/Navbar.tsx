import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const navLinksArray = ["Общая база сотрудников", "Navlink2", "Navlink3"];
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {navLinksArray.map((i) => (
            <Button key={i} sx={{ color: "white", display: "block" }}>
              <Typography variant="h6">{i}</Typography>
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
