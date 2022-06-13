import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { app, db } from "../firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";

type Props = {
  docId: string;
  docTitle: string;
  del: boolean;
  toggleDel: () => void;
  refreshData: () => void;
};

const DelMovie = ({ docId, docTitle, del, toggleDel, refreshData }: Props) => {
  const deleteMov = async (key: string) => {
    // e.stopPropagation();
    const docRef = doc(db, "movies", key);
    await deleteDoc(docRef);
    refreshData();
    toggleDel();
  };

  return (
    <>
      <Dialog
        open={del}
        onClose={toggleDel}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        PaperProps={{
          style: {
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irreversible, are you sure want to delete {docTitle}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={toggleDel}>
            Back
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => deleteMov(docId)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DelMovie;
