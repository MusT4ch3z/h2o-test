export const styles = {
  tableRowHeader: { "& > th": { fontWeight: 700 } },
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
};
