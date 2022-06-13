import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { app, db } from "../../firebaseConfig";
import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";

import { TextField, Button, Grid, Container, IconButton } from "@mui/material";
import { Movie } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  mov: Movie;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id ?? "";
  const response = await fetch(
    `https://theatrum-three.vercel.app/api/movies/${id}`
  );
  // const response = await fetch(`http://localhost:3000/api/movies/${id}`);

  const data = await response.json();
  return {
    props: { mov: data },
  };
};

const EditMovie = ({ mov }: Props) => {
  // console.log(mov);
  const [editable, setEditable] = React.useState(false);

  const router = useRouter();
  const docRef = doc(db, "movies", mov.id);

  const saveMovie = async (formVal: any, dateEdit: Date) => {
    await updateDoc(docRef, {
      id: mov.id,
      title: formVal.title,
      duration: formVal.duration,
      released_at: formVal.released_at,
      overview: formVal.overview,
      updatedAt: dateEdit,
    });
  };

  const formik = useFormik({
    initialValues: { ...mov },
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values, { resetForm }) => {
      const dateEdited = new Date();
      saveMovie(values, dateEdited);
      values.updatedAt = Timestamp.fromDate(dateEdited);
      setEditable(false);
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
      <Container maxWidth="md">
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "90vh" }}
        >
          <Grid item xs sx={{ border: 1, padding: 5, borderRadius: 5 }}>
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: 1, mb: 3 }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 1 }}
                onClick={() => router.back()}
                disabled={editable}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Back
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ mr: 1 }}
                onClick={() => setEditable(true)}
                disabled={editable}
              >
                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                Edit
              </Button>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="title"
                fullWidth
                required
                margin="dense"
                variant="standard"
                name="title"
                label="Movie Title"
                InputProps={{
                  readOnly: !editable,
                }}
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
                InputProps={{
                  readOnly: !editable,
                }}
                onChange={formik.handleChange}
                value={formik.values.released_at}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.released_at &&
                  Boolean(formik.errors.released_at)
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
                InputProps={{
                  readOnly: !editable,
                }}
                onChange={formik.handleChange}
                value={formik.values.duration}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
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
                InputProps={{
                  readOnly: !editable,
                }}
                onChange={formik.handleChange}
                value={formik.values.overview}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.overview && Boolean(formik.errors.overview)
                }
                helperText={formik.touched.overview && formik.errors.overview}
              />

              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Created At"
                    margin="dense"
                    variant="standard"
                    value={new Date(
                      formik.values.createdAt.seconds * 1000
                    ).toLocaleString("en-GB")}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="standard"
                    id="updatedAt"
                    label="Updated At"
                    value={new Date(
                      formik.values.updatedAt.seconds * 1000
                    ).toLocaleString("en-GB")}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="flex-end"
                sx={{ my: 1, minHeight: 36.5 }}
              >
                {editable && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setEditable(false)}
                      sx={{ mr: 1 }}
                    >
                      <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      <SaveIcon fontSize="small" sx={{ mr: 1 }} />
                      Save
                    </Button>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditMovie;
