declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'react-loadable';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  __POWERED_BY_QIANKUN__?: boolean;
}
