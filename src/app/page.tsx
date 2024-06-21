"use client";
import React, { ReactNode } from "react";

import HomepageMdx from "/content/main/homepage.mdx";

export default function Homepage({ params }: any): JSX.Element {
  // console.log("params", params);
  return <HomepageMdx />;
}
