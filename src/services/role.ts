import { request } from 'umi';

export async function allRoles() {
  return request<API.Response<Entity.RoleEntity[]>>('/api/role/all');
}

export async function createRole(params: Entity.RoleEntity) {
  return request<API.Response>('/api/role/create', { method: 'POST', data: params });
}

export async function updateRole(params: Entity.RoleEntity) {
  return request<API.Response>('/api/role/update', { method: 'PUT', data: params });
}

export async function detailRole(id: number) {
  return request<API.Response<Entity.RoleEntity>>(`/api/role/${id}/detail`);
}

export async function deleteRole(id: number) {
  return request<API.Response>(`/api/role/${id}/delete`, { method: 'DELETE' });
}

export async function relationMenu(params: { roleId: number; menuIds: number[] }) {
  return request<API.Response>('/api/role/relationMenu', { method: 'POST', data: params });
}
