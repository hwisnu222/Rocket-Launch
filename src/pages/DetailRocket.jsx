import React from "react";
import { useParams } from "react-router-dom";
export default function DetailRocket() {
  const { idRocket } = useParams();
  console.log(idRocket);
  return <div>DetailRocket</div>;
}
