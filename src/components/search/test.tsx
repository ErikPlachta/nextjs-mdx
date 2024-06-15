// `use client`;

import React from "react";
import Search from "@/components/search";

/**
 * Demo of Search component with dummy data.
 */
export default function SearchExample() {
  return (
    <div>
      <section className="bg-transparent min-h-full width-[100%] p-4">
        <Search
          data={[
            {
              id: 1,
              title: "The Great Gatsby",
              author: "F. Scott Fitzgerald",
              genre: "Novel",
              summary: "A novel set in the Roaring Twenties...",
              slug: "#the-great-gatsby",
            },
            {
              id: 2,
              title: "To Kill a Mockingbird",
              author: "Harper Lee",
              genre: "Novel",
              summary:
                "A story about racial injustice in a small Alabama town...",
              slug: "#to-kill-a-mockingbird",
            },
            {
              id: 3,
              title: "1984",
              author: "George Orwell",
              genre: "Science Fiction",
              summary:
                "A dystopian novel about a society under total surveillance...",
              slug: "#1984",
            },
          ]}
          dataKeys={["title", "author", "summary", "slug", "genre"]}
          // placeholder={""}
          searchWhenTyping={true}
          // styles={
          //   {
          // wrapper: "",
          // container: "",
          // results: "",
          // buttonSearch: "",
          // buttonClear: "",
          //   }
          // }
        />
      </section>
    </div>
  );
}
