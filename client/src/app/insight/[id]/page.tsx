'use client';

import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ArrowForward, Close, Star } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, LinearProgress, Rating, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";

const reviews = [
  {
      title: 'review title',
      comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
      dateCreated: '2 hours ago',
      rating: '3'
  },
  {
      title: 'review title',
      comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
      dateCreated: '2 hours ago',
      rating: '2'
  },
  {
      title: 'review title',
      comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
      dateCreated: '2 hours ago',
      rating: '1'
  }
]

export default function page({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const size = useWindowSize();
  const [review, setReview] = useState<string>('');

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.secondary.lighter
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main
    },
  }));

  const handleCloseModal = () => {
    setReview('');
    setModalOpen(false)
  }

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            bgcolor: 'white',
            flexDirection: isMobile ? 'column' : 'row',
            px: isMobile ? '20px' : '90px',
            py: '2em',
            borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
            gap: isMobile ? 3 : 0
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2
            }}
          >
            <img
              src='/model.png'
              alt="hosital image"
              style={{
                width: '5em',
                height: '5em',
                borderRadius: theme.borderRadius.sm
              }}
              crossOrigin="anonymous"
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Typography variant="labelbase">
                ABC Hospital
              </Typography>
              <Typography color={theme.palette.secondary.light} variant="paragraphxxs">
                2,500 Reviews
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                <Rating
                  name="half-rating-read"
                  size={'small'}
                  value={4}
                  precision={0.5}
                  readOnly
                  sx={{ color: '#FFCB00' }}
                />
                <Typography variant="paragraphxs" color={theme.palette.secondary.light} mb={-1}>
                  4
                </Typography>
              </Box>
              
            </Box>
          </Box>
          <Box
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.secondary.lighter}`,
              borderRadius: theme.borderRadius.sm,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '3em',
              '&:hover': {
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
              <Typography variant="labelxs" color={theme.palette.primary.main}>
                www.ipatient.ng
              </Typography>
              <Typography color={theme.palette.secondary.light} variant="paragraphxxs">
                Visit this website
              </Typography>
            </Box>
            <ArrowForward sx={{fontSize: '16px', color: theme.palette.secondary.light}}/>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            py: 4,
            px: isMobile ? '20px' : '90px',
            flexDirection: 'column',
            bgcolor: theme.palette.secondary.lightest,
            gap: 3
          }}
        >
          <Typography variant="labelsm" mb={-3}>
            Review
          </Typography>
          <Typography variant="paragraphsm" color={theme.palette.secondary.light} width={isMobile ? '100%' : '70%'}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis fuga quia iusto nulla quibusdam, dolore in illo cum molestiae voluptate eligendi alias recusandae! Laboriosam ea saepe praesentium veniam, sapiente beatae!
          </Typography>
          <Box
            onClick={() => setModalOpen(true)}
            sx={{
              width: isMobile ? '100%' : '70%',
              bgcolor: 'white',
              border: `1px solid ${theme.palette.secondary.lighter}`,
              '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`
              },
              p: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              borderRadius: theme.borderRadius.sm,
              cursor: 'pointer'
            }}
          >
            <Avatar
              src="/model.png"
              sx={{
                width: 30,
                height: 30
              }}
            />
            <Typography variant="labelxs">
              Write a review
            </Typography>
          </Box>
          <Divider sx={{width: isMobile ? '100%' : '70%', my: 2}}/>
          {
            reviews.map((review, index) => (
              <Box
                sx={{
                  width: isMobile ? '100%' : '70%',
                  bgcolor: 'white',
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  p: 3,
                  display: 'flex',
                  gap: 2,
                  // alignItems: 'center',
                  borderRadius: theme.borderRadius.sm,
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center'
                  }}
                >
                  <Avatar
                    src="/model.png"
                    alt="review image"
                    sx={{
                      width: 40,
                      height: 40
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      // gap: 1
                    }}
                  >
                    <Typography variant="labelxs">
                      Adeyemi Olowu
                    </Typography>
                    <Typography variant="paragraphxxs" color={theme.palette.secondary.light}>
                      CEO
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{my: 2}}/>
                <Typography variant="paragraphxs">
                  {review.comment}
                </Typography>
              </Box>
            ))
          }
          
        </Box>
      </Box>
      
      <MModal
        onClose={handleCloseModal}
        open={modalOpen}
        width={isMobile ? '90%' : '60%'}
        showCloseIcon={false}
      >
        <Box className="flex flex-col p-2 gap-3"
          sx={{
            height: 'auto'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              borderBottom: `1px solid ${theme.palette.secondary.lighter}`
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Star sx={{color: '#FFCB00', fontSize: '20px'}}/>
              <Typography variant="labelsm">
                Write a review
              </Typography>
            </Box>
            <IconButton onClick={handleCloseModal}>
              <Close sx={{fontSize: '16px'}}/>
            </IconButton>
          </Box>

          <Box
            sx={{
                width: '100%'
            }}
          >
            <InputField
              label=""
              placeholder="Write your review"
              isBorder={true}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={isMobile ? 15 : 8}
              multiline={true}
            />
          </Box>
          <Box width={'100%'}>
            <NButton
              textcolor="white"
              bkgcolor={theme.palette.primary.main}
            >
              Submit review
            </NButton>
          </Box>
        </Box>
      </MModal>
      <Footer/>
    </>
  )
}
