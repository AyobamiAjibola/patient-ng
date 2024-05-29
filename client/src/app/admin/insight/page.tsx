'use client';

import Pagination from "@/app/components/Pagination";
import { Box, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const insights = [
  {
      rating: 4,
      title: 'Good Insight',
      createdAt: '2h ago',
      content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
  },
  {
      rating: 4,
      title: 'Good Insight',
      createdAt: '2h ago',
      content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
  },
  {
      rating: 4,
      title: 'Good Insight',
      createdAt: '2h ago',
      content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
  }
]

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const insightItemsPerPage = insights.length ? 10 : insights.length;
  const insightTotalPages = Math.ceil(insights.length / insightItemsPerPage);
  const insightStartIndex = (currentPage - 1) * insightItemsPerPage;
  const insightEndIndex = Math.min(insightStartIndex + insightItemsPerPage, insights.length);
  const insightCurrentData = insights.slice(insightStartIndex, insightEndIndex);

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
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Advocacy
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
        {
          insightCurrentData.map((review, index) => (
            <Box key={index}
              sx={{
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.palette.secondary.lighter}`,
                display: 'flex',
                flexDirection: 'column',
                p: 4, gap: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                  <Rating
                    name="half-rating-read"
                    size={'small'}
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: theme.palette.state.warning }}
                  />
                    <Typography variant="labelxxs" color={theme.palette.secondary.light}>
                      {review.createdAt}
                  </Typography>
              </Box>
              <Typography variant="labelsm">
                {review.title}
              </Typography>
              <Typography variant="labelxs" color={theme.palette.secondary.light}>
                {review.content}
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
