'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import capitalize from 'capitalize';
import OnlineBadge from './OnlineBadge';

const PodcastAdminTable: React.FC = ({data, setIsEdit, setOpenModal}: any) => {
  const theme = useTheme();

  const handleWebinarEdit = () => {
    setIsEdit(true)
    setOpenModal(true)
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Podcast title',
      key: 'title',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
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
            {record.releaseDate}
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
              onClick={handleWebinarEdit}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              View details
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