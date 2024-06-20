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
        "justify-left md:justify-left md:items-left pointer-events-auto flex w-full min-w-[fit-content] items-center justify-center backdrop-blur md:backdrop-filter-none"
      }
    >
      <Link
        href="/"
        className={
          style?.titleLink?.tailwinds ||
          "md:px-auto flex w-[100%] rounded-bl rounded-br bg-slate-800/70 px-2 text-center md:w-auto md:bg-transparent"
        }
      >
        <h1
          data-role={dataRole?.title}
          className={
            style?.title?.tailwinds ||
            "bg:transparent md:px-auto m-auto w-full p-2 text-xl font-medium tracking-wide"
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
