"use client";
import React from "react";

type Props = {
  data: any;
};

function AssetsTable({ data }: Props) {
  return (
    <>
      <div>AssetsTable</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default AssetsTable;
