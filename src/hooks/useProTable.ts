import type { SortOrder } from 'antd/lib/table/interface';
import type { ProTableProps, ActionType } from '@ant-design/pro-table';
import { useRef } from 'react';

declare type fetchTable<T> = (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  sort: Record<string, SortOrder>,
  filter: Record<string, React.ReactText[]>,
) => Promise<{ data: T[]; success: boolean; total: number }>;

interface IUseProTable<T> {
  tableAPI: (params: API.IPaginationParams) => Promise<API.Response<API.IResponseTable<T>>>;
}

const useProTable = <T>({
  tableAPI,
}: IUseProTable<T>): {
  request: fetchTable<T>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
} & ProTableProps<T, {}> => {
  const actionRef = useRef<ActionType>();
  const initTable: fetchTable<T> = async ({ pageSize = 10, current = 1, keyword, ...other }, sort, filter) => {
    console.log(filter, sort, other);
    const response = await tableAPI({ pageSize, current, filters: { ...other, keyword, sort } });
    return { data: response.data?.list || [], success: response.statusCode === 200, total: response.data?.total || 0 };
  };

  return {
    request: initTable,
    pagination: {
      showQuickJumper: true,
      pageSize: 10,
    },
    bordered: true,
    actionRef,
  };
};

export default useProTable;
