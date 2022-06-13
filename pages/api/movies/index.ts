import { app, db } from "../../../firebaseConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore";
import { Movie } from "../../../types";

export default async function movies(
  _: NextApiRequest,
  res: NextApiResponse<Array<Movie>>
) {
  const mov: Array<Movie> = [];

  // const movSnap = await getDocs();
  const movSnap = await getDocs(
    query(collection(db, "movies"), orderBy("createdAt", "desc"))
  );
  movSnap.forEach((snapshot) => {
    const data = snapshot.data() as Movie;
    mov.push(data);
  });
  res.status(200).json(mov);
}
