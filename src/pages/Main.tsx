import UsersTable from "../components/Table/UsersTable";
import SearchForm from "../components/SearchForm";
import { Box, Typography } from "@mui/material";
import { styles } from "../styles";

const Main = () => {
  return (
    <Box component="div" paddingTop="1%" sx={styles.mainSubsection}>
      <Typography variant="h5" fontWeight={600}>
        Общая база сотрудников
      </Typography>
      <SearchForm />
      <UsersTable />
    </Box>
  );
};

export default Main;
