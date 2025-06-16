import Link from "next/link";
import React from "react";
import style from "./index.module.scss";

export const BreadCrumb = ({ name }: { name: string }) => {
  return (
    <div className={style.breadcrumb}>
      <Link href={"/"}>Home</Link> &gt;
      <Link href={"/services"}>Services</Link> &gt;
      <Link href={"#"}>{name}</Link>
    </div>
  );
};
