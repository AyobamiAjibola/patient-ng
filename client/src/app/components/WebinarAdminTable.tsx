'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';
import capitalize from 'capitalize';
import OnlineBadge from './OnlineBadge';

const WebinarAdminTable: React.FC = ({data, setIsEdit, setOpenModal}: any) => {
  const theme = useTheme();

  const handleWebinarEdit = () => {
    setIsEdit(true)
    setOpenModal(true)
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Webinar Name',
      key: 'name',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.name}
          </Typography>
      )},
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.author}
          </Typography>
      )},
    },
    {
      title: 'Date and Time',
      render: (_, record) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant='labelxs'>
              {record.date}
            </Typography>
            <Typography variant='labelxs' color={theme.palette.secondary.light}>
              {record.time}
            </Typography>
          </Box>
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
                  color: record.status === "completed"
                          ? theme.palette.primary.darker  
                          : record.status === "pending"
                            ? theme.palette.state.warning
                            : theme.palette.border.main
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
              Open
            </Typography>
            <IconButton>
              <Delete sx={{color: 'red', fontSize: theme.typography.labelsm}}/>
            </IconButton>
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
        overflow: 'scroll'
      }}
    />
  )};

export default WebinarAdminTable;