import { headers } from "next/headers";
import { Suspense } from "react";

export default function TestPage(): JSX.Element {
  const headerList = headers();
  // console.log("headers: ", headerList);
  const context = headerList.get("context");

  return (
    <Suspense fallback={null}>
      <div>
        <h1>Test Page</h1>
        {context
          ? Object.keys(JSON.parse(context)).map((key: any) => {
              let x = JSON.parse(context);
              return (
                <div className="p-4" key={key}>
                  <h2>{key}</h2>
                  {typeof x[key] === "string" ? (
                    // to a string
                    <div>
                      1
                      <p className="px-10">
                        {JSON.stringify(Object.keys(x[key]))}
                      </p>
                    </div>
                  ) : (
                    // to an object
                    <div>
                      2<p className="px-10">{JSON.stringify(x[key])}</p>
                    </div>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </Suspense>
  );
}
