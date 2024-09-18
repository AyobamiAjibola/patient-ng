'use client';

import { useGetUserInsights } from "@/app/admin/hooks/insightHook/useInsight";
import PButton from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { setMenuIndex } from "@/lib/atoms";
import { wordBreaker } from "@/lib/helper";
import { CalendarToday, HourglassEmpty, Star, StarOutline } from "@mui/icons-material";
import { Box, Rating, Typography, useTheme } from "@mui/material";
import { Tag } from "antd";
import capitalize from "capitalize";
import { useAtom } from "jotai";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const insightMutation = useGetUserInsights();
  const {data: session} = useSession();
  const [reviews, setReviews] = useState<any[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const fetchReview = async () => {
    await insightMutation.mutateAsync(session?.user.userId, {
      onSuccess: (response: any) => {
        setReviews(response.results)
      } 
    })
  }

  useEffect(() => {
    fetchReview()
  },[session]);

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
      { reviews.length > 0
          ?  (reviews.map((review: any, index: number) => (
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
                  {capitalize.words(review.hospital.hospitalName)}
                </Typography>
                {/* <Tag 
                  color={ review.review.status.toLowerCase() === 'Approved'
                          ? 'success'
                          : review.review.status.toLowerCase() === 'Rejected'
                            ? 'error'
                            : 'warning'
                        }
                >
                  {capitalize.words(review.review.status)}
                </Tag> */}
              </Box>

              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  lineHeight: theme.typography.labelsm.lineHeight,
                  color: theme.palette.secondary.light
                }}
              >
                {wordBreaker(review.review.review, 40)}
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
                    {moment(review.review.createdAt).format('DD MMM YY')}
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
                    value={review.review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: theme.palette.state.warning }}
                  />
                </Box> 
              </Box>

              {/* <PButton transBg={true} bg={false} width='10%'
                onClick={() => router.push(`/account/patient-feedback/${review.review._id}`)}
              >
                Modify
              </PButton> */}
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
        {reviews.length !== 0 && (<Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />)}
      </Box>
    </Box>
  )
}
