import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { IUserData } from "../../types";
import React from "react";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { usersDataActions } from "../../store/usersData.slice";
import { styles } from "../../styles";

interface P {
  open: boolean;
  handleClose: () => void;
  user?: IUserData;
}

const theme = createTheme();

const styleModalBox = {
  marginTop: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const UserEditingModal: React.FC<P> = ({ open, handleClose, user }) => {
  const dispatch = useAppDispatch();
  const { createUser } = usersDataActions;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dto: any = {
      id: data.get("userId") as string,
      name: data.get("name") as string,
      username: data.get("username") as string,
      email: data.get("email") as string,
      address: {
        street: data.get("street") as string,
        suite: data.get("suite" as string),
        city: data.get("city" as string),
        zipcode: data.get("zipcode" as string),
        geo: { lat: data.get("geoLat" as string) },
      },
      phone: data.get("phone") as string,
      website: data.get("website") as string,
      company: {
        name: data.get("companyName") as string,
        catchPhrase: data.get("catchPhrase") as string,
        bs: data.get("service") as string,
      },
    };

    try {
      dispatch(createUser(dto));
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box component={Paper} sx={styles.editingModal}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box sx={styleModalBox}>
                <Typography component="h1" variant="h5">
                  {user ? "Edit" : "Create"} Item
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={styles.editingModalBox}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    defaultValue={user?.name}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userId"
                    label="User ID"
                    name="userId"
                    defaultValue={user?.id}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    defaultValue={user?.username}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    defaultValue={user?.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="street"
                    label="Address > Street"
                    name="street"
                    defaultValue={user?.address.street}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="suite"
                    label="Address > Suite"
                    name="suite"
                    defaultValue={user?.address.suite}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="Address > City"
                    name="city"
                    defaultValue={user?.address.city}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="zipcode"
                    label="Address > Zipcode"
                    name="zipcode"
                    defaultValue={user?.address.zipcode}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="geoLat"
                    label="Address > Geo Latitude"
                    name="geoLat"
                    defaultValue={user?.address.geo.lat}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    defaultValue={user?.phone}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="website"
                    label="Company Website"
                    name="website"
                    defaultValue={user?.website}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    defaultValue={user?.company.name}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="catchPhrase"
                    label="Catch Phrase"
                    name="catchPhrase"
                    defaultValue={user?.company.catchPhrase}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="service"
                    label="Service"
                    name="service"
                    defaultValue={user?.company.bs}
                  />
                  <IconButton
                    color="primary"
                    sx={{ borderRadius: "5%", margin: "0 auto 15px auto" }}
                    type="submit"
                  >
                    {user ? "Edit" : "Create"}
                  </IconButton>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </>
    </Modal>
  );
};
