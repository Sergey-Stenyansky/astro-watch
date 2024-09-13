export const flexSpaceBetween = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const flexColumn = { flexDirection: "column" };
export const rotateY180 = { transform: "scaleY(-1)" };
export const fullWidth = { width: "100%" };
export const margin0 = { margin: 0 };
export const overlowEllipsis = { overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" };

export const paginationContainerStyle = {
  "& .MuiPagination-ul li:first-of-type": {
    marginRight: "auto",
  },
  "& .MuiPagination-ul li:last-of-type": {
    marginLeft: "auto",
  },
};
