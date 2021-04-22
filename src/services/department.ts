import { request } from 'umi';

export async function allDepartment() {
  return request('/api/dept/list');
}

export async function createDepartment(params: Entity.DepartmentEntity) {
  return request<API.Response>('/api/dept/create', { method: 'POST', data: params });
}

export async function updateDepartment(params: Entity.DepartmentEntity) {
  return request<API.Response>('/api/dept/update', { method: 'PUT', data: params });
}

export async function detailDepartment(id: number) {
  return request<API.Response<Entity.DepartmentEntity>>(`/api/dept/${id}/detail`);
}

export async function deleteDepartment(id: number) {
  return request<API.Response>(`/api/dept/${id}/delete`, { method: 'DELETE' });
}
