import { Box, CssBaseline } from "@mui/material";
import LeftSideDrawer from "./components/LeftSideDrawer";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";

function App() {
  return (
    <div className="app">
      <CssBaseline />
      <LeftSideDrawer />
      <Box sx={{ ml: "60px" }}>
        <Navbar />
        <Main />
      </Box>
    </div>
  );
}

export default App;
