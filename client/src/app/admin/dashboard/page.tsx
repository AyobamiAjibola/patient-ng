'use client';

import { formAmount, formatNumberWithCommas } from "@/lib/helper";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DatePicker, Tag } from 'antd';
import CustomLineChart from "../../components/CustomChart";
import { useState } from "react";
import CrowdAdminTable from "../../components/CrowdAdminTable";
import { FiberManualRecord } from "@mui/icons-material";
import Pagination from "../../components/Pagination";

const item = [
  "Crowdfunding",
  "Advocacy"
]

const data = [
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Self"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Self"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Self"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Charity"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Someone else"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Self"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Self"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Someone else"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Someone else"
  },
  {
    title: "Save Osaze Odenwingie",
    date: "23 Oct 2023",
    createdBy: "Lisa Steve",
    amount: "100000000",
    status: "pending",
    location: "Abuja",
    action: "Open",
    fundraisingFor: "Someone else"
  }
];

const advocacy = [
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ZYX Hospital",
    address: "Chrismas street abuja",
    status: 'pending',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  }
]

export default function Dashboard() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const { RangePicker } = DatePicker;
  const [currentItem, setCurrentItem] = useState<string>('Crowdfunding');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = advocacy.length ? 10 : advocacy.length;

  const totalPages = Math.ceil(advocacy.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, advocacy.length);
  const currentData = advocacy.slice(startIndex, endIndex);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Typography variant={ md ? "h5" : "h4" }>
        Dashboard
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: md ? "column" : "row",
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          minHeight: '4rem',
          alignItems: md ? 'flex-start' : 'center',
          borderRadius: theme.borderRadius.sm,
          mt: 5, px: 4,
          gap: md ? 2 : 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',

          }}
        >
          <Typography variant="paragraphxs"
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            All users
          </Typography>
          <Typography variant="labellg">
            {formatNumberWithCommas(21250)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="paragraphxs"
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            Admin users
          </Typography>
          <Typography variant="labellg">
            {formatNumberWithCommas(10)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="paragraphxs"
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            Site visits
          </Typography>
          <Typography variant="labellg">
            {formatNumberWithCommas(21250)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="paragraphxs"
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            Insights
          </Typography>
          <Typography variant="labellg">
            {formatNumberWithCommas(21250)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="paragraphxs"
            sx={{
              color: theme.palette.secondary.light
            }}
          >
            Crowdfunding - Total raised
          </Typography>
          <Typography variant="labellg">
            {formAmount(1234645)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: md ? '40%' : '100%',
          mt: 5
        }}
      >
        <RangePicker />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          alignItems: md ? 'flex-start' : 'center',
          borderRadius: theme.borderRadius.sm,
          mt: 2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
            width: '100%',  px: 2, height: '3rem', display: 'flex', alignItems: 'center'
          }}
        >
          <Typography variant="labellg">
            All users
          </Typography>
        </Box>

        <Box sx={{p: 3, width: '100%', overflowX: 'scroll'}}>
          <CustomLineChart/>
        </Box>
      </Box>
      
      <Typography variant="labellg" mt={5}>
        Pending items
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          alignItems: md ? 'flex-start' : 'center',
          borderRadius: theme.borderRadius.sm,
          mt: 1,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '2rem',
            gap: 4, mt: 2, px: 2
          }}
        >
          {item.map((item: string, index: number) => (
            <Typography variant={ currentItem === item ? "labelsm" : "paragraphsm"} 
              key={index}
              onClick={() => setCurrentItem(item)}
              sx={{
                borderBottom: currentItem === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                color: currentItem === item
                  ? theme.palette.primary.main
                  : theme.palette.secondary.light,
                cursor: 'pointer'
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        { currentItem === 'Crowdfunding' 
          ? (<Box
                sx={{
                  width: '100%'
                }}
              >
              <CrowdAdminTable 
                //@ts-ignore
                data={data}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                height: 'auto',
                width: '100%',
                mt: 3, px: 2, py: 3
              }}
            >
              {
                currentData.map((item, index) => (
                  <Box key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: theme.borderRadius.sm,
                      border: `1px solid ${theme.palette.secondary.lighter}`,
                      p: 3, gap: 3
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2
                        }}
                      >
                        <Typography variant="labelsm">
                          {item.hospitalName}
                        </Typography>
                        <Tag>
                          <FiberManualRecord sx={{fontSize: '12px'}}/> {item.status}
                        </Tag>
                      </Box> 
                      <Typography variant="paragraphxs">
                        {item.refNumber}
                      </Typography>
                    </Box>
                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                      {item.address}
                    </Typography>
                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                      {item.complaints}
                    </Typography>
                  </Box>
                ))
              }
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5
              }}
            >
              {advocacy.length !== 0 && (<Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />)}
            </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}
