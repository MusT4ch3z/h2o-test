import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
} from "@mui/material";
import CustomTableCell from "./CustomTableCell";
import { UserEditingModal } from "./UserEditingModal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUserData } from "../../types";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usersDataActions } from "../../store/usersData.slice";
import { styles } from "../../styles";

const UsersTable = () => {
  const usersData = useAppSelector((state) => state.usersData.usersData);
  const searchValue = useAppSelector((state) => state.usersData.searchValue);
  const [filteredUsersData, setFilteredUsersData] = useState<IUserData[]>(
    Object.values(usersData)
  );
  const dispatch = useAppDispatch();
  const { removeUser } = usersDataActions;
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<IUserData>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [dataToRender, setDataToRender] = useState<IUserData[]>();

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setUserInfo(undefined);
  };

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  useEffect(() => {
    if (!searchValue) {
      setFilteredUsersData(Object.values(usersData));
    } else {
      setFilteredUsersData(
        Object.values(usersData).filter((i) => i.name === searchValue)
      );
    }
  }, [searchValue, usersData]);

  useEffect(
    () =>
      setDataToRender(
        filteredUsersData!.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      ),
    [page, filteredUsersData, rowsPerPage]
  );

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handlePageChange = (p: number) => {
    setPage(p);
  };

  const subColumns = [
    "Name",
    "ID",
    "Username",
    "E-mail",
    "Street",
    "Suite",
    "City",
    "Zipcode",
    "Geo Latitude",
    "Phone",
    "Website",
    "Company Name",
    "Catch Phrase",
    "Service",
    "",
  ];

  return (
    <div>
      {(isModalOpen || userInfo) && (
        <UserEditingModal
          open
          handleClose={handleCloseEditModal}
          user={userInfo}
        />
      )}
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={styles.tableRowHeader}>
                <TableCell />
                <TableCell align="center" colSpan={3}>
                  Общая информация
                </TableCell>
                <TableCell align="center" colSpan={5}>
                  Адрес
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Контакты
                </TableCell>
                <TableCell align="center" colSpan={4}>
                  Компания
                </TableCell>
              </TableRow>
              <TableRow sx={styles.tableRowHeader}>
                {subColumns.map((i) => (
                  <TableCell align="center">{i}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {dataToRender?.map((user: IUserData) => (
                <TableRow key={user.name}>
                  <CustomTableCell data={user.name} />
                  <CustomTableCell data={user.id} />
                  <CustomTableCell data={user.username} />
                  <CustomTableCell data={user.email} />
                  <CustomTableCell data={user.address.street} />
                  <CustomTableCell data={user.address.suite} />
                  <CustomTableCell data={user.address.city} />
                  <CustomTableCell data={user.address.zipcode} />
                  <CustomTableCell data={user.address.geo.lat} />
                  <CustomTableCell data={user.phone} />
                  <CustomTableCell data={user.website} />
                  <CustomTableCell data={user.company.name} />
                  <CustomTableCell data={user.company.catchPhrase} />
                  <CustomTableCell data={user.company.bs} />
                  <TableCell sx={{ padding: "10px" }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setUserInfo(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={14} />
                <TableCell align="left">
                  <IconButton
                    aria-label="add"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  count={Object.values(usersData).length}
                  onPageChange={(e, p) => handlePageChange(p)}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default UsersTable;
