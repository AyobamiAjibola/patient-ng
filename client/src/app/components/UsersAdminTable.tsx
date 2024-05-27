'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { formAmount } from '@/lib/helper';
import Image from 'next/image';

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
              src={record.status === "active" ? "/active-user.png" : "/inactive-user.png"}
              alt="active/inactive user"
              width={20}
              height={20}
            />
            <Typography variant='labelxs'>
              {record.name}
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
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            {record.phoneNumber}
          </Typography>
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
            {record.gender}
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
            {record.state}
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

  const dataWithKeys = data.map((item: any) => ({ ...item, key: item._id }));

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