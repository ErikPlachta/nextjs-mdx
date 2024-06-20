import Link from "next/link";

export default function Navigation({
  content,
  style,
  dataRole,
}: {
  content: any;
  style: any;
  dataRole: any;
}) {
  return (
    <nav
      data-role={dataRole.nav}
      className={
        style?.nav?.tailwinds ||
        `md:m-t-auto z-40 w-full bg-slate-100 p-2 backdrop-blur md:bg-transparent md:backdrop-blur-none md:backdrop-filter-none dark:bg-slate-800/70 md:dark:bg-transparent`
      }
    >
      <ul
        data-role={dataRole.navList}
        className={
          style?.navList?.tailwinds ??
          `space-evenly pointer-events-auto z-40 flex w-full flex-row justify-center gap-8 md:justify-end md:gap-4`
        }
      >
        {content?.nav?.map((item: any, index: any): any => {
          return (
            <li
              key={index}
              data-role={dataRole.navItem}
              className={
                style?.navItem?.tailwinds ??
                `text-md w-[500px] rounded-lg bg-transparent p-2 shadow-xl shadow-slate-900/30 md:w-[auto] md:text-nowrap md:shadow-none`
              }
            >
              <Link
                key={index}
                data-role={dataRole.navLink}
                className={
                  style?.navLink?.tailwinds ??
                  "flex flex-col items-center gap-1 text-center hover:text-blue-500 active:text-blue-300 md:flex-row"
                }
                // TODO 2023-08-26 | Add active vs not active class for nav items.
                href={item.href}
                aria-label={item.label}
                title={item.title}
              >
                <span
                  data-role={dataRole.navIcon}
                  className={
                    style?.navIcon?.tailwinds || "h-5 w-5 md:h-4 md:w-4"
                  }
                >
                  {item.icon()}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
