'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';
import capitalize from 'capitalize';
import OnlineBadge from './OnlineBadge';
import moment from 'moment';

const WebinarAdminTable: React.FC = ({data, setIsEdit, setOpenModal, setWebinarId}: any) => {
  const theme = useTheme();

  const handleWebinarEdit = (id: string) => {
    setIsEdit(true)
    setOpenModal(true)
    setWebinarId(id)
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Webinar Name',
      key: 'name',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' className='capitalize'>
            {record.title}
          </Typography>
      )},
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light} className='capitalize'>
            {record.user.firstName} {record.user.lastName}
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
              {moment(record.webinarDateTime).format('DD MMM YY')}
            </Typography>
            <Typography variant='labelxs' color={theme.palette.secondary.light}>
              {moment(record.webinarDateTime).format('HH:mm')}
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
                <Tag color={"green"}>
                  {capitalize.words(record.status)}
                </Tag>
              </OnlineBadge>
            ) : (
              <Tag 
                color={record.status === "completed"
                ? "lime"  
                : record.status === "pending"
                  ? "gold"
                  : "geekblue"}
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