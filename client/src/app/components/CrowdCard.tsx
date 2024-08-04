import { characterBreaker, formAmount, wordBreaker } from "@/lib/helper";
import { Favorite, LocationOn } from "@mui/icons-material";
import { Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";


export default function CrowdCard({fundraiser, percent}: any) {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const router = useRouter();

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
    
    return (
        <>
            
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
                                    fontSize: '14px'
                                }}
                            /> { `${fundraiser.location.lga ? fundraiser.location.lga : 'Ikeja'}, ${fundraiser.location.state ? fundraiser.location.state : 'Lagos'}` }
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelxl.fontSize,
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
                            fontSize: theme.typography.labelbase.fontSize,
                            lineHeight: theme.typography.labelxs.lineHeight,
                            color: theme.palette.secondary.light,
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {wordBreaker(fundraiser.description, 10) }...
                    </Typography>
                
                    <Box>
                        {fundraiser.donations.length > 0
                            ? (<Box
                                sx={{
                                    display: 'flex',
                                    gap: 1, mt: 3
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.secondary.light,
                                        fontSize: theme.typography.labelsm.fontSize
                                    }}
                                >
                                    Last donation
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    { moment(fundraiser.donations[0].date).fromNow() }
                                </Typography>
                            </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1, mt: 3
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: theme.palette.secondary.light,
                                            fontSize: theme.typography.labelsm.fontSize
                                        }}
                                    >
                                        No donations yet.
                                    </Typography>
                                </Box>
                            )
                        }
                        <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Box width={'90%'} display={'flex'}>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize
                                    }}
                                >
                                    {formAmount(+fundraiser.amountRaised)} raised
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    of {formAmount(+fundraiser.amountNeeded)}
                                </Typography>
                            </Box>
                            {fundraiser.likes.length > 0 && (<Box display={'flex'} alignItems={'center'} width={'10%'}>
                                <Favorite sx={{color: 'red', fontSize: '14px'}}/> 
                                <Typography variant="paragraphsm">{fundraiser.likes.length > 10 ? '10+' : fundraiser.likes.length}</Typography>
                            </Box>)}
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
                            fontSize: theme.typography.labelbase.fontSize,
                            fontWeight: theme.typography.labelxs.fontWeight,
                            }}
                        >
                            See More Information
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
