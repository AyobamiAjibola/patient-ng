'use client';
import InputField from '@/app/components/InputField';
import Navbar from '@/app/components/Navbar';
import { characterBreaker } from '@/lib/helper';
import Footer from '@/app/components/Footer';
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
    const isMobile = useMediaQuery('(max-width: 900px)');
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
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: isMobile ? '200px' : '40%',
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
                        height: '80%',
                        px: isMobile ? '20px' : '64px',
                        top: isMobile ? '1em' : '3em', gap: 4
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
                        <Typography variant={ isMobile ? 'h5' : 'h3' }
                            sx={{
                                my: isMobile ? '20px' : '40px',
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
                            width: '50%',
                            height: '100%'
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
            </Box>
            
            <Box
                sx={{
                    width: '100%',
                    px: isMobile ? '20px' : '64px',
                    height: 'auto',
                    py: isMobile ? 4 : 6, display: 'flex',
                    gap: isMobile ? 2 : 5
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
                        width: isMobile ? '90%' : '70%',
                        height: 'auto',
                        gap: 3

                    }}
                >
                    <Typography variant='paragraphsm'
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
                            height: isMobile ? 250 : 350
                        }}
                    />
                    <Typography variant='paragraphsm'
                        sx={{
                            color: theme.palette.secondary.light
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ex obcaecati, est eum nulla aliquid in animi odio, accusantium totam, corporis pariatur vitae consequuntur? Quo, sapiente ipsa? Quaerat, architecto quia!
                    </Typography>
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
                                fontSize: '14px'
                            }}
                        />
                        <Typography variant='paragraphxs'>
                            20k
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <ChatBubble
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: '14px'
                            }}
                        />
                        <Typography variant='paragraphxs'>
                            10k
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    mt: isMobile ? 2 : 5,
                    px: isMobile ? '20px' : '64px', mb: 4
                }}
            >
                <Typography variant={isMobile ? 'h5' : 'h3'}>
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
                                    <Box 
                                        sx={{
                                            display: 'flex',
                                            gap: isMobile ? 1 : 3,
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                            <Avatar
                                                src={comment.image}
                                                alt="user"
                                                sx={{
                                                    width: isMobile ? 30 : 40,
                                                    height: isMobile ? 30 : 40
                                                }}
                                            />
                                            <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'}>
                                                {characterBreaker(comment.fullName, 20)}{comment.fullName.length > 20 ? '...' : ''} 
                                            </Typography>
                                        </Box>
                                        <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphsm'}
                                            sx={{color: theme.palette.secondary.light, textAlign: 'right'}}
                                        >
                                            {comment.date}
                                        </Typography>
                                    </Box>
                                    <Typography variant={isMobile ? 'paragraphsm' : 'paragraphbase'}
                                        sx={{color: theme.palette.secondary.light, mt: 3}}
                                    >
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
                                            <Box 
                                                sx={{
                                                    display: 'flex',
                                                    gap: isMobile ? 1 : 3,
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                    <Avatar
                                                        src={reply.image}
                                                        alt="user"
                                                        sx={{
                                                            width: isMobile ? 30 : 40,
                                                            height: isMobile ? 30 : 40
                                                        }}
                                                    />
                                                    <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'}>
                                                        {characterBreaker(reply.fullName, 12)}{comment.fullName.length > 12 ? '...' : ''} 
                                                    </Typography>
                                                </Box>
                                                <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphsm'}
                                                    sx={{color: theme.palette.secondary.light, textAlign: 'right'}}
                                                >
                                                    {reply.date}
                                                </Typography>
                                            </Box>
                                            <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'}
                                                sx={{
                                                    color: theme.palette.secondary.light, 
                                                    mt: 3
                                                }}
                                            >
                                                {reply.reply}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ))
                        }

                        <Box sx={{display: 'flex', gap: 3}}>
                            {!isMobile && (<Image
                                src='/chat_avatar.png'
                                alt='chat avatar'
                                width={70}
                                height={20}
                            />)}
                            <Box sx={{flex: 1}}>
                                <InputField
                                    label=""
                                    type="text"
                                    placeholder='Write your comment here...'
                                    multiline={true}
                                    rows={3}
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
                        <Typography my={3} variant={isMobile ? 'h5' : 'h4'}>
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
                                gap: isMobile ? 2 : 4, alignItems: isMobile ? 'flex-start' : 'center',
                                flexDirection: isMobile ? 'column' : 'row'
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
        <Footer/>
    </>
  )
}
