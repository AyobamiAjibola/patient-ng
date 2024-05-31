'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const AwardAdminTable: React.FC = ({data, setIsEdit, setOpenModal, setDeleteModalOpen}: any) => {
  const theme = useTheme();

  const handleAward = () => {
    setIsEdit(true)
    setOpenModal(true)
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Award name',
      key: 'awardName',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.awardName}
          </Typography>
      )},
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.recipient}
          </Typography>
      )},
    },
    {
      title: 'Date Recieved',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.dateRecieved}
          </Typography>
      )},
    },
    {
      title: 'Nominees',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.nominees}
          </Typography>
      )},
    },
    {
      title: 'Category',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.category}
          </Typography>
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
            <IconButton onClick={handleAward}>
              <Edit sx={{color: theme.palette.primary.main}}/>
            </IconButton>
            <IconButton onClick={() => setDeleteModalOpen(true)}>
              <Delete sx={{color: theme.palette.state.error}}/>
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
        overflowY: 'scroll'
      }}
    />
  )};

export default AwardAdminTable;