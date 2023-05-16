import {
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ceil } from "lodash";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { paginationActions } from "../store/pagination.slice";
import { useTheme } from "@mui/material";

const CustomPagination = ({ count, rowsPerPageOptions }: any) => {
  const { page, rowsPerPage } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();
  const { setPage, setRowsPerPage } = paginationActions;
  const theme = useTheme();

  const stylePaginationIcons = {
    ":hover": {
      color: "#54d3c2",
      backgroundColor: "transparent",
    },
    "&.Mui-selected": {
      ":hover": {
        backgroundColor: "transparent",
      },
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  };

  const stylePaginationSelect = {
    "&>.MuiSelect-outlined": {
      fontSize:"14px",
      padding: "5px 28px 5px 10px",
    },
  };

  const handleChangeRowsPerPage = (rowPP: number) => {
    dispatch(setRowsPerPage(rowPP));
  };
  const handleChangePage = (page: number) => {
    dispatch(setPage(page));
  };
  const to = count > page * rowsPerPage ? page * rowsPerPage : count;
  const from = (page - 1) * rowsPerPage + 1;

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography>
        {`показано ${from}–${to} из ${
          count !== -1 ? count : `более чем ${to}`
        } результатов`}
      </Typography>

      <Pagination
        defaultPage={1}
        count={ceil(count / rowsPerPage)}
        onChange={(e, p) => handleChangePage(p)}
        renderItem={(i) => <PaginationItem {...i} sx={stylePaginationIcons} />}
      />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={"10px"}
      >
        <Typography>отображать на странице</Typography>
        <Select
          defaultValue={rowsPerPageOptions[0]}
          autoWidth={true}
          onChange={(e) => handleChangeRowsPerPage(e.target.value)}
          sx={stylePaginationSelect}
        >
          {rowsPerPageOptions.map((opt: number) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default CustomPagination;
