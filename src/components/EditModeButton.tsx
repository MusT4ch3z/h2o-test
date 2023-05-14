import { Button, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { editModeActions } from "../store/editMode.slice";

const EditModeButton = () => {
  const isEditMode = useAppSelector((state) => state.editMode.editMode);
  const { switchEditMode } = editModeActions;
  const dispatch = useAppDispatch();
  const switchModeHandler = () => {
    dispatch(switchEditMode());
  };
  const theme = useTheme();
  return (
    <Button
      variant={isEditMode ? "contained" : "outlined"}
      onClick={switchModeHandler}
      sx={{
        marginLeft: "auto",
        marginRight: "0",
        padding: "0px 15px",
        border: `${theme.palette.primary.main} 3px solid`,
        borderRadius: "20px",
        color: `${isEditMode && "#fff"}`,
        textTransform: "none",
        ":hover": {
          border: `${
            isEditMode ? theme.palette.primary.dark : theme.palette.primary.main
          } 3px solid`,
          color: `${isEditMode && "#fff"}`,
        },
      }}
    >
      <Typography fontWeight={600} fontSize={14}>
        Режим редактирования
      </Typography>
    </Button>
  );
};

export default EditModeButton;
