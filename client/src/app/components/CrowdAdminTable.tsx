'use client';

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { formAmount } from '@/lib/helper';

interface IProps {
  title: string,
  date: string,
  createdBy: string,
  amount: string,
  status: string,
  location: string,
  action: string
}

const CrowdAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title & Date Created',
      key: 'title',
      render: (_, record) => {
        return (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant='labelxs'>
              {record.title}
            </Typography>
            <Typography variant='paragraphxs'>
              {record.date}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Fundraising for',
      key: 'fundraisingFor',
      render: (_, record) => {
        return (
          <Tag>
            {record.fundraisingFor}
          </Tag>
      )},
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => {
        return (
          <Typography variant='paragraphsm'>
            {formAmount(record.amount)}
          </Typography>
      )},
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <Typography variant='paragraphsm' color={'#FFCB00'}>
            {record.status}
          </Typography>
      )},
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const dataWithKeys = data.map((item: any, index: number) => ({ ...item, key: index }));

  return (
    <Table 
      columns={columns} 
      dataSource={dataWithKeys}
      style={{
        overflowY: 'scroll'
      }}
    />
  )};

export default CrowdAdminTable;