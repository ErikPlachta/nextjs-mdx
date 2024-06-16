// import Image from 'next/image'
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero
        content={{
          title: "Home",
          description:
            "Using MDX content within NextJs App and Page routes via `next-mdx` and `next-mdx-remote`.",
        }}
      />
      <section>
        <article>
          <h2 className="text-2xl pb-2">A Development Sandbox</h2>
          <p>This website is actively under development.</p>
          // TODO: Add GitHub link // TODO: Get content from MDX with next-mdx.
        </article>
      </section>

      {/* <section>
        <h2 className="text-2xl">Projects</h2>
        <p>TODO: Add feed + details once page/framework is finalized.</p>
        <span className="w-full flex gap-4 justify-between mt-2">
          <span>item1</span>
          <span>item2</span>
          <span>item3</span>
          <span>item4</span>
        </span>
      </section> */}
    </>
  );
}
