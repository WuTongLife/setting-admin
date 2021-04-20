import { Button } from 'antd';
import { bindAccess } from './hoc';
import LinkButton from './LinkButton';
import PopconfirmButton from './PopconfirmButton';

const AccessButton = bindAccess(Button);
const AccessLinkButton = bindAccess(LinkButton);
const AccessPopconfirmButton = bindAccess(PopconfirmButton);

export { PopconfirmButton, LinkButton, AccessLinkButton, AccessPopconfirmButton, AccessButton };
