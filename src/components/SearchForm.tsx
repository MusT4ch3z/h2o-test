import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { usersDataActions } from "../store/usersData.slice";
import EditModeButton from "./EditModeButton";
import { values } from "lodash";
import Typography from "@mui/material/Typography";

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((state) => state.usersData.usersData);
  const { setSearchValue } = usersDataActions;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const searchValue = data.get("userSearch");
    try {
      dispatch(setSearchValue(searchValue as string));
    } catch (e) {
      console.log(e);
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchValue(null));
  };

  return (
    <Box
      component="form"
      sx={{
        margin: "25px 0px 10px 0px",
        padding: "20px",
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "30px",
      }}
      onSubmit={handleSubmit}
    >
      <Box
        component="div"
        sx={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <Typography
          variant="h5"
          color="primary"
          fontWeight={600}
          marginLeft="10%"
        >
          {values(usersData).length}
        </Typography>
        <Typography>контактов</Typography>
      </Box>

      <FormControl sx={{ marginLeft: "3%", width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search">
          Search by Name
        </InputLabel>
        <OutlinedInput
          defaultValue="Ervin Howell"
          id="userSearch"
          type="search"
          name="userSearch"
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="search button" edge="start" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search by Name"
        />
      </FormControl>

      {/* <TextField
        type="search"
        id="userSearch"
        name="userSearch"
        label="Search User by Name"
        defaultValue="Ervin Howell"
      /> */}
      {/* <IconButton color="primary" type="submit" sx={{ margin: "1px 0.7rem" }}>
        <SearchIcon fontSize="medium" color="action" />
      </IconButton>
      <IconButton
        color="primary"
        type="reset"
        onClick={handleClearSearch}
        sx={{ margin: "1px 0.7rem" }}
      >
        <ClearIcon fontSize="large" color="action" />
      </IconButton> */}
      <EditModeButton />
    </Box>
  );
};

export default SearchForm;
