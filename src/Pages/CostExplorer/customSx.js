export const customSx = {
    "& .MuiTabs-flexContainer": {
      gap: 2,
    },
    "& .MuiTab-root": {
      backgroundColor: "#ffffff",
      color: "#3f51b5",
      borderRadius: "9px", // your updated radius
      textTransform: "none",
      fontWeight: 500,
      fontSize: "14px",
      minHeight: "32px",
      minWidth: "100px",
      padding: "6px 16px",
      border: "1px solid #c5cae9",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        border: "1px solid #3f51b5",
      },
      "&.Mui-selected": {
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        border: "1px solid #3f51b5",
      },
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  };
  