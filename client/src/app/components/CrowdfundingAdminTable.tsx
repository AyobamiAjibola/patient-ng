'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { characterBreaker, formAmount } from '@/lib/helper';
import { useAtom } from 'jotai';
import { useAdminUser, useCrowdStatus } from '@/lib/atoms';

const CrowdfundingAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setIsAdmin] = useAtom(useAdminUser);
  const [__, setCrowdStatus] = useAtom(useCrowdStatus);

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
              {isMobile ? characterBreaker(record.title, 10) : characterBreaker(record.title, 20)}...
            </Typography>
            <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
              {record.date}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Created by',
      key: 'createdBy',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.createdBy}
          </Typography>
      )},
    },
    {
      title: 'Fundraising for',
      dataIndex: 'fundraiserFor',
      key: 'fundraiserFor',
      render: (_, record) => {
        return (
          <Tag>
            {record.fundraiserFor}
          </Tag>
      )},
    },
    {
      title: 'Amount',
      dataIndex: 'amountNeeded',
      key: 'amountNeeded',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {formAmount(record.amountNeeded)}
          </Typography>
      )},
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag
            style={{
              color: record.status === "Pending"
                      ? theme.palette.state.warning
                      : record.status === "Active"
                        ? theme.palette.primary.main
                        : theme.palette.state.error
            }}  
          >
            {record.status}
          </Tag>
      )},
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.location}
          </Typography>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleUser = () => {
          setCrowdStatus(record.status)
          setIsAdmin(true)
          router.push(`/crowdfunding/${record._id}`)
        }
        return (
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
      )},
    },
  ];

  const dataWithKeys = data.map((item: any) => ({ ...item, key: item._id }));

  return (
    <Table 
      columns={columns} 
      dataSource={dataWithKeys}
      style={{
        overflowY: 'scroll'
      }}
    />
  )};

export default CrowdfundingAdminTable;