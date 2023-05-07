import { Delete, Download, InsertDriveFile } from "@mui/icons-material";
import { Box, CardMedia, IconButton, Paper, Typography } from "@mui/material";
import { useAuth } from "../../AuthContext";

const styles = {
  wrapper: {
    p: "10px",
    backgroundColor: "#F5F5F5",
    borderRadius: "30px",
  },
  imageWrapper: {
    position: "relative",
    "&:hover": {
      "& > div": {
        display: "flex",
      },
    },
  },
  actionButtons: {
    display: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    borderRadius: "20px",
  },
  info: {
    borderRadius: "17px",
    py: 1,
    px: 2,
    mt: 1,
  },
  icon: {
    mx: 2,
  },
};

const imageTypes = ["png", "jpg", "jpeg"];

const File = ({ file, getFiles }) => {
  const {
    authData: { role = "student" },
  } = useAuth();

  const fileNameParts = file.url.split(".");
  const fileType = fileNameParts[fileNameParts.length - 1];

  const downloadFile = (e) => {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = file.url;
    link.setAttribute("download", file.name);

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const deleteFile = () => {
    fetch(`/deleteFile?id=${file.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          alert("Error");
          return;
        }

        getFiles();
      });
  };

  return (
    <Paper elevation={0} sx={styles.wrapper}>
      <Box sx={styles.imageWrapper}>
        {imageTypes.includes(fileType) ? (
          <CardMedia
            sx={styles.img}
            src={file.url}
            component="img"
            title={file.name}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={styles.img}
          >
            <InsertDriveFile sx={{ fontSize: 96 }} />
          </Box>
        )}
        <Box sx={styles.actionButtons}>
          {role === "methodist" && (
            <IconButton
              sx={styles.icon}
              color="error"
              children={<Delete />}
              onClick={deleteFile}
            />
          )}
          <IconButton
            sx={styles.icon}
            color="primary"
            children={<Download />}
            onClick={downloadFile}
          />
        </Box>
      </Box>

      <Paper elevation={0} sx={styles.info}>
        <Typography variant="button" children="Назва: " />
        <Typography children={file.name} />
      </Paper>
    </Paper>
  );
};

export default File;
