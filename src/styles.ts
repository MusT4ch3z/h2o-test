export const styles = {
  tableContainer: {
    marginBottom: "20px",
    height: "auto",
    maxHeight: "65vh",
    overflow: "auto",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomLeftRadius: "30px",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b6bcc3",
      borderRadius: "100px",
    },
    "&::-webkit-scrollbar-corner": { backgroundColor: "#f8f8f8" },
    scrollbarGutter: "stable",
  },
  tableRowHeader: {
    "& > th": { fontWeight: 700 },
  },
  tableRowBody: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f2fbfa",
    },
    "&:nth-of-type(even)>:first-of-type": {
      backgroundColor: "#fff",
    },
  },
  editingModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "90vh",
    overflow: "auto",
  },
  editingModalBox: {
    mt: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyItems: "center",
  },
  leftSideBarBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  leftSideBarButtons: {
    color: "#fff",
    "&:hover": { borderRadius: "15px", backgroundColor: "#91ded4" },
  },
  mainSubsection: {
    height: "calc(100vh - 64px)",
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  searchFormBox: {
    margin: "25px 0px 10px 0px",
    padding: "20px",
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "30px",
  },
};
