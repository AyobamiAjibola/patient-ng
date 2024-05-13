'use client';

import PTable from "@/app/components/Table";
import { setMenuIndex } from "@/lib/atoms";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const crowdData = [
  {
    id: 1,
    title: 'For the health of Kadir',
    beneficiary: 'Ayokunle Kadir',
    status: 'pending'
  },
  {
    id: 2,
    title: 'For the health of Chi',
    beneficiary: 'Charly Chi',
    status: 'active'
  },
  {
    id: 3,
    title: 'For the health of Abu',
    beneficiary: 'Emeka Abu',
    status: 'refused'
  }
];

export default function Crowdfunding() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);

  useEffect(() => {
    setCurrentIndex(1)
  },[]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <PTable
        //@ts-ignore
        data={crowdData}
      />
    </Box>
  )
}
