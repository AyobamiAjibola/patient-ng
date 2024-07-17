'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';

const HospitalTable: React.FC = ({data, handleDelete, isLoading}: any) => {
  const theme = useTheme();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Hospital',
      key: 'hospitalName',
      render: (_, record) => {
        return (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${record.image}`}
              alt='hospital image'
              crossOrigin='anonymous'
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
            />
            <Typography variant='labelxs' className='capitalize'>
              {record.hospitalName}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Address',
      key: 'address',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' className='capitalize'>
            {record.address} 
          </Typography>
        )
      }
    },
    {
      title: 'Services',
      key: 'services',
      render: (_, record) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {record.services.map((service: string, index: number) => (
              <Tag key={service}>
                {service} 
              </Tag>
            ))}
          </Box>
        )
      }
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.email} 
          </Typography>
        )
      }
    },
    {
      title: 'Phone',
      key: 'phone',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.phone} 
          </Typography>
        )
      }
    },
    {
      title: 'Website',
      key: 'website',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.website} 
          </Typography>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        
        return (
          <Typography variant='labelxs' color='red'
            onClick={()=>handleDelete(record._id)}
            sx={{
              cursor: 'pointer'
            }}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
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

export default HospitalTable;