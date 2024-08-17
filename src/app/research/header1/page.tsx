import { Suspense } from "react";
import { headers } from "next/headers";

export default function TestPage(): JSX.Element {
  const headerList = headers();
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
