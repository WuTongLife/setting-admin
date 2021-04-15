// 数据库menu的code和route的access对应
const initAuth: MenuAuth = {
  system: false,
  system_user: false,
  system_user_add: false,
  system_user_list: false,
  system_user_edit: false,
  system_user_detail: false,
  system_user_delete: false,
  system_menu: false,
};

// src/access.ts
export default function access(initialState: {
  currentUser?: API.CurrentUser | undefined;
  menuData?: Entity.MenuEntity[];
}): MenuAuth {
  const { menuData, currentUser } = initialState || {};
  const obj = initAuth;
  if (currentUser?.username === 'admin') {
    Object.keys(initAuth).forEach((i) => {
      obj[i] = true;
    });
  }
  return currentUser?.username === 'admin' ? obj : getAuth(menuData);
}

function getAuth(menuData: Entity.MenuEntity[] = []): MenuAuth {
  let obj: MenuAuth = initAuth;
  menuData.forEach((item) => {
    obj[item.code] = true;
    if (item.child && item.child.length > 0) {
      const temp = getAuth(item.child);
      obj = { ...obj, ...temp };
    }
  });
  return obj;
}

interface MenuAuth {
  /** 系统管理 */
  system: boolean;

  /** 用户管理 */
  system_user: boolean;
  /** 用户管理---列表 */
  system_user_list: boolean;
  /** 用户管理---新增 */
  system_user_add: boolean;
  /** 用户管理---修改 */
  system_user_edit: boolean;
  /** 用户管理---详情 */
  system_user_detail: boolean;
  /** 用户管理---删除 */
  system_user_delete: boolean;

  /** 菜单管理 */
  system_menu: boolean;

  [key: string]: boolean;
}

/**
 * system 系统管理
 *
 * system_user 用户管理
 *
 * system_menu 菜单管理
 */
declare type MenuKeys = keyof MenuAuth;
