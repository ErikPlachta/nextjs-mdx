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
      className={style.brandingWrapper.tailwinds}
    >
      <Link href="/" className={style.titleLink.tailwinds}>
        <h1 data-role={dataRole?.title} className={style.title.tailwinds}>
          {content.title}
        </h1>
      </Link>
      {content?.description && (
        <p
          data-role={dataRole.description}
          className={style.description.tailwinds}
        >
          {content.description}
        </p>
      )}
    </div>
  );
}
