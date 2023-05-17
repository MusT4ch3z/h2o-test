import { Input, TableCell, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITableCellProps } from "../../types";
import { usersDataActions } from "../../store/usersData.slice";
import { useEffect, useState } from "react";

const CustomTableCell = ({ cellPath, data, userInfo }: ITableCellProps) => {
  const dispatch = useAppDispatch();
  const { editUserCell } = usersDataActions;
  const [cellValue, setCellValue] = useState<string | null>(data);
  const cellPathInDictionary = cellPath.toString().slice(13);
  const isEditMode = useAppSelector((state) => state.editMode.editMode);
  const theme = useTheme();

  const dispatchTableChanges = () => {
    dispatch(editUserCell({ userInfo, cellValue, cellPathInDictionary }));
  };

  const styleCustomTableCell = {
    whiteSpace: "nowrap",
    ":hover": { color: theme.palette.primary.main, cursor: "pointer" },
    transitionDuration: "300ms",
  };
  const styleCustomTableCellInput = {
    padding: "0px 8px 0px 16px",
    whiteSpace: "nowrap",
    ":hover": { color: theme.palette.primary.main, cursor: "pointer" },
    transitionDuration: "300ms",
  };

  useEffect(() => {
    setCellValue(data);
  }, [data]);

  return (
    <TableCell
      variant="body"
      sx={isEditMode ? styleCustomTableCellInput : styleCustomTableCell}
    >
      {isEditMode ? (
        <Input
          value={cellValue}
          fullWidth={true}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={dispatchTableChanges}
          sx={{
            backgroundColor: "transparent",
            fontSize: "14px",
            width: "10rem",
          }}
        />
      ) : (
        data
      )}
    </TableCell>
  );
};

export default CustomTableCell;
