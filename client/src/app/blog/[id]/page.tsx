'use client';
import InputField from '@/app/components/InputField';
import Navbar from '@/app/components/Navbar';
import { wordBreaker } from '@/lib/helper';
import Footer from '@/app/components/Footer';
import { ChatBubble, ChatBubbleOutline, Favorite, HourglassEmpty, Share, ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useCommentOnBlog, useGetBlogs, useGetSingleBlog, useLikeBlog, useReplyBlogComment } from '@/app/admin/hooks/blogHook/useBlog';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Toastify from '@/app/components/ToastifySnack';
import { useSession } from 'next-auth/react';
import { NButton } from '@/app/components/PButton';
import MModal from '@/app/components/Modal';
import HtmlToText from '@/app/components/HtmlToText';
import { useRouter } from 'next/navigation';
import { FramerMotion3 } from '@/app/components/FramerMotion';
import RenderParsedContent from '@/app/admin/components/HtmlParse/ParseHtml';

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
];

export default function Blog({ params }: any) {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const getSingleBlogMutation = useGetSingleBlog();
    const [blog, setBlog] = useState<any>({});
    const [blogComments, setBlogComments] = useState<any>([]);
    const contentRef = useRef<any>(null);
    const commentRef = useRef<any>(null);
    const sendCommentRef = useRef<any>(null);
    const likeBlogMutation = useLikeBlog();
    const {data: session} = useSession();
    const commentOnBlogMutation = useCommentOnBlog();
    const [comment, setComment] = useState<string>('');
    const blogCommentReplyMutation = useReplyBlogComment();
    const [reply, setReply] = useState<string>('');
    const [commentId, setCommentId] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [hotBlog, setHotBlog] = useState<any>({});
    const getBlogsMutation = useGetBlogs();
    const router = useRouter();

    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpenSnack(true);
    };

    const handleClickContent = () => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCommentOnBlog = async () => {
        const payload = {
            blogId: blog._id,
            comment: comment
        }

        await commentOnBlogMutation.mutateAsync(payload, {
            onSuccess: async () => {
                await fetchBlog()
                setComment('')
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleReplyComment = async () => {
        const payload = {
            commentId: commentId,
            reply: reply
        }
        await blogCommentReplyMutation.mutateAsync(payload, {
            onSuccess: async () => {
                await fetchBlog()
                setCommentId('')
                setReply('')
                setOpenModal(false)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const fetchBlog = async () => {
        await getSingleBlogMutation.mutateAsync(params.id, {
            onSuccess: async (response: any) => {
                setBlog(response.result.blog)
                setBlogComments(response.result.comments)
            }
        })
    }

    const handleClickComment = () => {
        if (commentRef.current) {
            commentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleClickSendComment = () => {
        if (sendCommentRef.current) {
            sendCommentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLikeBlog = async () => {
        await likeBlogMutation.mutateAsync(blog._id, {
            onSuccess: async (response) => {
                await fetchBlog()
                // handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    useEffect(() => {
        fetchBlog();
    },[params, session]);

    useEffect(() => {
        const blogs = async () => {
            await getBlogsMutation.mutateAsync({}, {
                onSuccess: (response) => {
                    const hotBlog = response.results?.find((blog: any) => blog.hot === "true");
                    setHotBlog(hotBlog);
                }
            })
        }

        blogs()
    },[session])

    return (
        <>
            <Navbar/>
            <FramerMotion3
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 8
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
                                SUPPORT STARTS HERE
                            </Typography>
                            <Typography variant={ isMobile ? 'h5' : 'h3' }
                                sx={{
                                    my: isMobile ? '20px' : '40px',
                                }}
                                className='capitalize'
                            >
                                {blog.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2
                                }}
                            >
                                <img
                                    src={blog.publisherImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.publisherImage}` : ''}
                                    alt='user image'
                                    style={{
                                        width: '2.3em',
                                        height: '2.3em',
                                        borderRadius: theme.borderRadius.full,
                                        margin: 2
                                    }}
                                    crossOrigin='anonymous'
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant='labelsm' className='capitalize'>
                                        {blog.publisher}
                                    </Typography>
                                    <Typography color={theme.palette.secondary.light} variant='paragraphxs'>
                                        Published {moment(blog.createdAt).format('DD MMM YYYY')}
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
                                src={blog.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.titleImage}` : '/logo.png'}
                                crossOrigin='anonymous'
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
                            onClick={handleClickContent}
                            sx={{
                                mt:2,
                                '&:hover': {color: theme.palette.primary.main},
                                cursor: 'pointer'
                            }}
                        >
                            Content
                        </Typography>
                        <Typography
                            onClick={handleClickComment}
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
                    <Box ref={contentRef}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: isMobile ? '90%' : '70%',
                            height: 'auto',
                            gap: 3,
                            overflow: 'scroll',
                            maxHeight: '700px'
                        }}
                    >
                        {blog.content && <RenderParsedContent htmlContent={blog.content} />}
                        {blog.bodyImage && (<img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.bodyImage}`}
                            alt='blog image'
                            crossOrigin='anonymous'
                            style={{
                                width: '100%',
                                height: isMobile ? 250 : 350
                            }}
                        />)}
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
                                {blog.likes?.length}
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
                                {blog.comments?.length}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box ref={commentRef}
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
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: blog.likes?.some((like: any) => like === session?.user.userId) ? 'default' : 'pointer'}}
                                onClick={()=> blog.likes?.some((like: any) => like === session?.user.userId) ? null : handleLikeBlog()}
                            >
                                {blog.likes?.some((like: any) => like === session?.user.userId) 
                                    ? ( <ThumbUp
                                            sx={{
                                                color: theme.palette.state.error,
                                                fontSize: '18px'
                                            }}
                                        />
                                    ) : (
                                        <ThumbUpOffAlt
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: '18px'
                                            }}
                                        />
                                    )}
                                <Typography
                                    sx={{
                                        '&:hover': { color: blog.likes?.some((like: any) => like === session?.user.userId) ? theme.palette.border.main : theme.palette.primary.darker},
                                        color: blog.likes?.some((like: any) => like === session?.user.userId) 
                                                ? theme.palette.border.main
                                                : theme.palette.primary.main
                                    }}
                                >
                                    like blog
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}
                                onClick={handleClickSendComment}
                            >
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
                                    mb: 5
                                }}
                            >
                                <Image
                                    src='/IconMess.png'
                                    alt='comment'
                                    width={25}
                                    height={20}
                                />
                                <Typography>
                                    Comments ({blog.comments?.length})
                                </Typography>
                            </Box>
                            <hr/>
                            {blogComments.length > 0
                                ? blogComments?.map((comment: any, index: number) => (
                                    <Box key={index} sx={{mt: 3}}>
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
                                                    src={comment.user.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${comment.user.image}` : ''}
                                                    alt="user"
                                                    sx={{
                                                        width: isMobile ? 30 : 40,
                                                        height: isMobile ? 30 : 40
                                                    }}
                                                />
                                                <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'} className='capitalize'>
                                                    {comment.user.firstName} {comment.user.lastName}
                                                </Typography>
                                            </Box>
                                            <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphsm'}
                                                sx={{color: theme.palette.secondary.light, textAlign: 'right'}}
                                            >
                                                {moment(comment.createdAt).fromNow()}
                                            </Typography>
                                        </Box>
                                        <Typography variant={isMobile ? 'paragraphsm' : 'paragraphsm'}
                                            sx={{color: theme.palette.secondary.light, mt: 3}}
                                        >
                                            {comment.comment}
                                        </Typography>
                                        <Box sx={{display: 'flex', gap: 3, mt:2, mb:3}}>
                                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                                                <ThumbUpOffAlt
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px'
                                                    }}
                                                />
                                                <Typography variant='labelxs'
                                                    sx={{
                                                        '&:hover': { color: theme.palette.primary.darker },
                                                        color: theme.palette.primary.main
                                                    }}
                                                >
                                                    like
                                                </Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}
                                                onClick={()=>{
                                                    setCommentId(comment._id)
                                                    setOpenModal(true)
                                                }}
                                            >
                                                <ChatBubbleOutline
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px'
                                                    }}
                                                />
                                                <Typography variant='labelxs'
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        '&:hover': { color: theme.palette.primary.darker }
                                                    }}
                                                >
                                                    Reply
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {comment.replies.map((reply: any, index: number) => (
                                            <Box key={index} sx={{display: 'flex', flexDirection: 'column', mx: '40px', mb: 4, mt: 2}}>
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
                                                            src={reply.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${reply.image}` : ''}
                                                            alt="user"
                                                            sx={{
                                                                width: isMobile ? 20 : 30,
                                                                height: isMobile ? 20 : 30
                                                            }}
                                                        />
                                                        <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'}>
                                                            {reply.user.firstName} {reply.user.lastName} 
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphsm'}
                                                        sx={{color: theme.palette.secondary.light, textAlign: 'right'}}
                                                    >
                                                        {moment(reply.createdAt).fromNow()}
                                                    </Typography>
                                                </Box>
                                                <Typography variant={isMobile ? 'paragraphxs' : 'paragraphsm'}
                                                    sx={{
                                                        color: theme.palette.secondary.light, 
                                                        mt: 2
                                                    }}
                                                >
                                                    {reply.reply}
                                                </Typography>
                                            </Box>
                                        ))}
                                        <hr/>
                                    </Box>
                                ))

                                : <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} my={4}>
                                    <HourglassEmpty
                                        sx={{
                                            fontSize: '2em',
                                            color: theme.palette.border.main
                                        }}
                                    />
                                    <Typography variant='paragraphlg' color={theme.palette.border.main}>
                                        No comments found
                                    </Typography>
                                </Box>
                            }

                            <Box sx={{display: 'flex', gap: 3}} ref={sendCommentRef} mt={3}>
                                {/* {!isMobile && (<Image
                                    src='/chat_avatar.png'
                                    alt='chat avatar'
                                    width={100}
                                    height={20}
                                />)} */}
                                <Box sx={{flex: 1}}>
                                    <InputField
                                        label=""
                                        type="text"
                                        placeholder='Write your comment here...'
                                        multiline={true}
                                        rows={5}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <NButton
                                        onClick={handleCommentOnBlog}
                                        bkgcolor={theme.palette.primary.main}
                                        textcolor='white'
                                        width='20%'
                                    >
                                        {commentOnBlogMutation.isLoading ? 'Sending...' : 'Send'}
                                    </NButton>
                                </Box>
                                
                            </Box>
                        </Box>

                        {hotBlog && (<Box
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
                            <Typography my={3} variant={isMobile ? 'h5' : 'h4'} className='capitalize'>
                                {hotBlog.title}
                            </Typography>
                            <HtmlToText
                                htmlString={isMobile 
                                    ? wordBreaker(hotBlog.content, 20) 
                                    : wordBreaker(hotBlog.content, 40)
                                }
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: isMobile ? 2 : 4, alignItems: isMobile ? 'flex-start' : 'center',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    mt: 3
                                }}
                            >
                                <Typography 
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                >{moment(hotBlog.createdAt).format('DD MMM YYYY')}</Typography>
                                <Box sx={{display: 'flex', gap: 4, cursor: 'pointer'}}
                                    onClick={()=>router.push(`/blog/${hotBlog.urlSlug}`)}
                                >
                                    <Typography color={theme.palette.primary.main} variant='labelsm'>
                                        Read more...
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>)}
                    </Box>
                </Box>
            </FramerMotion3>

            <MModal
                onClose={() => setOpenModal(false)}
                open={openModal}
                width={isMobile ? '80%' : '60%'}
                height={300}
                showCloseIcon={false}
            >
                <Box className="flex flex-col p-3">
                    <InputField
                        label="Reply"
                        type="text"
                        placeholder='Write your reply here...'
                        multiline={true}
                        rows={8}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        isBorder={true}
                    />
                    <NButton
                        onClick={handleReplyComment}
                        bkgcolor={theme.palette.primary.main}
                        textcolor='white'
                        width='20%'
                    >
                        {blogCommentReplyMutation.isLoading ? 'Loading...' : 'Save'}
                    </NButton>
                </Box>
            </MModal>
            <Toastify
                open={openSnack}
                onClose={() => {
                    setCommentId('')
                    setReply('')
                    setOpenSnack(false)}}
                message={message}
                error={isError}
                success={isSuccess}
            />
            <Footer/>
        </>
    )
}
