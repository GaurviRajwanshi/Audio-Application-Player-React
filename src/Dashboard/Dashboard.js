import * as React from "react";
import {
  Grid,
  Button,
  Divider,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalContent from "./ModalContent";
import SongList from "./SongList";
import { useState, useEffect } from "react";
import SongData from "../MockData/SongData";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [songMockData, setSongMockData] = useState(SongData);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("requestId")) {
      navigate("/", { replace: true });
    }
  }, []);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <Typography variant="h4" align="center" sx={{ margin: "10px" }}>
          Logo
        </Typography>
        <Box
          width="100%"
          height="45px"
          bgcolor="#e7f8fe"
          m={0}
          display="flex"
          alignItems="center"
          justifyContent="left"
          borderRight="4px solid #57aefe"
        >
          <LibraryMusicIcon> </LibraryMusicIcon>
          <Typography variant="h6" color="#57aefe" textAlign="left">
            Songs
          </Typography>
        </Box>
        <Box
          position="fixed"
          bottom="0"
          left="0"
          width="20%"
          p={2}
          display="flex"
          justifyContent="flex-start"
          zIndex={999}
        >
          <LogoutIcon />
          <Typography
            variant="button"
            sx={{ cursor: "pointer", color: "black", paddingLeft: "15px" }}
            onClick={() => {
              localStorage.removeItem("phoneNumber");
              localStorage.removeItem("requestId");
              window.location.replace("/");
              // Handle logout action
              console.log("Logout clicked");
            }}
          >
            Logout
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 2 }}
        >
          {/* Left item: SONGS */}
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              SONGS
            </Typography>
          </Grid>

          {/* Right item: Add Songs button */}
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fdb927", color: "black" }}
              size="small"
              onClick={handleOpenModal}
            >
              Add Songs
            </Button>
          </Grid>
          <SongList
            songMockData={songMockData}
            setSongMockData={setSongMockData}
          />

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  paddingRight: 2,
                }}
              >
                <CloseIcon />
              </IconButton>

              <ModalContent
                songMockData={songMockData}
                setSongMockData={setSongMockData}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  );
}
