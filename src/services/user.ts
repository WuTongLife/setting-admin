import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

export async function userPageList({ current, pageSize, filters }: API.IPaginationParams) {
  return request(`/api/user/${current}/${pageSize}/list`, {
    method: 'POST',
    data: filters,
  });
}

export async function userDelete(id: number) {
  return request(`/api/user/delete/${id}`, { method: 'DELETE' });
}

export async function userCreate(user: any) {
  return request(`/api/user/create`, { method: 'POST', data: user });
}
export async function userUpdate(user: any) {
  return request(`/api/user/update`, { method: 'POST', data: user });
}
