import { Input, TableCell } from "@mui/material";
import { styles } from "../../styles";
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

  const dispatchTableChanges = () => {
    dispatch(editUserCell({ userInfo, cellValue, cellPathInDictionary }));
  };

  useEffect(() => {
    setCellValue(data);
  }, [data]);

  return (
    <TableCell
      className="customTableCell"
      key={data}
      sx={styles.customTableCell}
      onClick={() => console.log(data, cellPathInDictionary, userInfo)}
    >
      {isEditMode ? (
        <Input
          defaultValue={data}
          value={cellValue}
          fullWidth={true}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={dispatchTableChanges}
          sx={{
            backgroundColor: "transparent",
            fontSize: "14px",
          }}
        />
      ) : (
        data
      )}
    </TableCell>
  );
};

export default CustomTableCell;
