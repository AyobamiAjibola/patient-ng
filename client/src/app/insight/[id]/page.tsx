'use client';

import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ArrowForward, Close, Star } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, LinearProgress, Rating, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import { useGetSingleInsight, usePostInsightReview } from "@/app/admin/hooks/insightHook/useInsight";
import { useSession } from "next-auth/react";
import capitalize from "capitalize";
import Toastify from "@/app/components/ToastifySnack";

export default function page({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const size = useWindowSize();
  const [review, setReview] = useState<string>('');
  const insightMutation = useGetSingleInsight();
  const { data: session } = useSession();
  const reviewMutation = usePostInsightReview();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpen(true);
  };

  const handleCloseModal = () => {
    setReview('');
    setModalOpen(false)
  };

  const handleReview = async () => {
    await reviewMutation.mutateAsync({ review: review, insightId: params.id }, {
      onSuccess: async (response: any) => {
        await insightMutation.mutateAsync(params.id);
        setModalOpen(false)
        setReview('')
        handleOpenNotification('success', response.message)
      },
      onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  useEffect(() => {
    const getInsight = async () => {
      if(params.id) {
        await insightMutation.mutateAsync(params.id)
      }
    }
    getInsight()
  },[session, params]);

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
               src={insightMutation.data?.result && insightMutation.data?.result.user.image 
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${insightMutation.data?.result.user.image}`
                      : "/logo.png"}
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
                {insightMutation.data?.result && capitalize.words(insightMutation.data?.result.hospitalName) || ''}
              </Typography>
              <Typography color={theme.palette.secondary.light} variant="paragraphxxs">
                {insightMutation.data?.result && insightMutation.data?.result.reviews.length} Reviews
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
                  {insightMutation.data?.result && insightMutation.data?.result.rating}
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
          <Typography variant="labellg" mb={-3}>
            Review
          </Typography>
          <Typography variant="paragraphsm" color={theme.palette.secondary.light} width={isMobile ? '100%' : '70%'}>
            {insightMutation.data?.result && insightMutation.data?.result.comment}
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
              src={insightMutation.data?.result && insightMutation.data?.result.user.image 
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${insightMutation.data?.result.user.image}`
                    : "/logo.png"}
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
          { insightMutation.data?.result.reviews.length > 0 
            ? insightMutation.data?.result.reviews.map((review: any, index: number) => (
                <Box key={index}
                  sx={{
                    width: isMobile ? '100%' : '70%',
                    bgcolor: 'white',
                    border: `1px solid ${theme.palette.secondary.lighter}`,
                    p: 3,
                    display: 'flex',
                    gap: 2,
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
                      src={review.user.image 
                            ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${review.user.image}`
                            : "/person.png"}
                      alt="review image"
                      sx={{
                        width: 40,
                        height: 40
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="labelxs">
                        {`${capitalize.words(review.user.firstName)} ${capitalize.words(review.user.lastName)}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{my: 2}}/>
                  <Typography variant="paragraphsm">
                    {review.review}
                  </Typography>
                </Box>
              ))
            : (<Box justifyContent={'center'} alignItems={'center'}>
                  <Typography variant='paragraphsm' color={theme.palette.secondary.light}>
                    No reviews.
                  </Typography>
              </Box>)
          }
          
        </Box>
      </Box>
      
      <MModal
        onClose={handleCloseModal}
        open={modalOpen}
        width={isMobile ? '90%' : '60%'}
        showCloseIcon={false}
        height={isMobile ? '80%' : '350px'}
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
              onClick={handleReview}
              textcolor="white"
              bkgcolor={theme.palette.primary.main}
            >
              {reviewMutation.isLoading ? 'Submitting...' : 'Submit review'}
            </NButton>
          </Box>
        </Box>
      </MModal>

      <Toastify
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
      <Footer/>
    </>
  )
}
