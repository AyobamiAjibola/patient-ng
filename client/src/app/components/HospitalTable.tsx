'use client';

import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Typography, useTheme } from '@mui/material';

const HospitalTable: React.FC = ({data, handleDelete, isLoading}: any) => {
  const theme = useTheme();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Hospital',
      key: 'hospitalName',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' className='capitalize'>
            {record.hospitalName}
          </Typography>
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