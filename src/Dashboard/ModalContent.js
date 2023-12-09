import React, { useRef, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { generateUniqueKey } from "../generateNewKey";

export default function ModalContent({
  songMockData,
  setSongMockData,
  isModalOpen,
  setModalOpen,
}) {
  songMockData = songMockData.songMockData;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    songname: "",
    songLink: "",
    source: "",
    addedOn: new Date(),
    img: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile({
        url: URL.createObjectURL(selectedFile),
        file: selectedFile,
      });
    } else {
      setFile(null);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (formData.songname && formData.songLink && formData.source && file) {
      const formDataWithFile = {
        ...formData,
        img: file.url,
        key: generateUniqueKey(),
      };

      setSongMockData((prevSongMockData) => [
        formDataWithFile,
        ...prevSongMockData,
      ]);
      console.log("Form submitted:", formDataWithFile);

      setModalOpen(false);
    } else {
      alert("Please fill in all required fields and upload an image.");
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        padding: 3,
        textAlign: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Song
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Song Name"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            required
            name="songname"
            value={formData.songName}
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Song Link"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            required
            name="songLink"
            value={formData.songLink}
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Song Source"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            required
            name="source"
            value={formData.source}
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item xs={12}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            ref={fileInputRef}
          />
          <label htmlFor="upload-button">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<PhotoCameraIcon />}
              onClick={handleFileButtonClick}
            >
              Click to Upload Profile Thumbnail
            </Button>
          </label>
          {file && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                padding: 2,
                marginBottom: 2,
                marginTop: 2,
                borderRadius: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={file.url}
                  alt="Uploaded Preview"
                  style={{ maxWidth: 50, maxHeight: 50 }}
                />
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  {file.file.name}
                </Typography>
              </Box>

              <IconButton color="error" onClick={handleDeleteImage}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Image has to be of aspect ratio 1:1 with a size of 3000px X 3000px
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Button
            variant="outlined"
            sx={{ marginRight: 2 }}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Song
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
