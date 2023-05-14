import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import CustomTableCell from "./CustomTableCell";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IColumn, IUserData } from "../../types";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usersDataActions } from "../../store/usersData.slice";
import { styles } from "../../styles";
import { Dictionary } from "@reduxjs/toolkit";
import { compact, isNil, keyBy } from "lodash";
import { UserEditingModal } from "./UserEditingModal";

const defaultColumns: IColumn<IUserData>[] = [
  {
    title: "Общая информация",
    colSpan: 4,
    children: [
      {
        title: "Name",
        render: (user: IUserData) => user.name,
      },
      {
        title: "ID",
        render: (user: IUserData) => user.id,
      },
      {
        title: "Username",
        render: (user: IUserData) => user.username,
      },
      {
        title: "Email",
        render: (user: IUserData) => user.email,
      },
    ],
  },
  {
    title: "Адрес",
    colSpan: 5,
    isCollapsed: false,
    render: ({ address: { street, suite, city, zipcode } }) => (
      <Typography
        fontSize={14}
      >{`${street}, ${suite}, ${city}, ${zipcode}`}</Typography>
    ),
    children: [
      {
        title: "Street",
        render: (user: IUserData) => user.address.street,
      },
      {
        title: "Suite",
        render: (user: IUserData) => user.address.suite,
      },
      {
        title: "City",
        render: (user: IUserData) => user.address.city,
      },
      {
        title: "Zipcode",
        render: (user: IUserData) => user.address.zipcode,
      },
      {
        title: "Geo lat",
        render: (user: IUserData) => user.address.geo.lat,
      },
    ],
  },
  {
    title: "Контакты",
    colSpan: 2,
    children: [
      {
        title: "Phone",
        render: (user: IUserData) => user.phone,
      },
      {
        title: "Website",
        render: (user: IUserData) => user.website,
      },
    ],
  },
  {
    title: "Компания",
    colSpan: 3,
    children: [
      {
        title: "Name",
        render: (user: IUserData) => user.company.name,
      },
      {
        title: "Catch Phrase",
        render: (user: IUserData) => user.company.catchPhrase,
      },
      {
        title: "Service",
        render: (user: IUserData) => user.company.bs,
      },
    ],
  },
];

const UsersTable = () => {
  const isEditMode = useAppSelector((state) => state.editMode.editMode);
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
  const [columns, setColumns] = useState<Dictionary<IColumn<IUserData>>>(
    keyBy(defaultColumns, "title")
  );
  const [dataToRender, setDataToRender] = useState<IUserData[]>();
  const theme = useTheme();

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setUserInfo(undefined);
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

  const handleExpand = (id: string) => {
    setColumns({
      ...columns,
      [id]: {
        ...(columns[id] as IColumn<IUserData>),
        isCollapsed: !columns[id]?.isCollapsed,
      },
    });
  };

  const renderHeaderCell =
    (isChildrenHeader?: boolean) =>
    ({ colSpan, title, isCollapsed }: IColumn<IUserData>) =>
      (
        <TableCell
          key={title}
          align="center"
          colSpan={isCollapsed ? 1 : colSpan}
          onClick={() =>
            !isChildrenHeader && !isNil(isCollapsed) && handleExpand(title)
          }
          sx={{ color: `${theme.palette.primary.main}` }}
        >
          {isCollapsed && isChildrenHeader ? "" : title}
        </TableCell>
      );

  const renderCell =
    (user: IUserData) =>
    ({ render }: IColumn<IUserData>) =>
      (
        <CustomTableCell
          cellPath={render!}
          data={render?.(user)}
          userInfo={user}
        />
      );

  const arrayOfCols = compact(Object.values(columns));

  return (
    <Box component="div">
      {(isModalOpen || userInfo) && (
        <UserEditingModal
          open
          handleClose={handleCloseEditModal}
          user={userInfo}
        />
      )}
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={styles.tableRowHeader} key={"mainHeaders"}>
              {arrayOfCols.map(renderHeaderCell())}
            </TableRow>
            <TableRow sx={styles.tableRowHeader} key={"childrenHeaders"}>
              {arrayOfCols.map((col: IColumn<IUserData>) =>
                !col.isCollapsed
                  ? col.children?.map(renderHeaderCell(true))
                  : renderHeaderCell(true)(col)
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataToRender?.map((user: IUserData) => (
              <TableRow key={userInfo?.name} sx={styles.tableRowBody}>
                {arrayOfCols.map((col: IColumn<IUserData>) =>
                  !col.isCollapsed
                    ? col.children?.map(renderCell(user))
                    : renderCell(user)(col)
                )}
                {isEditMode && (
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={13} />
              <TableCell align="right">
                <IconButton
                  aria-label="add"
                  color="primary"
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
    </Box>
  );
};

export default UsersTable;
