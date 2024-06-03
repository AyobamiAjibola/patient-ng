'use client';

import PButton from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { setMenuIndex } from "@/lib/atoms";
import { wordBreaker } from "@/lib/helper";
import { Box, Typography, useTheme } from "@mui/material";
import { Tag } from "antd";
import capitalize from "capitalize";
import { useAtom } from "jotai";
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(advocacy.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

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
      {
        advocacy.map((advocacy: any, index: number) => (
          <Box
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
                color={advocacy.status.toLowerCase() === 'approved'
                        ? 'success'
                        : advocacy.status.toLowerCase() === 'closed'
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
                router.push(`/account/advocacy/${index}`)
              }}
            >
              Modify
            </PButton>
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
