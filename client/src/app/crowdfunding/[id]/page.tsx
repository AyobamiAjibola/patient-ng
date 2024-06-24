'use client'

import { useActivateCrowdfunding, useGetSingleCrowdfunding, useLikeCrowdfunding, useMarkCrowdfundingDone } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
import { useDonate, useInitTransaction } from "@/app/hooks/transactionHook/useTransaction";
import { formAmount } from "@/lib/helper";
import { Favorite, FavoriteBorder, Person, Reply } from "@mui/icons-material";
import { Avatar, Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import moment from "moment";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const amounts = [
  "500", "1000", "5000", "10000", "20000"
]

export default function CrowdFunding({params}: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [showDonations, setShowDonations] = useState<boolean>(true);
  const {data: session} = useSession();
  const getSingleCrowdMutation = useGetSingleCrowdfunding();
  const [recordedDonations, setRecordedDonations] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const markCampaignAsDoneMutation = useMarkCrowdfundingDone();
  const toggleCrowdfundingStatusMutation = useActivateCrowdfunding();
  const donateMutation = useDonate();
  const initTransaction = useInitTransaction();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const likeCrowdfundingMutation = useLikeCrowdfunding();

  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpenNotification(true);
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
    setValue('');
    setOpen(false);
    setShowDonations(true);
  };

  const handleLikeCrowdFunding = async () => {
    await likeCrowdfundingMutation.mutateAsync(params.id, {
      onSuccess: async () => {
        await getSingleCrowdMutation.mutateAsync(params.id)
        handleOpenNotification('success', "Successfully liked.")
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleToggleStatus = async () => {
    await toggleCrowdfundingStatusMutation.mutateAsync(getSingleCrowdMutation.data?.result._id, {
      onSuccess: async (response: any) => {
        await getSingleCrowdMutation.mutateAsync(params.id)
        handleOpenNotification('success', "Successfully updated status.")
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  };

  const handleMarkDone = async () => {
    await markCampaignAsDoneMutation.mutateAsync(getSingleCrowdMutation.data?.result._id, {
      onSuccess: async (response: any) => {
        await getSingleCrowdMutation.mutateAsync(params.id)
        handleOpenNotification('success', "Successfully marked campaign as done.")
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleDonateNow = () => {
    setShowDonations(false);
    setOpen(true)
  };

  const handleDonate = async () => {
    const payload = {
      amount: +value,
      crowedFundingId: params.id
    }

    await donateMutation.mutateAsync(payload, {
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  useEffect(() => {
    if (donateMutation.isSuccess) {
      window.location.href = donateMutation.data.result;
    }
  }, [donateMutation.isSuccess]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const reference = searchParams.get('reference');

      if (reference) {

        const payload = {
          reference: reference,
          crowedFundingId: params.id
        }

        await initTransaction.mutateAsync(payload, {
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          },
          onSuccess: async () => {
            router.push(`/crowdfunding/${params.id}`)
            const url = new URLSearchParams(searchParams);
            url.delete('reference');
            url.delete('trxref')
            router.replace(`${pathname}?${url.toString()}`);
            await getSingleCrowdMutation.mutateAsync(params.id)
          }
        })
      }
    }

    fetchTransaction();

  }, []);
 
  useEffect(() => {
    const handleGetCrowdFund = async () => {
      await getSingleCrowdMutation.mutateAsync(params.id)
    }

    handleGetCrowdFund();
  },[session, params]);

  useEffect(() => {
    if (getSingleCrowdMutation.isSuccess) {
        const { donations } = getSingleCrowdMutation.data?.result || {};

        if (donations) {
            const total = donations.reduce((acc: any, donation: any) => acc + Number(donation.amount), 0);
            setRecordedDonations(total);
        }
    }
  }, [getSingleCrowdMutation.isSuccess]);   

  useEffect(() => {
    const { amountNeeded } = getSingleCrowdMutation.data?.result || {};

    if (amountNeeded) {
        const per = (Number(recordedDonations) / Number(amountNeeded)) * 100;
        setPercent(per);
    }
  }, [getSingleCrowdMutation.isSuccess, recordedDonations]);

  return (
    <>
        <Navbar/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: isMobile ? '20px' : '64px', py: 4, gap: 4
          }}
        >
          <Box display={'flex'} alignItems={'center'} gap={3}>
            <Typography className="capitalize"
              sx={{
                fontSize: theme.typography.h4.fontSize,
                fontWeight: theme.typography.h4.fontWeight
              }}
            >
              {`Save ${getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.fundraisingFor}`}
            </Typography>
            <Tag className="capitalize"
              color={
                getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === 'pending'
                  ? 'gold'
                  : getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === 'active'
                    ? 'lime'
                    : getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === 'done'
                      ? 'green'
                      : 'red'
              }
              style={{ fontSize: 16 }}
            >
              {getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status}
            </Tag>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 4
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '100%' : '70%'
              }}
            >
              <Box
                sx={{
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  borderRadius: theme.borderRadius.sm,
                  height: isMobile ? '500px' : '600px', mb: 4
                }}
              >
                <img
                  src={getSingleCrowdMutation.data?.result.image 
                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getSingleCrowdMutation.data?.result.image}` : '/crowd2.png'}
                  alt='campaign image'
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: isMobile ? '70%' : '90%',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm
                  }}
                />
                <Box
                  sx={{
                    height: isMobile ? '30%' : '10%', width: '100%',
                    backgroundColor: theme.palette.secondary.lightest,
                    alignItems: 'center',
                    display: 'flex', px: 4, gap: 2,
                    borderBottomLeftRadius: theme.borderRadius.sm,
                    borderBottomRightRadius: theme.borderRadius.sm,
                    flexDirection: isMobile ? 'column' : 'row'
                  }}
                >
                  <Avatar
                    src={getSingleCrowdMutation.data?.result.user.image 
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getSingleCrowdMutation.data?.result.user.image}` : '/logo.png'}
                    alt='campain organized image'
                    style={{
                      width: isMobile ? '45px' : '30px',
                      height: isMobile ? '45px' : '30px',
                      marginTop: isMobile ? '10px' : '0px'
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 1
                    }}
                  >
                    <Typography className="capitalize"
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight,
                        textAlign: isMobile ? 'center' : 'left'
                      }}
                    >
                      {getSingleCrowdMutation.data?.result && `${getSingleCrowdMutation.data?.result.user.firstName} ${getSingleCrowdMutation.data?.result.user.lastName}`}
                    </Typography>
                    <Typography className="capitalize"
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        color: theme.palette.secondary.light,
                        textAlign: isMobile ? 'center' : 'left'
                      }}
                    >
                      {`is organising a fundraiser on behalf of ${getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.fundraisingFor}`}
                    </Typography>
                  </Box>
                  
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  color: theme.palette.secondary.light,
                  lineHeight: theme.typography.labelsm.lineHeight
                }}
              >
                {`${getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.description}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: isMobile ? '100%' : '30%',
                height: 'auto',
                maxHeight: '600px',
                p: 4, flexDirection: 'column',
                border: `1px solid ${theme.palette.secondary.lighter}`,
                borderRadius: theme.borderRadius.sm
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  mb: 4
                }}
              >
                Created {getSingleCrowdMutation.data?.result && `${moment(getSingleCrowdMutation.data?.result.createdAt).fromNow()}`}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1, mb: 2
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight
                  }}
                >
                    {formAmount(+recordedDonations)} raised
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    color: theme.palette.secondary.light
                  }}
                >
                    of {getSingleCrowdMutation.data?.result && formAmount(+getSingleCrowdMutation.data?.result.amountNeeded)}
                </Typography>
              </Box>
              <BorderLinearProgress variant="determinate" value={percent} />
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: theme.palette.secondary.light,
                  mb: 4, mt: 1
                }}
              >
                {getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.donations.length} donations
              </Typography>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                {session?.user.userType.includes('admin') && (<Box
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2
                  }}
                >
                  <NButton
                    disabled={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "done"}
                    bkgcolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "done" 
                                ? theme.palette.border.main
                                : theme.palette.primary.main}
                    textcolor="white"
                    onClick={handleMarkDone}
                    width={isMobile ? "100%" : "50%"}
                  >
                    <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                      {markCampaignAsDoneMutation.isLoading ? 'Loading...' : 'Mark as done'}
                    </Typography>
                  </NButton>
                  <NButton
                    width={isMobile ? "100%" : "50%"}
                    onClick={handleToggleStatus}
                    bkgcolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "pending" 
                                ? theme.palette.primary.main
                                : getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "inactive"
                                  ? theme.palette.primary.main
                                  : "red"
                            }
                    textcolor="white"
                    hoverbordercolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "pending" 
                                        ? theme.palette.primary.main
                                        : getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "inactive"
                                          ? theme.palette.primary.main
                                          : "red"
                                    }
                    hovercolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "pending" 
                                  ? theme.palette.primary.main
                                  : getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status === "inactive"
                                    ? theme.palette.primary.main
                                    : "red"
                                }           
                  >
                    <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                        {getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data.result.status === "pending" || getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data.result.status === "inactive"
                            ? getSingleCrowdMutation.isLoading ? "Loading..." : "Approve"
                            : getSingleCrowdMutation.isLoading ? "Loading..." : "Reject"
                        }
                    </Typography>
                </NButton>
                </Box>)}
                <NButton width='100%'
                  onClick={handleDonateNow}
                  textcolor="white"
                  bkgcolor={theme.palette.primary.main}
                >
                  <Typography
                     sx={{
                      fontSize: theme.typography.labelsm.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight
                    }}
                  >
                    Donate now
                  </Typography>
                </NButton>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2
                  }}
                >
                  <NButton
                    textcolor="black"
                    bordercolor={theme.palette.border.main}
                    bkgcolor="white"
                    width={isMobile ? "100%" : "50%"}
                    hoverbordercolor={theme.palette.border.main}
                  >
                    <Reply sx={{color: 'black', fontSize: '16px'}}/> Share
                  </NButton>
                  <NButton
                    onClick={handleLikeCrowdFunding}
                    disabled={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result?.likes.some((like: any) => like.user._id === session?.user.userId)}
                    textcolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.likes.some((like: any) => like.user._id === session?.user.userId) ? "red" : "black"}
                    bordercolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.likes.some((like: any) => like.user._id === session?.user.userId)
                                  ? theme.palette.border.main
                                  : theme.palette.state.error}
                    hovercolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.likes.some((like: any) => like.user._id === session?.user.userId)
                                  ? theme.palette.border.main
                                  : theme.palette.state.error}
                    hoverbordercolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.likes.some((like: any) => like.user._id === session?.user.userId)
                      ? theme.palette.state.error
                      : theme.palette.border.main}
                    bkgcolor="white"
                    width={isMobile ? "100%" : "50%"}
                  >
                    {getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result?.likes.some((like: any) => like.user._id === session?.user.userId) 
                      ? <Favorite sx={{color: theme.palette.state.error, fontSize: '16px', mr: 2}}/> 
                      : <FavoriteBorder sx={{color: theme.palette.state.error, fontSize: '16px', mr: 2}}/>
                    }
                    Like {getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.likes.length || 0}
                  </NButton>
                </Box>
              </Box>

              <Typography
                sx={{
                  color: theme.palette.secondary.light,
                  mt: 5, mb: 3,
                  fontSize: theme.typography.labelxs.fontSize
                }}
              >
                DONATIONS
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                {
                  getSingleCrowdMutation.data?.result.donations.slice(0, 3).map((donation: any, index: number) => (
                    <Box key={index}
                      sx={{
                        display: 'flex',
                        gap: 2
                      }}
                    >
                      <Avatar
                        src={donation.user && donation.user.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${donation.user.image}` : ''}
                        alt='donation'
                        sx={{
                          width: '40px',
                          height: '40px'
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Typography variant="labelxs" className="capitalize">
                          {donation.user ? `${donation.user.firstName} ${donation.user.lastName}` : 'Anonymous'} 
                        </Typography>
                        <Typography color={theme.palette.secondary.light}
                          variant="paragraphxs"
                        >
                          {formAmount(+donation.amount)}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }

                <Typography onClick={() => setOpen(true)}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.typography.labelxs.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight,
                    mt: 2,
                    cursor: 'pointer'
                  }}
                >
                  See all donations
                </Typography>
              </Box>
            </Box>
          </Box>
          <MModal 
            onClose={handleCloseModal} 
            open={open} 
            width={isMobile ? '80%' : '50%'}
            height={showDonations ? '80%' : '250px'}
          >
            <Box className='hide-scrollbar'
              sx={{
                px: isMobile ? 1 : 4, pb: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              { showDonations && (<>
                  <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <Person sx={{color: theme.palette.primary.main}}/>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labellg.fontSize,
                        fontWeight: theme.typography.labellg.fontWeight
                      }}
                    >
                      Donations ({getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.donations.length})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      mt: 4
                    }}
                  >
                    {
                      getSingleCrowdMutation.data?.result.donations.map((donation: any, index: number) => (
                        <Box key={index}
                          sx={{
                            display: 'flex',
                            gap: 2
                          }}
                        >
                          <Avatar
                            src={donation.user && donation.user.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${donation.user.image}` : ''}
                            alt='donation'
                            sx={{
                              width: '40px',
                              height: '40px'
                            }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <Typography variant="labelxs" className="capitalize">
                              {donation.user ? `${donation.user.firstName} ${donation.user.lastName}` : 'Anonymous'} 
                            </Typography>
                            <Typography color={theme.palette.secondary.light}
                              variant="paragraphxs"
                            >
                              {formAmount(+donation.amount)}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    }
                  </Box>
                </>
              )}

              <Box 
                sx={{
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  backgroundColor: theme.palette.secondary.lightest,
                  p: 2, mt: 4,
                  borderRadius: theme.borderRadius.sm
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.labelsm.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight,
                    mb: 1
                  }}
                >
                  DONATE NOW
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{width: '70%'}}>
                    <InputField
                      placeholder="Input an amount to donate"
                      isBorder={true}
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                  </Box>
                  <NButton width={'30%'}
                    onClick={handleDonate}
                    textcolor="white"
                    disabled={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status !== "active" }
                    bkgcolor={getSingleCrowdMutation.data?.result && getSingleCrowdMutation.data?.result.status !== "active" 
                              ? theme.palette.border.main
                              : theme.palette.primary.main}
                  >
                    {donateMutation.isLoading ? 'Loading...' : 'Donate'}
                  </NButton>
                </Box>
                <Box sx={{display: 'flex', gap: 2, width: '100%', mt: 2}}>
                  {
                    amounts.map((amount, index) => (
                      <Box key={index} onClick={() => setValue(amount)}
                        sx={{
                          border: `1px solid ${theme.palette.border.main}`,
                          backgroundColor: theme.palette.secondary.lightest,
                          width: '20%', height: '30px',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main
                          },
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: theme.borderRadius.sm
                        }}
                      >
                        <Typography 
                          sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            '&:hover': {
                              color: 'white'
                            },
                          }}
                        >
                          {amount}
                        </Typography>
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            </Box>
          </MModal>

          <Toastify
            open={openNotification}
            onClose={() => setOpenNotification(false)}
            message={message}
            error={isError}
            success={isSuccess}
          />
        </Box>
    </>
  )
}
