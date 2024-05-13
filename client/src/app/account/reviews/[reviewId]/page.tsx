'use client';

import InputField from '@/app/components/InputField';
import PButton from '@/app/components/PButton';
import { customStyles } from '@/constant/customStyles';
import { setMenuIndex } from '@/lib/atoms';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import Select from "react-select";

interface IProps {
    reviews: string;
    hospital: string;
    rating: number;
}

export default function page({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [data, setData] = useState<IProps>({
    reviews: '',
    hospital: '',
    rating: 0
  });

  useEffect(() => {
    setCurrentIndex(2)
  },[]);

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                width: '100%', gap: 4
            }}
        >
            <Box
                sx={{
                    width: isMobile ? '100%' : '50%'
                }}
            >
                <InputField
                    label="Hospital Name"
                    placeholder="Hospital name"
                    isBorder={true}
                    labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                    }}
                    onChange={(e) => setData({...data, hospital: e.target.value})}
                    value={data.hospital}
                />
            </Box>
            <Box
                sx={{
                    width: isMobile ? '100%' : '50%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight,
                        mb: '7px'
                    }}
                >
                    Rating
                </Typography>
                <Select
                    className="w-full h-10 font-light"
                    options={[
                        {value: 1, label: 1},
                        {value: 2, label: 2},
                        {value: 3, label: 3},
                        {value: 4, label: 4},
                        {value: 5, label: 5}
                    ]}
                    styles={customStyles}
                    placeholder="Choose bank"
                    name="bank"
                    onChange={(item) => {
                        setData({...data, rating: item?.value as number })
                    }}
                    value={{
                        value: data.rating,
                        label: data.rating
                    }}
                />
            </Box>
        </Box>

        <Box
            sx={{
                width: '100%'
            }}
        >
            <InputField
                label="Hospital review"
                placeholder="Hospital review"
                multiline={true}
                isBorder={true}
                labelStyle={{
                    fontSize: theme.typography.labelsm.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight
                }}
                rows={6}
                onChange={(e) => setData({...data, reviews: e.target.value})}
                value={data.reviews}
            />
        </Box>

        <PButton transBg={false} bg={true} width='20%'>
            Save
        </PButton>
    </Box>
  )
}
