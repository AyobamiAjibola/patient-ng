'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { formAmount } from '@/lib/helper';
import moment from 'moment';

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
  const theme = useTheme();

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
            <Typography variant='labelxs' className='capitalize'>
              {record.title}
            </Typography>
            <Typography variant='paragraphxs'>
              {moment(record.createdAt).format('DD MMM YYYY')}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Created by',
      key: 'createdBy',
      render: (_, record) => {
        return (<Typography variant='labelxs' className='capitalize'>
          {record.user.firstName} {record.user.lastName} 
        </Typography>)
      }
    },
    {
      title: 'Fundraising for',
      key: 'fundraisingFor',
      render: (_, record) => {
        return (
          <Tag className='capitalize'>
            {record.fundraisingFor === `${record.user.firstName} ${record.user.lastName}` ? 'Self' : 'Someone else'}
          </Tag>
      )},
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => {
        return (
          <Typography variant='paragraphsm'>
            {formAmount(record.amountNeeded)}
          </Typography>
      )},
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <Typography variant='paragraphsm' color={'#FFCB00'} className='capitalize'>
            {record.status}
          </Typography>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleUser = () => {
          router.push(`/crowdfunding/${record._id}`)
        }
        return (
          <Typography variant='labelxs'
            onClick={handleUser}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            Open
          </Typography>
      )},
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