import { request } from 'umi';

export async function allMenus() {
  return request('/api/menu/list');
}
