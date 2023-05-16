import { Box, CssBaseline, createTheme } from "@mui/material";
import LeftSideBar from "./components/LeftSideBar";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

function App() {
  const paletteMainColor = "#54d3c2";
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: `linear-gradient(180deg, ${paletteMainColor} 30%, #30898a 90%)`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          // root: {
          //   ":hover": {
          //     color: paletteMainColor,
          //     backgroundColor: "transparent",
          //   },
          // },
          page: { fontWeight: "700" },
          selected: {
            backgroundColor: "transparent",
            color: paletteMainColor,
          },
          // focusVisible: {
          //   backgroundColor: "transparent",
          //   color: paletteMainColor,
          // },
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
              boxShadow: "0 0 0 100px #f8f8f8 inset",
            },
            backgroundColor: "#f8f8f8",
            "::placeholder": { color: grey[500] },
          },
        },
      },
    },
    palette: {
      primary: {
        main: paletteMainColor,
      },
    },
  });

  return (
    <Box className="app" sx={{ height: "100%" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LeftSideBar />
        <Box
          sx={{
            ml: "60px",
            backgroundColor: "#fff",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            height: "100%",
          }}
        >
          <Navbar />
          <Main />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
