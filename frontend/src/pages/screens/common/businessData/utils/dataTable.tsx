/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnsType } from 'antd/lib/table';
import {  Dropdown, Menu } from 'antd';
import { IItem } from '../../../../../redux/services/item/itemApi.interface';
import { MenuOutlined } from '@ant-design/icons';
import EditDataModal from '../EditDataModal';


const handleDelete = (data:IItem,deleteItem: ((arg0: any) => any)) => {
  if(data?.id && data.id != undefined){
    deleteItem(data.id);
  }
};

const formatDate = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-GB', options);
};



const actionMenu = (data: IItem,deleteItem: (arg0: any) => any) => (
  <Menu>
    <Menu.Item key="delete" onClick={() => handleDelete(data, deleteItem)}>
      Delete
    </Menu.Item>
    <Menu.Item key="edit">
      <EditDataModal data={data}/>
    </Menu.Item>
  </Menu>
);

const getColums = (deleteItem:any): ColumnsType<IItem> => {
  return [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (timestamp) => formatDate(parseInt(timestamp, 10)),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, data) => (
        <Dropdown overlay={actionMenu(data,deleteItem)} trigger={['click']}>
       <MenuOutlined />
      </Dropdown>
      ),
    },
  ];
};

const getData = (dataData: IItem[]): IItem[] => {
  return dataData.map(data => ({
    ...data,
    key: `${data.id}`,
  }));
};

const dataTable = {
  getColums,
  getData,
};

export default dataTable;
