'use client';

import PButton from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { setMenuIndex } from "@/lib/atoms";
import { wordBreaker } from "@/lib/helper";
import { CalendarToday, Star, StarOutline } from "@mui/icons-material";
import { Box, Rating, Typography, useTheme } from "@mui/material";
import { Tag } from "antd";
import capitalize from "capitalize";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const reviews = [
  {
    hospital: 'Vine Clinic',
    review: `To a general advertiser outdoor advertising is worthy of consideration. Outdoor advertising is considered as the oldest form of advertising. Posting bills on wooden boards in the late 19th century led to the birth of the term billboard. Today, outdoor advertising includes`,
    rating: 4,
    date: '26th Oct 2023',
    status: 'Pending'
  },
  {
    hospital: 'Socale Clinic',
    review: `To a general advertiser outdoor advertising is worthy of consideration. Outdoor advertising is considered as the oldest form of advertising. Posting bills on wooden boards in the late 19th century led to the birth of the term billboard. Today, outdoor advertising includes`,
    rating: 2,
    date: '26th Oct 2023',
    status: 'Approved'
  },
  {
    hospital: 'General Clinic',
    review: `To a general advertiser outdoor advertising is worthy of consideration. Outdoor advertising is considered as the oldest form of advertising. Posting bills on wooden boards in the late 19th century led to the birth of the term billboard. Today, outdoor advertising includes`,
    rating: 3,
    date: '26th Oct 2023',
    status: 'Refused'
  }
]

export default function Reviews() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentIndex(2)
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
        reviews.map((review: any, index: number) => (
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
              <Typography
                sx={{
                  fontSize: theme.typography.labellg.fontSize,
                  fontWeight: theme.typography.labellg.fontWeight
                }}
              >
                {review.hospital}
              </Typography>
              <Tag 
                color={review.status.toLowerCase() === 'approved'
                        ? 'success'
                        : review.status.toLowerCase() === 'refused'
                          ? 'error'
                          : 'warning'
                      }
              >
                {capitalize.words(review.status)}
              </Tag>
            </Box>

            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize,
                lineHeight: theme.typography.labelsm.lineHeight,
                color: theme.palette.secondary.light
              }}
            >
              {wordBreaker(review.review, 40)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CalendarToday sx={{color: theme.palette.secondary.light, fontSize: '18px'}}/>
                <Typography
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: theme.typography.labelxs.fontSize
                  }}
                >
                  {review.date}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* <Star sx={{color: theme.palette.secondary.light, fontSize: '18px'}}/> */}
                <Rating
                  name="half-rating-read"
                  size={'small'}
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  sx={{ color: theme.palette.state.warning }}
                />
              </Box> 
            </Box>

            {review.status.toLowerCase() !== 'approved' && 
            (<PButton transBg={true} bg={false} width='10%'
              onClick={() => router.push(`/account/reviews/${index}`)}
            >
              Modify
            </PButton>)}
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
        {reviews.length !== 0 && (<Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />)}
      </Box>
    </Box>
  )
}
