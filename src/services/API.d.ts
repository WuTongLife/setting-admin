declare namespace API {
  export interface Response<T = any> {
    statusCode?: number;
    data?: T;
    [key: string]: any;
  }
  export interface IPaginationParams<T = any> {
    current: number;
    pageSize: number;
    filters?: T;
  }

  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
    username?: string;
  };

  export type LoginStateType = {
    status?: 'ok' | 'error';
    type?: string;
    code?: number;
    data?: {
      token: string;
    };
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
}

declare namespace Entity {
  export interface UserEntity {
    id: number;
    password: string;
    username: string;
    nickname: string;
    phoneNum: string;
    email: string;
    status: boolean;
    avatar: string;
    deptId?: number;
    // dept: DeptEntity;
    userRoles?: any[];
    createDate: Date;
    updateDate: Date;
  }

  export interface MenuEntity {
    /** 上级部门ID, 无则默认为 0 */
    parentId: number;

    /** 菜单名称 */
    name: string;

    /** 权限标识 */
    perms: string;

    /** 菜单类型， 1. 菜单/目录 2 tabs 3 按钮 */
    type: number;

    /** 菜单按钮唯一标识 */
    code: string;

    /** 路由 */
    route?: string;

    /** 图标 */
    icon?: string;

    /** 排序 */
    orderNum: number;

    child?: MenuEntity[];
  }
}
