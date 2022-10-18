import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function TitleBar({ url, title }) {
  return (
    <div className="flex">
      <Link to={url} className="flex items-center">
        <MdKeyboardArrowLeft size={24} />
        <span className="text-xl font-semibold">{title}</span>
      </Link>
    </div>
  );
}
