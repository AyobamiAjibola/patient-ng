'use client';

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { IconButton } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const PTable: React.FC = ({data}: any) => {
  const router = useRouter();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Beneficiary',
      dataIndex: 'beneficiary',
      key: 'beneficiary',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
          return (
              <Tag 
                  color={
                      record.status === 'refused' 
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
      
        const handleDelete = (id: number) => {
          console.log(id, 'isddd')
        }
  
        return (
          <Space size="middle">
            <IconButton onClick={() => handleViewCrowdFunding(record.id)}>
                <Visibility 
                    sx={{
                        color: '#004146',
                        fontSize: '20px'
                    }}
                />
            </IconButton>
            <IconButton onClick={() => handleDelete(record.id)}>
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