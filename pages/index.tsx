import * as React from "react";
import { Movie } from "../types";

import AddMovie from "./addMovie";
import DelMovie from "./delMovie";
import TablePaginationActions from "../components/tablePagination";
import { useRouter } from "next/router";

import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";

import {
  Grid,
  TableHead,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Fab,
  IconButton,
  ButtonBase,
} from "@mui/material";

import { app, db } from "../firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";

const dbInstance = collection(db, "movies");
const dbCol = doc(dbInstance);

type Props = { rows?: Array<Movie> };

export async function getServerSideProps() {
  const response = await fetch("https://theatrum-three.vercel.app/api/movies");
  // const response = await fetch("http://localhost:3000/api/movies");
  const data = await response.json();
  return {
    props: { rows: data },
  };
}

function Index({ rows = [] }: Props) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  const [del, setDel] = React.useState(false);
  const toggleDel = () => setDel(!del);

  const [docId, setDocId] = React.useState("");
  const [docTitle, setDocTitle] = React.useState("");

  const refreshData = () => router.replace(router.asPath);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellClick = (id: string) => {
    router.push(`/detail/${id}`);
  };

  // const deleteTodo = async (id: string, e: React.SyntheticEvent) => {
  //   e.stopPropagation();
  //   const docRef = doc(db, "movies", id);
  //   await deleteDoc(docRef);
  //   refreshData();
  // };

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
          <Grid container justifyContent="flex-end">
            <Fab
              color="primary"
              aria-label="add"
              onClick={toggleOpen}
              variant="extended"
              size="medium"
              sx={{ mb: 1, backgroundColor: "#4D4C7D" }}
            >
              <AddIcon /> Movie
            </Fab>
            <AddMovie
              show={open}
              toggleShow={toggleOpen}
              refreshData={refreshData}
            />

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead
                  sx={{
                    backgroundColor: "#827397",
                    ".MuiTableCell-head": {
                      color: "white",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <Typography variant="h6" component="div">
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 100 }} align="right">
                      <Typography variant="h6" component="div">
                        Duration
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 100 }} align="right">
                      <Typography variant="h6" component="div">
                        Released At
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 100 }} align="right">
                      <Typography variant="h6" component="div">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    ".MuiTableRow-root:active": { backgroundColor: "#D1D1D1" },
                  }}
                >
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => handleCellClick(row.id)}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={() => handleCellClick(row.id)}
                      >
                        {row.duration} Minutes
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={() => handleCellClick(row.id)}
                      >
                        {row.released_at}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            setDocId(row.id);
                            setDocTitle(row.title);
                            toggleDel();
                          }}
                        >
                          {/* (e) => deleteTodo(row.id, e) */}
                          <DeleteIcon />
                        </IconButton>

                        <DelMovie
                          docId={docId}
                          docTitle={docTitle}
                          del={del}
                          toggleDel={toggleDel}
                          refreshData={refreshData}
                        ></DelMovie>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow sx={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[3, 5, { label: "All", value: -1 }]}
                      colSpan={5}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Index;
