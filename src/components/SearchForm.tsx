import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "../hooks/redux";
import { usersDataActions } from "../store/usersData.slice";

const SearchForm = () => {
  const dispatch = useAppDispatch();
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
      sx={{ margin: "25px 15px 10px 10px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="userSearch"
        name="userSearch"
        label="Search User by Name"
        defaultValue="Ervin Howell"
      />
      <IconButton color="primary" type="submit" sx={{ margin: "1px 0.7rem" }}>
        <SearchIcon fontSize="large" color="action" />
      </IconButton>
      <IconButton
        color="primary"
        type="reset"
        onClick={handleClearSearch}
        sx={{ margin: "1px 0.7rem" }}
      >
        <ClearIcon fontSize="large" color="action" />
      </IconButton>
    </Box>
  );
};

export default SearchForm;
