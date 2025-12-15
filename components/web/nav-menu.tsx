"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "./context-api";

export const NavMenu = () => {
  const {
    NavbarMenuObject: { navbarMenu },
  } = useGlobalContext();
  const pathname = usePathname();

  const getHref = (id: string) => {
    switch (id) {
      case "saved":
        return "/snippets/saved";
      case "trash":
        return "/snippets/trash";
      default:
        return "/snippets";
    }
  };

  const isActive = (id: string, href: string) => {
    if (id === "snippets") {
      return pathname === href || pathname === "/snippets";
    }
    return pathname.startsWith(href);
  };

  return (
    <ul className="hidden lg:flex gap-4 items-center text-sm">
      {navbarMenu.map((menu) => {
        const href = getHref(menu.id);
        const active = isActive(menu.id, href);
        return (
          <li
            key={menu.id}
            className={`${
              active ? "text-foreground" : "text-muted-foreground"
            } hover:text-foreground duration-100 cursor-pointer`}
          >
            <Link href={href}>{menu.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};
