import { request } from 'umi';

export async function allMenus() {
  return request('/api/menu/list');
}

export async function createMenu(params: Entity.MenuEntity) {
  return request<API.Response>('/api/menu/create', { method: 'POST', data: params });
}

export async function updateMenu(params: Entity.MenuEntity) {
  return request<API.Response>('/api/menu/update', { method: 'PUT', data: params });
}

export async function detailMenu(id: number) {
  return request<API.Response<Entity.MenuEntity>>(`/api/menu/${id}/detail`);
}

export async function deleteMenu(id: number) {
  return request<API.Response>(`/api/menu/${id}/delete`, { method: 'DELETE' });
}
