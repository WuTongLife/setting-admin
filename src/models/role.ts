import { allRoles } from '@/services/role';
import { useBoolean } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

const useRole = () => {
  const [roleData, setRoleData] = useState<Entity.RoleEntity[]>([]);
  const [loading, loadingAction] = useBoolean(false);

  const fetchAllRoles = useCallback(async () => {
    loadingAction.setTrue();
    const res = await allRoles();
    if (res.statusCode === 200) {
      setRoleData(res.data || []);
    }
    loadingAction.setFalse();
  }, []);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  return { roleData, loading };
};

export default useRole;
