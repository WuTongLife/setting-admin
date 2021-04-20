declare namespace IUtil {
  type TreeData<T> = {
    parentId: number;
    children?: TreeData<T>[];
    [key: string]: any;
  } & T;
}
