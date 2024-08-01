'use client';

import Pagination from "@/app/components/Pagination";
import { wordBreaker } from "@/lib/helper";
import { Box, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGeAllReviews } from "../hooks/insightHook/useInsight";
import moment from "moment";

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery('(max-width: 900px)');
  const router = useRouter();
  const reviewsMutation = useGeAllReviews();
  const [insights, setInsights] = useState<any>([]);

  const insightItemsPerPage = insights.length ? 10 : insights.length;
  const insightTotalPages = Math.ceil(insights.length / insightItemsPerPage);
  const insightStartIndex = (currentPage - 1) * insightItemsPerPage;
  const insightEndIndex = Math.min(insightStartIndex + insightItemsPerPage, insights.length);
  const insightCurrentData = insights.slice(insightStartIndex, insightEndIndex);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const handleFetchInsights = async () => {
      await reviewsMutation.mutateAsync({}, {
        onSuccess: (response: any) => {
          console.log(response, 'response')
          setInsights(response.results)
        }
      })
    }
    handleFetchInsights();
  },[]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Reviews
      </Typography>

      <Box
        sx={{
          display: 'flex',
          p: 4,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          borderRadius: theme.borderRadius.sm,
          mt: 1, gap: 3,
          flexDirection: 'column'
        }}
      >
        { insightCurrentData.map((review: any, index: number) => (
            <Box key={index}
              onClick={() => router.push(`/rating-and-review/${review._id}`)}
              sx={{
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.palette.secondary.lighter}`,
                display: 'flex',
                flexDirection: 'column',
                px: 3, gap: 2, py: 2,
                cursor: 'pointer',
                "&:hover": {
                  border: `1px solid ${theme.palette.primary.main}`,
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="labelxl">
                    {review.hospital.hospitalName}
                  </Typography>
                  {!isMobile && (<Typography variant="labelxxs" color={theme.palette.secondary.light}>
                    {review.createdAt ? moment(review.createdAt).fromNow() : 'Today' }
                  </Typography>)}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    size={'small'}
                    value={+review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: '#FFCB00' }}
                  />
                    {/* <Typography color={theme.palette.secondary.light} variant='labelxs'>
                      {review.reviews.length} Reviews
                    </Typography> */}
                </Box>
              </Box>
              <Typography variant="paragraphxs" color={theme.palette.secondary.light} mt={-2} className="capitalize">
                {review.hospital.state}, {review.hospital.lga}
              </Typography>
              <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                  {wordBreaker(review.review, isMobile ? 10 : 30)}{review.review.length > 30 ? '...' : ''}
              </Typography>
              <Typography className="capitalize" variant="labelxxs" color={theme.palette.secondary.light} mt={isMobile ? 1 : 3}>
                  Written by {review.user.firstName} {review.user.lastName}
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
          {insights.length !== 0 && (<Pagination
            currentPage={currentPage}
            totalPages={insightTotalPages}
            onPageChange={handlePageChange}
          />)}
        </Box>
      </Box>
    </Box>
  )
}
