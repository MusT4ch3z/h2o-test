import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
import { compact, has, isNil, keyBy, keys, values } from "lodash";
import { UserEditingModal } from "./UserEditingModal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomPagination from "../CustomPagination";

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
        title: "Company Name",
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
  const { page, rowsPerPage } = useAppSelector((state) => state.pagination);
  const [filteredUsersData, setFilteredUsersData] = useState<IUserData[]>(
    Object.values(usersData)
  );
  const dispatch = useAppDispatch();
  const { removeUser } = usersDataActions;
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<IUserData>();
  const [columns, setColumns] = useState<Dictionary<IColumn<IUserData>>>(
    keyBy(defaultColumns, "title")
  );
  const [dataToRender, setDataToRender] = useState<IUserData[]>();
  const theme = useTheme();
  const styleExpandCollapseButton = {
    padding: "0px 8px",
    float: "right",
    ":hover": {
      color: `${theme.palette.primary.main}`,
      backgroundColor: "transparent",
      cursor: "pointer",
    },
  };

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setUserInfo(undefined);
  };

  useEffect(() => {
    if (!searchValue) {
      setFilteredUsersData(values(usersData));
    } else {
      setFilteredUsersData(
        values(usersData).filter((i) => i.name === searchValue)
      );
    }
  }, [searchValue, usersData]);

  useEffect(
    () =>
      setDataToRender(
        filteredUsersData!.slice(
          (page - 1 || 0) * rowsPerPage,
          page * rowsPerPage
        )
      ),
    [page, filteredUsersData, rowsPerPage]
  );

  const handleExpand = (title: string) => {
    setColumns({
      ...columns,
      [title]: {
        ...(columns[title] as IColumn<IUserData>),
        isCollapsed: !columns[title]?.isCollapsed,
      },
    });
  };

  const renderHeaderCell =
    (isChildrenHeader?: boolean) =>
    ({ colSpan, title, isCollapsed }: IColumn<IUserData>) =>
      (
        <TableCell
          variant="head"
          key={title}
          align="center"
          colSpan={isCollapsed ? 1 : colSpan}
          sx={{ color: `${theme.palette.primary.main}` }}
        >
          {isCollapsed && isChildrenHeader ? "" : title}
          {!isChildrenHeader &&
            !isNil(isCollapsed) &&
            !isCollapsed &&
            !isEditMode && (
              <IconButton
                key="collapseButton"
                onClick={() =>
                  !isChildrenHeader &&
                  !isNil(isCollapsed) &&
                  handleExpand(title)
                }
                sx={styleExpandCollapseButton}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
          {!isChildrenHeader && isCollapsed && !isEditMode && (
            <IconButton
              key="expandButton"
              onClick={() =>
                !isChildrenHeader && !isNil(isCollapsed) && handleExpand(title)
              }
              sx={styleExpandCollapseButton}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        </TableCell>
      );

  const renderCell =
    (user: IUserData) =>
    ({ render }: IColumn<IUserData>) =>
      (
        <CustomTableCell
          key={render?.(user) as string}
          cellPath={render!}
          data={render?.(user)}
          userInfo={user}
        />
      );

  const arrayOfCols = compact(values(columns));

  const expandColumnsInEditMode = () =>
    isEditMode &&
    setColumns(
      keys(columns).reduce((res, key) => {
        const column = columns[key] as IColumn<IUserData>;
        return has(column, "isCollapsed")
          ? {
              ...res,
              [key]: {
                ...column,
                isCollapsed: false,
              },
            }
          : res;
      }, columns)
    );

  useEffect(() => {
    expandColumnsInEditMode();
  }, [isEditMode]);

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
            <TableRow sx={styles.tableRowHeader} key="mainHeaders">
              {arrayOfCols.map(renderHeaderCell())}
              {isEditMode && <TableCell />}
            </TableRow>
            <TableRow sx={styles.tableRowHeader} key="childrenHeaders">
              {arrayOfCols.map((col: IColumn<IUserData>) =>
                !col.isCollapsed
                  ? col.children?.map(renderHeaderCell(true))
                  : renderHeaderCell(true)(col)
              )}
              {isEditMode && <TableCell />}
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
                  <TableCell key="deleteUser">
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
            <TableRow key="addNewUserRow">
              <TableCell
                key="emptyTableCells"
                colSpan={13}
                sx={{ padding: "0px" }}
              />
              <TableCell
                key="addNewUserCell"
                align="right"
                sx={{ padding: "0px" }}
              >
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
        </Table>
      </TableContainer>

      <CustomPagination
        count={values(usersData).length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </Box>
  );
};

export default UsersTable;
