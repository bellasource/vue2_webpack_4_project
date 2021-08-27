/**
 * 按需引入element-ui
 */

import Vue from 'vue';
import {
  Button,
  Popover,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  Divider,
  Popconfirm,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Drawer,
  Message,
  Notification,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  Tree,
  Main,
  Container,
  Aside,
  Tabs,
  TabPane,
  CascaderPanel,
  Header,
  Tooltip,
  MessageBox,
  Loading,
  Upload,
  TimePicker,
  DatePicker,
  Cascader,
  InputNumber,
  Row,
  Col,
  Tag,
  InfiniteScroll,
} from 'element-ui';
import './index.scss';

Vue.use(Button);
Vue.use(Popover);
Vue.use(Avatar);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Popconfirm);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(Tree);
Vue.use(Main);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(CascaderPanel);
Vue.use(Header);
Vue.use(Tooltip);
Vue.use(Loading);
Vue.use(Upload);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Cascader);
Vue.use(InputNumber);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.use(InfiniteScroll);

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
