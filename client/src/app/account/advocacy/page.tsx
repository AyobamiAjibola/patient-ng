'use client';

import { useUsersAdvocacies } from "@/app/admin/hooks/advocacyHook/useAdvocacy";
import PButton from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { setMenuIndex } from "@/lib/atoms";
import { wordBreaker } from "@/lib/helper";
import { HourglassEmpty } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { Tag } from "antd";
import capitalize from "capitalize";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const advocacy = [
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'in-progress',
    complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
    refNumber: '#1234543'
  },
  {
    hospitalName: "ABC Hospital",
    address: "Chrismas street abuja",
    status: 'closed',
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
]

export default function Advocacy() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const advocacyMutation = useUsersAdvocacies();
  const [advocacies, setAdvocacies] = useState<any[]>([]);
  const {data: session} = useSession();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(advocacies.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const fetchAdvocacies = async () => {
    await advocacyMutation.mutateAsync(session?.user.userId, {
      onSuccess: (response: any) => {
        setAdvocacies(response.results)
      } 
    })
  }

  useEffect(() => {
    fetchAdvocacies()
  },[session]);

  useEffect(() => {
    setCurrentIndex(3)
  },[]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4, pb: 6,
        flexDirection: 'column'
      }}
    >
      { advocacies.length > 0
          ? (advocacies.map((advocacy: any, index: number) => (
              <Box key={advocacy._id}
                sx={{
                  width: '100%',
                  height: 'auto',
                  p: 4,
                  backgroundColor: theme.palette.secondary.lightest,
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  borderRadius: theme.borderRadius.sm,
                  display: 'flex', gap: 4, flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="labellg">
                    {advocacy.hospitalName}
                  </Typography>
                  <Tag 
                    color={advocacy.status === 'approved'
                            ? 'success'
                            : advocacy.status === 'closed'
                              ? 'error'
                              : 'warning'
                          }
                  >
                    {capitalize.words(advocacy.status)}
                  </Tag>
                </Box>

                <Typography variant="labelsm"
                  sx={{
                    color: theme.palette.secondary.light
                  }}
                >
                  {wordBreaker(advocacy.complaints, 40)}
                </Typography>

                
                <PButton transBg={true} bg={false} width='10%'
                  onClick={() => {
                    router.push(`/account/advocacy/${advocacy._id}`)
                  }}
                >
                  Modify
                </PButton>
              </Box>
            ))
          ) : (
            <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
              <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
              <Typography variant='paragraphlg' color={theme.palette.border.main}>
                  No Data
              </Typography>
            </Box>
          )
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
        {advocacies.length !== 0 && (<Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />)}
      </Box>
    </Box>
  )
}
