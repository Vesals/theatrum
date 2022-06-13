import { app, db } from "../../../firebaseConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDoc,
  doc,
  query,
  DocumentData,
} from "firebase/firestore";
import { Movie } from "../../../types";

export default async function singleMovie(
  req: NextApiRequest,
  res: NextApiResponse<Movie>
) {
  const movieId = req.query.movieId as string;

  const docRef = doc(db, "movies", movieId);
  const mov = (await getDoc(docRef)).data() as Movie;

  res.status(200).json(mov);
}
