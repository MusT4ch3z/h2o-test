import UsersTable from "../components/Table/UsersTable";
import SearchForm from "../components/SearchForm";
import { Box, Typography } from "@mui/material";

const Main = () => {
  return (
    <Box
      component="div"
      paddingTop="1%"
      height="100%"
      sx={{
        backgroundColor: "#f8f8f8",
        borderTopLeftRadius: "50px",
        paddingLeft: "2%",
        paddingRight: "2%",
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Общая база сотрудников
      </Typography>
      <SearchForm />
      <UsersTable />
    </Box>
  );
};

export default Main;
