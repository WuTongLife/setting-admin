import { useModel } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  console.log(masterProps);
  return (
    <div>
      <h1 className={styles.title}>Page1 index</h1>
    </div>
  );
}
