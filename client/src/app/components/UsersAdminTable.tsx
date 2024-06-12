'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import capitalize from 'capitalize';

const UsersAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();
  const theme = useTheme();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => {
        return (
          <Box 
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <Image
              src={record.active ? "/active-user.png" : "/inactive-user.png"}
              alt="active/inactive user"
              width={20}
              height={20}
            />
            <Typography variant='labelxs'>
              {capitalize.words(record.firstName)} {capitalize.words(record.lastName)}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            {record.email}
          </Typography>
      )},
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            {record.phone || ''}
          </Typography>
      )},
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag
            style={{
              color: record.active
                      ? theme.palette.primary.main  
                      : theme.palette.state.error
            }}
          >
            {record.active ? "Active" : "Inactive"}
          </Tag>
      )},
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'
            sx={{
              color: record.gender === "Male" ? "black" : "#CCA200"
            }}
          >
            {record.gender || ''}
          </Typography>
      )},
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            {record.state || ''}
          </Typography>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleUser = () => {
          router.push(`/admin/users/${record._id}`)
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

  const dataWithKeys = data?.map((item: any) => ({ ...item, key: item._id }));

  return (
    <Table 
      columns={columns} 
      dataSource={dataWithKeys}
      style={{
        overflowY: 'scroll'
      }}
    />
  )};

export default UsersAdminTable;