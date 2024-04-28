'use client';
import InputField from '@/app/components/InputField';
import Navbar from '@/app/components/Navbar';
import { ChatBubble, ChatBubbleOutline, Favorite, Share, ThumbUpOffAlt } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

const socials = [
    {
        logo: '/gmail_logo.png',
        link: ''
    },
    {
        logo: '/x_logo.png',
        link: ''
    },
    {
        logo: '/fb_logo.png',
        link: ''
    },
    {
        logo: '/linkedIn.png',
        link: ''
    }
]

const comments = [
    {
        image: '/cuisines.jpg',
        fullName: 'Jim Langosh',
        date: '3 Days ago',
        comment: `In the heart of the dense forest, where the sunlight filtered through the thick canopy in fragmented patches, there stood an ancient oak tree. Its gnarled branches reached out in all directions, as if embracing the secrets whispered by the wind. Moss clung to its weathered bark, and ferns carpeted the ground beneath it.
        Birdsong filled the air, a symphony of chirps and melodies that echoed through the trees. Small creatures scurried about, their movements quick and furtive as they went about their daily routines.`,
        replies: [
            {
                image: '/cuisines.jpg',
                fullName: 'Jim Langosh',
                date: '3 Days ago',
                reply: `And so, as the sun dipped below the horizon and the stars began to twinkle overhead, the forest settled into a deep and restful slumber, ready to greet the dawn of a new day when it came.`
            },
            {
                image: '/cuisines.jpg',
                fullName: 'Jim Langosh',
                date: '3 Days ago',
                reply: `And so, as the sun dipped below the horizon and the stars began to twinkle overhead, the forest settled into a deep and restful slumber, ready to greet the dawn of a new day when it came.`
            }
        ]
    }
]

export default function Blog({ params }: any) {
    const isMobile = useMediaQuery('(max-width: 959px)');
    const theme = useTheme();

  return (
    <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '40%',
                }}
            >
                <img
                    src='/hero_bg.png'
                    alt='hero'
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '60%',
                    px: '60px',
                }}
            >
                <Box
                    sx={{
                        width: isMobile ? '100%' : '50%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Typography sx={{color: theme.palette.primary.main}}>
                        1% OF THE INDUSTRY
                    </Typography>
                    <Typography
                        sx={{
                            my: '40px',
                            fontSize: theme.typography.h3.fontSize,
                            fontWeight: theme.typography.h4.fontWeight
                        }}
                    >
                        Faster ways to reach your customers and their needs.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2
                        }}
                    >
                        <Avatar/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: theme.typography.labellg.fontWeight
                                }}
                            >
                                Abayomi Olowu
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '10px',
                                    color: theme.palette.secondary.light
                                }}
                            >
                                Published 05 Dec 2023
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {!isMobile && (<Box
                    sx={{
                        backgroundColor: 'red',
                        width: '50%',
                        height: '80%'
                    }}
                >
                    <img
                        src='/cuisines.jpg'
                        alt='blog image'
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </Box>)}
            </Box>
            
            <Box
                sx={{
                    width: '100%',
                    px: '60px',
                    height: 'auto',
                    py: 6, display: 'flex',
                    gap: 5
                }}
            >
                {!isMobile && (<Box
                    sx={{
                        width: '20%',
                        display: 'flex',
                        flexDirection: 'column',
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        borderRadius: theme.borderRadius.sm,
                        height: '160px', py: 2, px: 2, gap: 3
                    }}
                >
                    <Typography 
                        sx={{
                            mt:2,
                            '&:hover': {color: theme.palette.primary.main},
                            cursor: 'pointer'
                        }}
                    >
                        Content
                    </Typography>
                    <Typography
                        sx={{
                            '&:hover': {color: theme.palette.primary.main},
                            cursor: 'pointer'
                        }}
                    >
                        Comments
                    </Typography>
                    <hr/>
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                        {
                            socials.map((logo, index) => (
                                <IconButton
                                    key={index}
                                >
                                    <Image
                                        src={logo.logo}
                                        alt='social media logo'
                                        width={20}
                                        height={20}
                                    />
                                </IconButton>
                            ))
                        }
                    </Box>
                </Box>)}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '70%',
                        height: 'auto',
                        gap: 3

                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.secondary.light
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ex obcaecati, est eum nulla aliquid in animi odio, accusantium totam, corporis pariatur vitae consequuntur? Quo, sapiente ipsa? Quaerat, architecto quia!
                    </Typography>
                    <img
                        src='/cuisines.jpg'
                        alt='blog image'
                        style={{
                            width: '100%',
                            height: 350
                        }}
                    />
                    <Typography
                        sx={{
                            color: theme.palette.secondary.light
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ex obcaecati, est eum nulla aliquid in animi odio, accusantium totam, corporis pariatur vitae consequuntur? Quo, sapiente ipsa? Quaerat, architecto quia!
                    </Typography>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 5
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h3.fontSize,
                                fontWeight: theme.typography.h3.fontWeight
                            }}
                        >
                            Like what you have read?
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.secondary.light
                            }}
                        >
                            Like or share your thoughts
                        </Typography>
                        <Box sx={{display: 'flex', gap: 5, mt: 4, flexDirection: 'column'}}>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                    <ThumbUpOffAlt
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '18px'
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            '&:hover': { color: theme.palette.primary.darker },
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        like
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                    <ChatBubbleOutline
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '18px'
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&:hover': { color: theme.palette.primary.darker }
                                        }}
                                    >
                                        Comment
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', ml: '-8px', cursor: 'pointer'}}>
                                    <Share
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '18px',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&:hover': { color: theme.palette.primary.darker}
                                        }}
                                    >
                                        Share
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: 'auto',
                                    width: '100%',
                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                    backgroundColor: theme.palette.secondary.lightest,
                                    borderRadius: theme.borderRadius.sm, p: 4,
                                    flexDirection: 'column'
                                }}
                            >
                                <Box 
                                    sx={{
                                        display: 'flex',
                                        gap: 1, alignItems: 'center',
                                        mb: 3
                                    }}
                                >
                                    <Image
                                        src='/IconMess.png'
                                        alt='comment'
                                        width={25}
                                        height={20}
                                    />
                                    <Typography>
                                        Comments ({comments.length})
                                    </Typography>
                                </Box>
                                <hr/>
                                {
                                    comments.map((comment, index) => (
                                        <Box key={index} sx={{mt: 5}}>
                                            <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
                                                <Avatar
                                                    src={comment.image}
                                                />
                                                <Typography>
                                                    {comment.fullName}
                                                </Typography>
                                                <Typography sx={{color: theme.palette.secondary.light}}>
                                                    {comment.date}
                                                </Typography>
                                            </Box>
                                            <Typography sx={{color: theme.palette.secondary.light, mt: 3, fontSize: '14px'}}>
                                                {comment.comment}
                                            </Typography>
                                            <Box sx={{display: 'flex', gap: 3, my: 4}}>
                                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                                    <ThumbUpOffAlt
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: '18px'
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            '&:hover': { color: theme.palette.primary.darker },
                                                            color: theme.palette.primary.main
                                                        }}
                                                    >
                                                        like
                                                    </Typography>
                                                </Box>
                                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                                    <ChatBubbleOutline
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: '18px'
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            '&:hover': { color: theme.palette.primary.darker }
                                                        }}
                                                    >
                                                        Reply
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            {comment.replies.map((reply, index) => (
                                                <Box key={index} sx={{display: 'flex', flexDirection: 'column', mx: '40px', mb: 4}}>
                                                    <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
                                                        <Avatar
                                                            src={reply.image}
                                                        />
                                                        <Typography>
                                                            {reply.fullName}
                                                        </Typography>
                                                        <Typography sx={{color: theme.palette.secondary.light}}>
                                                            {reply.date}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{color: theme.palette.secondary.light, mt: 3, fontSize: '14px'}}>
                                                        {reply.reply}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    ))
                                }

                                <Box sx={{display: 'flex', gap: 3}}>
                                    <Image
                                        src='/chat_avatar.png'
                                        alt='chat avatar'
                                        width={50}
                                        height={40}
                                    />
                                    <Box sx={{flex: 1}}>
                                        <InputField
                                            label=""
                                            type="text"
                                            placeholder='Write your comment here...'
                                            multiline={true}
                                            // errorMessage={errors.houseno?.message}
                                            // error={!!errors.houseno}
                                            // register={register('houseno', {
                                            //     required: 'Error, Try Again',
                                            // })}
                                        />
                                    </Box>
                                    
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    height: 'auto',
                                    width: '100%',
                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                    backgroundColor: theme.palette.secondary.lightest,
                                    borderRadius: theme.borderRadius.sm, p: 4,
                                    flexDirection: 'column'
                                }}
                            >
                                <Image
                                    src='/hot.png'
                                    alt='hot blog'
                                    width={50}
                                    height={40}
                                />
                                <Typography 
                                    sx={{
                                        fontWeight: theme.typography.h4.fontWeight,
                                        fontSize: theme.typography.h4.fontSize,
                                        my: 3
                                    }}
                                >
                                    Gestalt psychology in UI/UX design and beyond.
                                </Typography>
                                <Typography 
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        mb: 3, color: theme.palette.secondary.light
                                    }}
                                >
                                    Working from home requires self-discipline to stay focused amidst potential distractions. Setting boundaries between work and personal life is crucial to maintain a healthy work-life balance and prevent burnout.
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 4, alignItems: 'center'
                                    }}
                                >
                                    <Typography 
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >25 Apr, 2023</Typography>
                                    <Box sx={{display: 'flex', gap: 4}}>
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                            <ThumbUpOffAlt
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontSize: theme.typography.labelsm.fontSize                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    '&:hover': { color: theme.palette.primary.darker },
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                like
                                            </Typography>
                                        </Box>
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                            <ChatBubbleOutline
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontSize: theme.typography.labelsm.fontSize                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    '&:hover': { color: theme.palette.primary.darker }
                                                }}
                                            >
                                                Comment
                                            </Typography>
                                        </Box>
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', ml: '-8px', cursor: 'pointer'}}>
                                            <Share
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontSize: theme.typography.labelsm.fontSize
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    '&:hover': { color: theme.palette.primary.darker}
                                                }}
                                            >
                                                Share
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: '13px'}}>
                        <Favorite
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: '18px'
                            }}
                        />
                        <Typography>
                            20k
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <ChatBubble
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: '18px'
                            }}
                        />
                        <Typography>
                            10k
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
