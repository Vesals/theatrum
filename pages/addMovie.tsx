import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { app, db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

import { TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  show: boolean;
  toggleShow: () => void;
  refreshData: () => void;
};

const AddMovie = ({ show, toggleShow, refreshData }: Props) => {
  const saveMovie = async (formVal: any) => {
    const newId = doc(collection(db, "movies")).id;

    const dbInstance = collection(db, "movies");
    const dbCol = doc(dbInstance);

    await setDoc(dbCol, {
      id: dbCol.id,
      title: formVal.title,
      duration: formVal.duration,
      released_at: formVal.released_at,
      overview: formVal.overview,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(function () {
      refreshData();
    });
  };

  const initialValues = {
    title: "",
    duration: "",
    released_at: "",
    overview: "",
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values, { resetForm }) => {
      saveMovie(values);
      resetForm({ values: initialValues });
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      released_at: yup
        .number()
        .min(1850, "Must be 1850 or more")
        .max(
          new Date().getFullYear(),
          `Must be less than ${new Date().getFullYear()}`
        )
        .required("Required"),
      duration: yup
        .number()
        .min(1, "Too Short!")
        .max(999, "Too Long!")
        .required("Required"),
      overview: yup
        .string()
        .min(1, "Too Short!")
        .max(500, "Too Long!")
        .required("Required"),
    }),
  });

  return (
    <>
      <Dialog open={show} onClose={toggleShow}>
        <DialogTitle>Movie Database Input</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                    </DialogContentText> */}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="title"
              fullWidth
              required
              margin="dense"
              variant="standard"
              name="title"
              label="Movie Title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              id="released_at"
              fullWidth
              required
              margin="dense"
              variant="standard"
              label="Year Released"
              name="released_at"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.released_at}
              onBlur={formik.handleBlur}
              error={
                formik.touched.released_at && Boolean(formik.errors.released_at)
              }
              helperText={
                formik.touched.released_at && formik.errors.released_at
              }
            />

            <TextField
              id="duration"
              fullWidth
              required
              margin="dense"
              variant="standard"
              label="Duration"
              name="duration"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.duration}
              onBlur={formik.handleBlur}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={formik.touched.duration && formik.errors.duration}
            />

            <TextField
              id="overview"
              fullWidth
              multiline
              required
              margin="dense"
              variant="standard"
              rows={7}
              label="Overview"
              name="overview"
              onChange={formik.handleChange}
              value={formik.values.overview}
              onBlur={formik.handleBlur}
              error={formik.touched.overview && Boolean(formik.errors.overview)}
              helperText={formik.touched.overview && formik.errors.overview}
            />
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  toggleShow();
                  formik.resetForm({ values: initialValues });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                disabled={
                  !formik.isValid ||
                  formik.values.title == "" ||
                  formik.values.title == ""
                }
                onClick={toggleShow}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMovie;
