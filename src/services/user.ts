import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<API.Response<API.NoticeIconData[]>>('/api/notices');
}

export async function userPageList({ current, pageSize, filters }: API.IPaginationParams) {
  return request<API.Response>(`/api/user/${current}/${pageSize}/list`, {
    method: 'POST',
    data: filters,
  });
}

export async function userDelete(id: number) {
  return request<API.Response>(`/api/user/delete/${id}`, { method: 'DELETE' });
}

export async function userCreate(user: any) {
  return request<API.Response>(`/api/user/create`, { method: 'POST', data: user });
}
export async function userUpdate(user: any) {
  return request<API.Response>(`/api/user/update`, { method: 'POST', data: user });
}
