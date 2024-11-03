import { Suspense, type JSX } from "react";
import { headers } from "next/headers";

export default async function TestPage(): Promise<JSX.Element> {
  const headerList = await headers();
  // console.log("headers: ", headerList);
  return (
    <Suspense fallback={null}>
      <div>
        <h1>Test Page</h1>
        {JSON.stringify(headerList.get("context"))}
      </div>
    </Suspense>
  );
}
