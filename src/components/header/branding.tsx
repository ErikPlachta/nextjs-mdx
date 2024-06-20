import Link from "next/link";

export default function Branding({
  content,
  style,
  dataRole,
}: {
  content: any;
  style: any;
  dataRole: any;
}) {
  return (
    <div
      data-role={dataRole?.brandingWrapper}
      className={
        style?.brandingWrapper?.tailwinds ||
        "flex pointer-events-auto justify-left w-full items-center justify-center md:justify-left md:items-left min-w-[fit-content] backdrop-blur md:backdrop-filter-none"
      }
    >
      <Link
        href="/"
        className={
          style?.titleLink?.tailwinds ||
          "w-[100%] md:w-auto flex text-center bg-slate-800/70 md:bg-transparent px-2 md:px-auto rounded-bl rounded-br"
        }
      >
        <h1
          data-role={dataRole?.title}
          className={
            style?.title?.tailwinds ||
            "text-xl bg:transparent font-medium tracking-wide w-full m-auto p-2 md:px-auto"
          }
        >
          {content.title}
        </h1>
      </Link>
      {content?.description && (
        <p
          data-role="page-description"
          className={style?.description?.tailwinds || "text-lg font-light"}
        >
          {content.description}
        </p>
      )}
    </div>
  );
}
