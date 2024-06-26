'use client';

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { IconButton, Typography } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { setFundraisingId } from '@/lib/atoms';

const PTable: React.FC = ({data, setOpen}: any) => {
  const router = useRouter();
  const [_, setCrowdId] = useAtom(setFundraisingId);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <Typography className='capitalize' variant='paragraphsm'>
            {record.title}
          </Typography>
        )
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <Typography className='capitalize' variant='paragraphsm'>
            {record.fundraisingFor}
          </Typography>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
          return (
              <Tag 
                  color={
                      record.status === 'inactive' 
                          ? 'error' 
                          : record.status === 'pending' 
                              ? 'warning'
                              : 'success'
                          }
              >
                  { record.status.toUpperCase() }
              </Tag>
          )
    }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
  
        const handleViewCrowdFunding = (id: number) => {
          router.push(`/account/crowdfunding/${id}`)
        }
  
        return (
          <Space size="middle">
            <IconButton onClick={() => handleViewCrowdFunding(record._id)}>
                <Visibility 
                    sx={{
                        color: '#004146',
                        fontSize: '20px'
                    }}
                />
            </IconButton>
            <IconButton onClick={() => {
              setOpen(true)
            }}
            onMouseEnter={()=>setCrowdId(record._id)}
            >
                <Delete 
                    sx={{
                        color: 'red',
                        fontSize: '20px'
                    }}
                />
            </IconButton>
          </Space>
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

export default PTable;