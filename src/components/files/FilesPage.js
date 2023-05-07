import { Box, Grid, Modal, Paper } from "@mui/material";
import StyledButton from "../UI/StyledButton";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import File from "./File";
import { styles } from "../modalWindow/AuthModal";
import FileForm from "./FileForm";
import { useAuth } from "../../AuthContext";

const prepareFiles = (file) => ({
  id: file.id,
  role: file.link_role,
  name: file.namefile,
  url: file.url,
});

const FilesPage = () => {
  const {
    authData: { role = "student" },
  } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const getFiles = () => {
    if (role === "methodist") {
      return fetch(`/allFiles`)
        .then((res) => res.json())
        .then(({ data }) => {
          setFiles(data.map(prepareFiles));
        });
    }

    return fetch(`/files?role=${role}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setFiles(data.map(prepareFiles));
      });
  };

  useEffect(() => {
    if (!role) {
      return;
    }

    getFiles();
  }, [role]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {role === "methodist" && (
        <Box ml={2}>
          <StyledButton
            disableRipple
            variant="text"
            startIcon={<Add />}
            text="Додати файл"
            onClick={toggleModal}
            colorVariant="transparent"
          />
        </Box>
      )}
      <Box mt={4}>
        <Paper elevation={0} sx={{ borderRadius: "30px" }}>
          <Grid container spacing={1} p={1}>
            {files.map((file) => (
              <Grid item xs={4} id={file.id}>
                <File file={file} getFiles={getFiles} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Modal sx={styles.modal} open={modalOpen} onClose={toggleModal}>
        <Paper sx={styles.wrapper} elevation={0}>
          <FileForm toggleModal={toggleModal} getFiles={getFiles} />
        </Paper>
      </Modal>
    </>
  );
};

export default FilesPage;
