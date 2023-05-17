import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AvatarCard = () => {
  const theme = useTheme();
  const styleAvatarCardBox = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "10%",
    lineHeight: "1",
  };

  return (
    <Box component="div" sx={styleAvatarCardBox}>
      <Avatar />
      <Box component="div">
        <Typography
          color={`${theme.palette.text.primary}`}
          fontWeight={600}
          fontSize={14}
          marginBottom="0"
        >
          Татьяна
        </Typography>
        <Typography color={`${theme.palette.text.disabled}`} variant="caption">
          HR
        </Typography>
      </Box>
      <IconButton sx={{ marginLeft: "60%" }}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
};

export default AvatarCard;
