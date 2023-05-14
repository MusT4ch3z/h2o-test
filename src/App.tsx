import { Box, CssBaseline, createTheme } from "@mui/material";
import LeftSideBar from "./components/LeftSideBar";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: "linear-gradient(180deg, #54d3c2 30%, #30898a 90%)",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            marginRight: "2px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "#f8f8f8",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              "-webkitBoxShadow": "0 0 0 100px #f8f8f8 inset",
            },
            backgroundColor: "#f8f8f8",
            "::placeholder": { color: grey[500] },
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#54d3c2",
      },
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LeftSideBar />
        <Box
          sx={{
            ml: "60px",
            backgroundColor: "#fff",
            borderTopLeftRadius: "50px",
          }}
        >
          <Navbar />
          <Main />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
