/**
 * 转成树状结构
 * @param primaryKey 主键
 */
export const toTreeData = <T>({ primaryKey }: { primaryKey: string }) => (
  data: IUtil.TreeData<T>[],
  parentId: number = 0,
): IUtil.TreeData<T>[] => {
  return data
    .filter((d) => d.parentId === parentId)
    .map((d) => {
      const temp = toTreeData({ primaryKey })(data, d[primaryKey]);
      return { ...d, children: temp.length === 0 ? undefined : temp };
    });
};
