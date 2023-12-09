import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Mp3Player from "./Mp3Player";
import "../styles.css";

const columns = [
  {
    id: "img",
    label: "SONG IMAGE",
    align: "left",
    format: (value) => (
      <img src={value} alt="Song" style={{ maxWidth: "50px" }} />
    ),
    sx: { width: "20%" },
  },
  { id: "songname", label: "SONG NAME", align: "left" },
  { id: "source", label: "SOURCE", width: "10%", align: "center" },
  {
    id: "addedon",
    label: "ADDED ON",
    align: "right",
    format: (value) => new Date(value).toLocaleDateString(),
    width: "10%",
  },
  { id: "play", label: "", width: "10%" },
  { id: "deleteId", label: "", width: "10%" },
];

function createData(
  songname,
  source,
  addedon,
  play,
  deleteId,
  img,
  audio,
  key
) {
  return { songname, source, addedon, play, deleteId, img, audio, key };
}

export default function SongList({ songMockData, setSongMockData }) {
  const songData = songMockData;
  const [isCurrentPlayingDeleted, setIsCurrentPlayingDeleted] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  console.log("gfdsdg");
  console.log(songMockData);
  const handlePlay = (row) => {
    setCurrentlyPlaying(row);
  };

  const handleDelete = (row) => {
    if (currentlyPlaying.key === row.key) {
      setIsCurrentPlayingDeleted(true);
    }
    setSongMockData((prevData) => {
      const updatedData = prevData.filter((song) => song.key !== row.key);
      return updatedData;
    });
    console.log("Deleting song:", row.songname);
  };

  const rows = songData.map((song) =>
    createData(
      song.songname,
      song.source,
      song.addedOn,
      "Play",
      "Delete",
      song.img,
      song.audio,
      song.key
    )
  );

  useEffect(() => {
    if (currentlyPlaying == "") setCurrentlyPlaying("");
  }, [songMockData]);

  return (
    <Grid container>
      <TableContainer sx={{ border: "none", marginBottom: "50px" }}>
        <Table aria-label="sticky table" sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                style={{
                  backgroundColor: "#f0f0f0",
                  width: "40%",
                  textAlign: "left",
                }}
              >
                SONG DETAILS
              </TableCell>
              {columns.slice(2).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width || "auto",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.songname}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof row[column.id] !== "undefined" ? (
                      column.format(row[column.id])
                    ) : column.id === "play" ? (
                      <PlayCircleIcon
                        fontSize="large"
                        style={{ color: "#fdb927" }}
                        onClick={() => handlePlay(row)}
                        sx={{ width: "100px" }}
                      />
                    ) : column.id === "deleteId" ? (
                      <DeleteIcon onClick={() => handleDelete(row)} />
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mp3player-container ">
        <Mp3Player
          isCurrentPlayingDeleted={isCurrentPlayingDeleted}
          setIsCurrentPlayingDeleted={setIsCurrentPlayingDeleted}
          handlePlay={handlePlay}
          currentlyPlaying={currentlyPlaying}
          songMockData={songMockData}
          setSongMockData={setSongMockData}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      </div>
    </Grid>
  );
}
