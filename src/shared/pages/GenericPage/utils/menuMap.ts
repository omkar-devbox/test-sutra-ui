import { SIDEBAR_MENU } from "@/app/menu/menuItems";

// flatten menu into path -> label map
export const buildPathMap = () => {
  const map = new Map<string, string>();

  const traverse = (items: any[]) => {
    for (const item of items) {
      if (item.path) map.set(item.path, item.label);
      if (item.children) traverse(item.children);
    }
  };

  for (const section of SIDEBAR_MENU) {
    traverse(section.items);
  }

  return map;
};

// build once (static menu assumed)
export const PATH_LABEL_MAP = buildPathMap();
