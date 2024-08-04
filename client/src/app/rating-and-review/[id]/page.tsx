'use client';

import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ArrowForward, Close, Star } from "@mui/icons-material";
import { Box, Divider, IconButton, Rating,  LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import { useGetSingleInsight, usePostInsightReview } from "@/app/admin/hooks/insightHook/useInsight";
import { useSession } from "next-auth/react";
import capitalize from "capitalize";
import Toastify from "@/app/components/ToastifySnack";
import { useFetchSingleUser, useInsightsRatingsReports } from "@/app/admin/hooks/userHook/useUser";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 }
  }
}

export default function page({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<string>('');
  const insightMutation = useGetSingleInsight();
  const { data: session } = useSession();
  const reviewMutation = usePostInsightReview();
  const insightsRatingsReportsMutation = useInsightsRatingsReports();
  const [ratingData, setRatingData] = useState<any>([]);
  const [insightData, setInsightData] = useState<any>({});
  const loggedUserMutation = useFetchSingleUser();
  const [userImage, setUserImage] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const rating = localStorage.getItem('rating');
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hospitalData, setHospitalData] = useState<any>({});

  const MotionBox = motion(Box);
 
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
  };

  const handleInsightsRatings = async (hospitalName: string) => {
    await insightsRatingsReportsMutation.mutateAsync({hospital: hospitalName}, {
      onSuccess: (response: any) => {
        setRatingData(Object.entries(response.result.ratings))
        setTotalRatings(response.result.total)
      }
    })
  }

  const handleReview = async () => {
    await reviewMutation.mutateAsync({ review: review, rating: selectedRating, insightId: params.id }, {
      onSuccess: async (response: any) => {
        await handleGetInsight()
        setModalOpen(false)
        setReview('')
        // handleOpenNotification('success', response.message)
      },
      onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleGetInsight = async () => {
    await insightMutation.mutateAsync(params.id, {
      onSuccess: (response: any) => {
        const filteredData = response.result.insight.reviews.filter((item: any) => item.status === 'Accepted')
        setInsightData(filteredData)
        setHospitalData(response.result.insight.hospital)
        handleInsightsRatings(response.result.insight.hospital.hospitalName)
      }
    })
  }

  useEffect(() => {
    handleGetInsight()
    loggedUserMutation.mutateAsync(session?.user.userId as string, {
      onSuccess: (response: any) => {
        setUserImage(response.result.image)
      }
    })
  },[session, params]);

  return (
    <>
      <Navbar/>
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          pt: 8
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
               src={hospitalData.image
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${hospitalData.image}`
                      : "/logo.png"}
              alt="hospital image"
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
              <Typography variant="labelbase" className="capitalize">
                {hospitalData.hospitalName || ''}
              </Typography>
              <Typography color={theme.palette.secondary.light} variant="paragraphsm">
                {insightData.length} {insightData.length > 1 ? 'Reviews' : 'Review'}
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
                  value={rating ? +rating : 0}
                  precision={0.5}
                  readOnly
                  sx={{ color: '#FFCB00' }}
                />
                <Typography variant="paragraphxs" color={theme.palette.secondary.light} mb={-1}>
                  {/* {rating ? Math.ceil(+rating * 10) / 10 : 0} */}
                  {rating}
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
            href={hospitalData.website}
            component='a'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="labelxs" color={theme.palette.primary.main}>
                {hospitalData.website ? hospitalData.website.replace("https://", "") : ""}
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
            <img
              src={userImage 
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${userImage}`
                  : "/logo.png"}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%'
              }}
              crossOrigin="anonymous"
            />
            <Typography variant="labelxs">
              Write a review
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: theme.borderRadius.sm,
              border: `1px solid ${theme.palette.border.main}`,
              width: isMobile ? '100%' : '70%',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1
              }}
            >
              <Typography variant="h5">
                Reviews
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Star
                  sx={{ color: '#FFCB00', fontSize: '30px' }}
                />
                <Typography variant="h5">
                  {/* {rating ? Math.ceil(+rating * 10) / 10 : 0} */}
                  {rating}
                </Typography>
              </Box>
            </Box>
            <Typography variant="paragraphlg" my={3}>
              Based on {insightData.length} {insightData.length > 1 ? 'Reviews' : 'Review'}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {
                ratingData.map((rating: any, index: number) => {
                  return (
                    <Box key={index}
                      sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        my: 1
                      }}
                    >
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          borderRadius: theme.borderRadius.xs,
                          border: `1px solid ${theme.palette.border.main}`,
                          bgcolor: 'white'
                        }}
                      />
                      <Typography px={1}> 
                        {rating[0] === 'one' 
                          ? 1
                          : rating[0] === 'two'
                            ? 2
                            : rating[0] === 'three'
                              ? 3
                              : rating[0] === 'four'
                                ? 4 : 5 
                        }
                      </Typography>
                      <Typography mr={2}>
                        {index === 0 ? 'star' : 'stars'}
                      </Typography>
                      <Box width='100%' pr={2}>
                        <BorderLinearProgress variant="determinate" value={rating[1].totalRating > 0 ? rating[1].totalRating / totalRatings * 100 : 0} />
                      </Box>
                      <Typography>
                        {
                          rating[1].totalRating === 0
                            ? `${0}%`
                            : `${Math.ceil(rating[1].totalRating / totalRatings * 100 * 10) / 10}%`
                        }
                      </Typography>
                    </Box>
                )})
              }
            </Box>
          </Box>
          <Divider sx={{width: isMobile ? '100%' : '70%', my: 2}}/>
          { insightData.length > 0 
            ? insightData.map((review: any, index: number) => (
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
                    <img
                      src={review.user.image 
                            ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${review.user.image}`
                            : "/person.png"}
                      alt="review image"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%'
                      }}
                      crossOrigin="anonymous"
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
                      <Rating
                        name="half-rating-read"
                        size={'small'}
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        sx={{ color: '#FFCB00' }}
                      />
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
      </MotionBox>
      
      <MModal
        onClose={handleCloseModal}
        open={modalOpen}
        width={isMobile ? '90%' : '60%'}
        showCloseIcon={false}
        height={'auto'}
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
            <Typography variant="labelxs"
                sx={{
                    mb: 2
                }}
            >
                Give a rating
            </Typography>
            <Box display={'flex'}>
                {
                    [1,2,3,4,5].map((rating, index) => (
                        <Box key={index}
                            onClick={()=>setSelectedRating(rating)}
                            sx={{
                                width: '60px',
                                display: 'flex',
                                gap: 1,
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '40px',
                                p: 3,
                                borderRight: rating !== 5 ? `3px solid ${theme.palette.secondary.lightest}` : 'none',
                                borderTopLeftRadius: rating === 1 ? theme.borderRadius.sm : 'none',
                                borderBottomLeftRadius: rating === 1 ? theme.borderRadius.sm : 'none',
                                borderTopRightRadius: rating === 5 ? theme.borderRadius.sm : 'none',
                                borderBottomRightRadius: rating === 5 ? theme.borderRadius.sm : 'none',
                                backgroundColor: rating === selectedRating ? theme.palette.primary.main : theme.palette.secondary.lighter
                            }}
                        >
                            <Star sx={{color: '#FFCB00', fontSize: '15px'}}/>
                            <Typography
                                variant="labelxs"
                                color={rating === selectedRating ? 'white' : 'black'}
                            >
                                {rating}
                            </Typography>
                        </Box>
                    ))
                }
            </Box>
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
