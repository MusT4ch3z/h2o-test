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
import { styles } from "../styles";

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
    <Box component="form" sx={styles.searchFormBox} onSubmit={handleSubmit}>
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
          name="userSearch"
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="search button" edge="start" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" type="reset" onClick={handleClearSearch}>
                <ClearIcon color="action" />
              </IconButton>
            </InputAdornment>
          }
          label="Search by Name"
        />
      </FormControl>

      <EditModeButton />
    </Box>
  );
};

export default SearchForm;
