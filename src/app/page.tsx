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
          <br />
          - [ ] TODO: Add GitHub link
          <br />- [ ] TODO: Get content from MDX with next-mdx.
        </article>
      </section>
    </>
  );
}
