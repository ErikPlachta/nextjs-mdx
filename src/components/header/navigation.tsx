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
        ` z-40  p-2 w-full md:m-t-auto bg-slate-100 dark:bg-slate-800/70 md:bg-transparent md:dark:bg-transparent backdrop-blur md:backdrop-blur-none md:backdrop-filter-none`
      }
    >
      <ul
        data-role={dataRole.navList}
        className={
          style?.navList?.tailwinds ??
          `pointer-events-auto z-40 flex flex-row gap-8 md:gap-4 w-full justify-center space-evenly md:justify-end`
        }
      >
        {content?.nav?.map((item: any, index: any): any => {
          return (
            <li
              key={index}
              data-role={dataRole.navItem}
              className={
                style?.navItem?.tailwinds ??
                `p-2 w-[500px] md:text-nowrap md:w-[auto] rounded-lg shadow-xl bg-transparent shadow-slate-900/30 md:shadow-none text-md`
              }
            >
              <Link
                key={index}
                data-role={dataRole.navLink}
                className={
                  style?.navLink?.tailwinds ??
                  "flex flex-col md:flex-row text-center items-center gap-1 hover:text-blue-500 active:text-blue-300"
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
