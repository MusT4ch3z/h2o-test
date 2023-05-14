export const styles = {
  tableContainer: {
    overflow: "auto",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
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
    position: "absolute" as "absolute",
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
  customTableCell: {
    padding: "16px 8px 16px 16px",
    ":hover": { color: "#54d3c2", cursor: "pointer" },
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
};
