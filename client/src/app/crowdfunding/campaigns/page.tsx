'use client'

import { useGetCrowdfundings } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import Navbar from "@/app/components/Navbar"
import { characterBreaker, formAmount, wordBreaker } from "@/lib/helper";
import { LocationOn } from "@mui/icons-material";
import { Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material"
import { Button } from "antd";
import Search from "antd/es/input/Search";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [crowdCampaign, setCrowdCampaign] = useState<any>([]);
  const campaignsMutation = useGetCrowdfundings();
  const {data: session} = useSession();

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

  const handleSearchChange = (e: any) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const filteredData =
  crowdCampaign &&
  crowdCampaign.filter((item: any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amountNeeded.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    const handleFetchData = async () => {
      await campaignsMutation.mutateAsync({},{
        onSuccess: (response: any) => {
          setCrowdCampaign(response.results)
        }
      })
    }

    handleFetchData();
  },[session]);

  return (
    <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 6, px: isMobile ? '20px' : '90px'
            }}
        >
            <Box sx={{width: isMobile ? '100%' : '30%', alignSelf: 'flex-end', mb: 5, mr: '3%'}}>
                <Search
                    placeholder="Search campaigns"
                    allowClear
                    enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                    size="large"
                    // onSearch={onSearch}
                    onChange={handleSearchChange}
                    value={searchQuery}
                />
                {/* <Search/> */}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: isMobile ? 4 : 2, justifyContent: 'center'
                }}
            >
                { filteredData.map((fundraiser: any, index: number) => {
                    const percent = (+fundraiser.raised/+fundraiser.amountNeeded) * 100;

                    return ( 
                        <Box key={fundraiser}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '550px',
                                minWidth: '300px',
                                width: isMobile ? '100%' : '32%',
                                border: `1px solid ${theme.palette.secondary.lighter}`,
                                borderRadius: theme.borderRadius.sm
                            }}
                        >
                            <img
                                src={fundraiser.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${fundraiser.image}` : '/crowd2.png'}
                                alt='crowd funding image'
                                style={{
                                height: '50%',
                                width: '100%',
                                borderTopLeftRadius: theme.borderRadius.sm,
                                borderTopRightRadius: theme.borderRadius.sm
                                }}
                                crossOrigin="anonymous"
                            />
                            <Box
                                sx={{
                                px: '10px',
                                pt: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '70%', justifyContent: 'space-evenly'
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight,
                                            ml: -1
                                        }}
                                        className="capitalize"
                                    >
                                        <LocationOn
                                            sx={{
                                                color: theme.palette.primary.main, 
                                                fontSize: '16px'
                                            }}
                                        /> { `${fundraiser.location.lga ? fundraiser.location.lga : 'Ikeja'}, ${fundraiser.location.state ? fundraiser.location.state : 'Lagos'}` }
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight,
                                            my: 1
                                        }}
                                        className="capitalize"
                                    >
                                        { characterBreaker(fundraiser.fundraisingFor, 20)}
                                    </Typography>
                                </Box>

                                <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize,
                                    lineHeight: theme.typography.labelxs.lineHeight,
                                    color: theme.palette.secondary.light,
                                    whiteSpace: 'pre-wrap'
                                }}
                                >
                                { wordBreaker(fundraiser.description, 10) }...
                                </Typography>
                            
                                <Box>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    gap: 1, mt: 3
                                    }}
                                >
                                    <Typography
                                    sx={{
                                        color: theme.palette.secondary.light,
                                        fontSize: theme.typography.labelxs.fontSize
                                    }}
                                    >
                                    Last donation
                                    </Typography>
                                    <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelxs.fontWeight
                                    }}
                                    >
                                    { moment(fundraiser.donations[0].date).fromNow() }
                                    </Typography>
                                </Box>
                                <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                    }}
                                >
                                    <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxxs.fontSize
                                    }}
                                    >
                                    {formAmount(+fundraiser.amountRaised)} raised
                                    </Typography>
                                    <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxxs.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                    >
                                    of {formAmount(+fundraiser.amountNeeded)}
                                    </Typography>
                                </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                height: '30%', mt: 3,
                                backgroundColor: theme.palette.secondary.lightest,
                                borderBottomRightRadius: theme.borderRadius.sm,
                                borderBottomLeftRadius: theme.borderRadius.sm,
                                borderTop: `1px solid ${theme.palette.secondary.lighter}`
                                }}
                            >
                                <Box 
                                    sx={{
                                        display: 'flex', 
                                        alignItems: 'center',
                                        height: '100%',
                                        px: '10px'
                                    }}
                                >
                                    <Typography onClick={() => router.push(`/crowdfunding/${fundraiser._id}`)}
                                        sx={{
                                        cursor: 'pointer',
                                        color: theme.palette.primary.main,
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelxs.fontWeight,
                                        }}
                                    >
                                        See More Information
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    // <Box key={index}
                    //     sx={{
                    //         display: 'flex',
                    //         flexDirection: 'column',
                    //         minHeight: '450px',
                    //         width: isMobile ? '100%' : '23%',
                    //         border: `1px solid ${theme.palette.secondary.lighter}`,
                    //         borderRadius: theme.borderRadius.sm
                    //     }}
                    //     >
                    //     <img
                    //         src={fundraiser.image}
                    //         alt='crowd funding image'
                    //         style={{
                    //         height: '50%',
                    //         width: '100%',
                    //         borderTopLeftRadius: theme.borderRadius.sm,
                    //         borderTopRightRadius: theme.borderRadius.sm
                    //         }}
                    //         crossOrigin="anonymous"
                    //     />
                    //     <Box
                    //         sx={{
                    //         px: '10px',
                    //         pt: '10px',
                    //         display: 'flex',
                    //         flexDirection: 'column'
                    //         }}
                    //     >
                    //         <Typography
                    //         sx={{
                    //             fontSize: theme.typography.labelxs.fontSize,
                    //             fontWeight: theme.typography.labelxs.fontWeight,
                    //             ml: -1
                    //         }}
                    //         >
                    //         <LocationOn
                    //             sx={{
                    //             color: theme.palette.primary.main, 
                    //             fontSize: '16px'
                    //             }}
                    //         /> { fundraiser.location }
                    //         </Typography>
                    //         <Typography
                    //         sx={{
                    //             fontSize: theme.typography.labelsm.fontSize,
                    //             fontWeight: theme.typography.labelxs.fontWeight,
                    //             my: 1
                    //         }}
                    //         >
                    //         { characterBreaker(fundraiser.name, 20)}
                    //         </Typography>
                    //         <Typography
                    //         sx={{
                    //             fontSize: theme.typography.labelxs.fontSize,
                    //             lineHeight: theme.typography.labelxs.lineHeight,
                    //             color: theme.palette.secondary.light
                    //         }}
                    //         >
                    //         { wordBreaker(fundraiser.story, 10) }...
                    //         </Typography>
                    //         <Box
                    //         sx={{
                    //             display: 'flex',
                    //             gap: 1, mt: 3
                    //         }}
                    //         >
                    //         <Typography
                    //             sx={{
                    //             color: theme.palette.secondary.light,
                    //             fontSize: theme.typography.labelxs.fontSize
                    //             }}
                    //         >
                    //             Last donation
                    //         </Typography>
                    //         <Typography
                    //             sx={{
                    //             fontSize: theme.typography.labelxs.fontSize,
                    //             fontWeight: theme.typography.labelxs.fontWeight
                    //             }}
                    //         >
                    //             { fundraiser.lastDonation }
                    //         </Typography>
                    //         </Box>
                    //         <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
                    //         <Box
                    //             sx={{
                    //                 display: 'flex',
                    //                 alignItems: 'center',
                    //                 gap: 1
                    //             }}
                    //         >
                    //             <Typography
                    //                 sx={{
                    //                 fontSize: theme.typography.labelxxs.fontSize
                    //                 }}
                    //             >
                    //                 {formAmount(+fundraiser.raised)} raised
                    //             </Typography>
                    //             <Typography
                    //                 sx={{
                    //                 fontSize: theme.typography.labelxxs.fontSize,
                    //                 color: theme.palette.secondary.light
                    //                 }}
                    //             >
                    //                 of {formAmount(+fundraiser.amountNeeded)}
                    //             </Typography>
                    //         </Box>
                    //     </Box>
                    //     <Box
                    //         sx={{
                    //         flex: 1, mt: 3,
                    //         backgroundColor: theme.palette.secondary.lightest,
                    //         borderBottomRightRadius: theme.borderRadius.sm,
                    //         borderBottomLeftRadius: theme.borderRadius.sm,
                    //         borderTop: `1px solid ${theme.palette.secondary.lighter}`
                    //         }}
                    //     >
                    //         <Box 
                    //         sx={{
                    //             display: 'flex', 
                    //             alignItems: 'center',
                    //             height: '100%',
                    //             px: '10px'
                    //         }}
                    //         >
                    //         <Typography onClick={() => router.push(`/crowdfunding/${index}`)}
                    //             sx={{
                    //             cursor: 'pointer',
                    //             color: theme.palette.primary.main,
                    //             fontSize: theme.typography.labelxs.fontSize,
                    //             fontWeight: theme.typography.labelxs.fontWeight,
                    //             }}
                    //         >
                    //             See More Information
                    //         </Typography>
                    //         </Box>
                    //         </Box>
                    //     </Box>
                    )})
                }
            </Box>
        </Box>
    </>
  )
}
