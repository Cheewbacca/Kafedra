import { Button } from "@mui/material";

const styles = {
  button: {
    borderRadius: "37px",
    py: "15px",
    px: "40px",
    height: "54px",
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    boxShadow: "none",
  },
};

const colorVariants = {
  white: {
    backgroundColor: "white",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "secondary.main",
      color: "white",
    },
  },
  link: {
    padding: 0,
    color: "secondary.main",
    background: "none",
    backgroundColor: "none !important",
    position: "relative",
    transition: "backgroundColor .3s",
    "&::after": {
      content: "''",
      position: "absolute",
      bottom: "10px",
      width: "100%",
      height: "1px",
      backgroundColor: "secondary.main",
    },
    "&:hover": {
      background: "none",
      backgroundColor: "none !important",
      color: "primary.main",
      "&::after": {
        backgroundColor: "primary.main",
      },
    },
  },
  blue: {
    backgroundColor: "primary.main",
    color: "white",
    "&:hover": {
      backgroundColor: "secondary.main",
      color: "white",
    },
    "&:disabled": {
      backgroundColor: "#F5F5F5",
    },
  },
};

const StyledButton = ({
  text,
  variant,
  startIcon,
  colorVariant,
  sx,
  disableRipple,
  ...props
}) => (
  <Button
    sx={[sx, styles.button, colorVariant && colorVariants[colorVariant]]}
    variant={variant}
    startIcon={startIcon}
    disableRipple={disableRipple}
    {...props}
  >
    {text}
  </Button>
);

export default StyledButton;
