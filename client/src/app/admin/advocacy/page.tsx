'use client';

import Pagination from "@/app/components/Pagination";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetAdvocacies } from "../hooks/advocacyHook/useAdvocacy";

const items = [
  "Pending",
  "In progress",
  "Closed"
];

// const advocacy = [
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'in-progress',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'in-progress',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'closed',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'closed',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'closed',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'closed',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'pending',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'pending',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ABC Hospital",
//     address: "Chrismas street abuja",
//     status: 'pending',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   },
//   {
//     hospitalName: "ZYX Hospital",
//     address: "Chrismas street abuja",
//     status: 'pending',
//     complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
//     refNumber: '#1234543'
//   }
// ]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const [currentItem, setCurrentItem] = useState<string>('Pending');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [adv, setAdv] = useState<any>([]);
  const {data: session} = useSession();
  const getAdvocaciesMutation = useGetAdvocacies();

  const itemsPerPage = adv.length ? 10 : adv.length;
  const totalPages = Math.ceil(adv.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, adv.length);
  const currentData = adv.slice(startIndex, endIndex);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if(getAdvocaciesMutation.isSuccess) {
      if(currentItem === "Pending") {
        const filteredData = getAdvocaciesMutation.data?.results && getAdvocaciesMutation.data?.results.filter((advocacy) => advocacy.status === "pending");
        setAdv(filteredData)
      } else if(currentItem === "In progress") {
        const filteredData = getAdvocaciesMutation.data?.results && getAdvocaciesMutation.data?.results.filter((advocacy) => advocacy.status === "in-progress");
        setAdv(filteredData)
      } else if(currentItem === "Closed") {
        const filteredData = getAdvocaciesMutation.data?.results && getAdvocaciesMutation.data?.results.filter((advocacy) => advocacy.status === "closed");
        setAdv(filteredData)
      }
    }
  },[currentItem, getAdvocaciesMutation.isSuccess]);

  useEffect(() => {
    const handleAdvocacy = async () => {
      await getAdvocaciesMutation.mutateAsync({})
    }

    handleAdvocacy();
  },[session]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Advocacy
      </Typography>

      <Box
        sx={{
          display: 'flex',
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          borderRadius: theme.borderRadius.sm,
          mt: 1,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 4, mt: 2,
            alignItems: 'center',
            px: 2, mb: 2
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              gap: 4
            }}
          >
            {items.map((item: string, index: number) => (
              <Typography variant={ currentItem === item ? "labelsm" : "paragraphsm"} 
                key={index}
                onClick={() => setCurrentItem(item)}
                sx={{
                  borderBottom: currentItem === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                  color: currentItem === item
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
                  cursor: 'pointer',
                  height: '1.6rem'
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {currentData.length 
          ? ( <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    height: 'auto',
                    width: '100%',
                    px: 2, py: 3
                }}
              >
                { 
                  currentData.map((item: any, index: number) => (
                    <Box key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: theme.borderRadius.sm,
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        p: 3, gap: 3,
                        cursor: 'pointer',
                        '&:hover': {
                            border: `1px solid ${theme.palette.primary.main}`
                        }
                      }}
                      onClick={() => router.push(`/admin/advocacy/${item._id}`)}
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
                              <Tag
                                style={{
                                  color: item.status === 'in-progress'
                                          ? "blue"
                                          : item.status === 'pending'
                                            ? "gold"
                                            : "red"
                                }}
                                className="capitalize"
                              >
                                  <FiberManualRecord sx={{fontSize: '12px'}}/> {item.status}
                              </Tag>
                          </Box> 
                          <Typography variant="paragraphxs">
                              {item.reference || ''}
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
                    {adv.length !== 0 && (<Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />)}
                </Box>
              </Box>
          ) : (
            <Box pl={3} my={3}>
              <Typography variant='paragraphsm'>
                No data.
              </Typography>
            </Box>
          )}
      </Box>
    </Box>
  )
}
