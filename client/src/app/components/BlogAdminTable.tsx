'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChatBubbleOutlineRounded, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import capitalize from 'capitalize';

const BlogAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();
  const theme = useTheme();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title',
      key: 'title',
      render: (_, record) => {
        return (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant='labelxs'>
              {record.title}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'createdBy',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.author}
          </Typography>
      )},
    },
    {
      title: 'Publication date',
      dataIndex: 'publicationDate',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.publicationDate}
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
                      : record.status === "draft"
                        ? "black"
                        : theme.palette.state.error
            }}
          >
            {capitalize.words(record.status)}
          </Tag>
      )},
    },
    {
      title: 'View, Likes, Comments',
      key: 'amount',
      render: (_, record) => {
        return (
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <Typography variant='labelxxs'>
              <RemoveRedEyeOutlined
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: '14px'
                }}
              /> {record.views}
            </Typography>
            <Typography variant='labelxxs'>
              <FavoriteBorderOutlined
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: '14px'
                }}
              /> {record.likes}
            </Typography>
            <Typography variant='labelxxs'>
              <ChatBubbleOutlineRounded
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: '14px'
                }}
              /> {record.comments}
            </Typography>
        </Box>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleUser = () => {
          router.push(`/admin/blog/${record.permLink}`)
        }
        return (
          <Box
            sx={{
              display: 'flex', gap: 2,
              alignItems: 'center'
            }}
          >
            <Typography variant='labelxs'
              onClick={handleUser}
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

export default BlogAdminTable;