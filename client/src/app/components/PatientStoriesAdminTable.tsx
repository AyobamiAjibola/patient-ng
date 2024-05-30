'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import capitalize from 'capitalize';

const PatientStoriesAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();
  const theme = useTheme();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Story title',
      key: 'title',
      render: (_, record) => {
        return (
          <Typography variant='labelxs'>
            {record.title}
          </Typography>
      )},
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'createdBy',
      render: (_, record) => {
        return (
          <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
            {record.author}
          </Typography>
      )},
    },
    {
      title: 'Submission date',
      dataIndex: 'submissionDate',
      render: (_, record) => {
        return (
          <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
            {record.submittedDate}
          </Typography>
      )},
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag
            style={{
              color: record.status === "published"
                      ? theme.palette.primary.main  
                      : record.status === "review"
                        ? theme.palette.state.warning
                        : theme.palette.state.error
            }}
          >
            {capitalize.words(record.status)}
          </Tag>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handle = () => {
          router.push(`/admin/patientstories/${record._id}`)
        }
        return (
          <Box
            sx={{
              display: 'flex', gap: 2,
              alignItems: 'center'
            }}
          >
            <Typography variant='labelxs'
              onClick={handle}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Open
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

export default PatientStoriesAdminTable;