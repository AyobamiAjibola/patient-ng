'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import capitalize from 'capitalize';
import OnlineBadge from './OnlineBadge';
import moment from 'moment';
import { useSession } from 'next-auth/react';

const PodcastAdminTable: React.FC = ({data, setIsEdit, setOpenModal, setPodcastId, setIsStatus}: any) => {
  const theme = useTheme();
  const {data: session} = useSession();

  const handleWebinarEdit = (id: string) => {
    setIsEdit(true)
    setOpenModal(true)
    setPodcastId(id)
  }

  const handleChangeStatus = (id: string) => {
    setIsStatus(true)
    setPodcastId(id)
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Podcast title',
      key: 'title',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' className='capitalize'>
            {record.title}
          </Typography>
      )},
    },
    {
      title: 'Release date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {moment(record.releaseDate).format('DD MMM YY')}
          </Typography>
      )},
    },
    {
      title: 'Duration',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.duration}
          </Typography>
      )},
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <>
          { record.status === 'on-going'
            ? (<OnlineBadge>
                <Tag
                  style={{
                    color: theme.palette.primary.main  
                  }}
                >
                  {capitalize.words(record.status)}
                </Tag>
              </OnlineBadge>
            ) : (
              <Tag
                style={{
                  color: record.status === "draft"
                          ? theme.palette.primary.darker  
                          : record.status === 'published' 
                            ? theme.palette.primary.main  
                            : theme.palette.state.error

                }}
              >
                {capitalize.words(record.status)}
              </Tag>
            )}
          </>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Box
            sx={{
              display: 'flex', gap: 2,
              alignItems: 'center',
            }}
          >
            <Typography variant='labelxs'
              onClick={()=>handleWebinarEdit(record._id)}
              sx={{
                cursor: !session?.user.userType.includes('podcast') ? 'default' : 'pointer',
                color: !session?.user.userType.includes('podcast') ? theme.palette.border.main : theme.palette.primary.darker,
                '&:hover': {
                  color: !session?.user.userType.includes('podcast') ? theme.palette.border.main : theme.palette.primary.darker
                }
              }}
            >
              View details
            </Typography>
            <Typography variant='labelxs'
              color={theme.palette.primary.main}
              onClick={()=>handleChangeStatus(record._id)}
              sx={{
                cursor: !session?.user.userType.includes('podcast') ? 'default' : 'pointer',
                color: !session?.user.userType.includes('podcast') ? theme.palette.border.main : theme.palette.primary.main,
                '&:hover': {
                  color: !session?.user.userType.includes('podcast') ? theme.palette.border.main : theme.palette.primary.main
                }
              }}
            >
              Change Status
            </Typography>
          </Box>
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

export default PodcastAdminTable;