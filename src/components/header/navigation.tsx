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
    <nav data-role={dataRole.nav} className={style.nav.tailwinds}>
      <ul data-role={dataRole.navList} className={style.navList.tailwinds}>
        {content?.nav?.map((item: any, index: any): any => {
          return (
            <li
              key={index}
              data-role={dataRole.navItem}
              className={style.navItem.tailwinds}
            >
              <Link
                key={index}
                data-role={dataRole.navLink}
                className={style.navLink.tailwinds}
                href={item.href}
                aria-label={item.label}
                title={item.title}
              >
                <span
                  data-role={dataRole.navIcon}
                  className={style.navIcon.tailwinds}
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
