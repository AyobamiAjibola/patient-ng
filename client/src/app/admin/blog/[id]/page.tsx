'use client';

import ImageUploader from '@/app/components/ImageUploader';
import InputField from '@/app/components/InputField';
import MModal from '@/app/components/Modal';
import { NButton } from '@/app/components/PButton';
import { selectedImageArrayAtom, selectedImageArrayAtom2 } from '@/lib/atoms';
import { ArrowBackRounded, ChatBubbleOutlineSharp, Close, DeleteOutlineOutlined, DescriptionOutlined, Favorite, FavoriteBorderOutlined, Remove, RemoveRedEyeOutlined, SendOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useChangeToArchive, useChangeToDraft, useChangeToPublish, useCreateBlogCategory, useGetBlogCategories, useGetSingleBlog, useGetSingleBlogAdmin, useUpdateBlog } from '../../hooks/blogHook/useBlog';
import { useSession } from 'next-auth/react';
import Toastify from '@/app/components/ToastifySnack';
import Select from "react-select";
import { customStyles } from '@/constant/customStyles';
import capitalize from 'capitalize';
import ImageUploader2 from '@/app/components/ImageUploader2';
import MyEditor from '../../components/JoditEditor/MyEditor';
import RenderParsedContent from '../../components/HtmlParse/ParseHtml';

type FormValues = {
    title: string;
    permalink: string;
    author: string;
}

export default function page({params}: any) {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [link, setLink] = useState("");
    const [content, setContent] = useState("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();
    const getSingleBlogMutation = useGetSingleBlogAdmin();
    const {data: session} = useSession();
    const [headerImage, setHeaderImage] = useAtom(selectedImageArrayAtom);
    const [bodyImage, setBodyImage] = useAtom(selectedImageArrayAtom2);
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [blogData, setBlogData] = useState<any>({});
    const draftBlogMutation = useChangeToDraft();
    const publishBlogMutation = useChangeToPublish();
    const archiveBlogMutation = useChangeToArchive();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const createBlogCategoryMutation = useCreateBlogCategory();
    const getBlogCategoryMutation = useGetBlogCategories(); 
    const [blogCategories, setBlogCategories] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [bcategory, setBCategory] = useState<string>("");
    const upateBlogMutation = useUpdateBlog();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [removeImage, setRemoveImage] = useState(false);

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

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        }
            return 0;
    };
    
    const screenHeight = getHeight();

    const handleUpdateBlog = async () => {

        const payload = {
            titleImage: headerImage[0],
            bodyImage: removeImage 
                        ? undefined 
                        : !removeImage && bodyImage[0] 
                            ? bodyImage[0] 
                            : image2 && image2,
            urlSlug: link,
            body: content,
            title: title,
            category: selectedCategory,
            publisher: author,
            blogId: params.id
        }
    
        await upateBlogMutation.mutateAsync(payload, {
            onSuccess: async (response) => {
                await fetchBlog()
                handleOpenNotification('success', response.message)
                setHeaderImage([])
                setBodyImage([])
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        });

    };

    const handleCreateNewCat = async () => {
        await createBlogCategoryMutation.mutateAsync({name: bcategory}, {
            onSuccess: async (response) => {
                await getBlogCategoryMutation.mutateAsync({})
                handleOpenNotification('success', response.message)
                setOpen(false)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }
    

    const fetchBlog = async () => {
        await getSingleBlogMutation.mutateAsync(params.id, {
            onSuccess: (response: any) => {
                setAuthor(response.result.blog.publisher)
                setTitle(response.result.blog.title)
                setLink(response.result.blog.urlSlug)
                setContent(response.result.blog.content)
                setImage(response.result.blog.titleImage)
                setImage2(response.result.blog.bodyImage)
                setBlogData({
                    likes: response.result.blog.likes,
                    comments: response.result.blog.comments,
                    status: response.result.blog.status
                });
                setSelectedCategory(response.result.blog.category.name)
            }
        })
    }

    const handleDraft = async () => {
        await draftBlogMutation.mutateAsync(params.id,{
            onSuccess: async (response) => {
                await fetchBlog()
                handleOpenNotification('success', response.message);
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handlePublish = async () => {
        await publishBlogMutation.mutateAsync(params.id,{
            onSuccess: async (response) => {
                await fetchBlog()
                handleOpenNotification('success', response.message);
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleArchive = async () => {
        await archiveBlogMutation.mutateAsync(params.id,{
            onSuccess: async (response) => {
                await fetchBlog()
                handleOpenNotification('success', response.message);
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleModalOpen = () => {
        setOpen(true)
    }

    const config = useMemo(() => ({
        readonly: false,
        height: 400,
        placeholder: 'Start typing...',
        cleanHTML: {
            fillEmptyParagraph: false, // Allow empty <li> elements
          },
    }), []);

    useEffect(() => {
        fetchBlog()
    },[params, session]);

    useEffect(() => {
        const handleBlogscat = async () => {
            await getBlogCategoryMutation.mutateAsync({},{
                onSuccess: (response: any) => {
                    let cat: any[] = [];
                    response.results.map((item: any, _: number) => (
                        cat.push({
                            value: item.name,
                            label: capitalize.words(item.name)
                        })
                    ))
                    setBlogCategories(cat)
                }
            });
        }

        handleBlogscat()
    },[session]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
            }}
        >
            <Box mb={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: 3
                }}
            >
                <Typography variant="labelsm" onClick={() => router.back()}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: theme.palette.primary.main
                        }
                    }}
                >
                    <ArrowBackRounded sx={{fontSize: '16px'}}/> Back
                </Typography>
                <Typography variant={ md ? "h5" : "h4" }>
                    Edit blog post
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 4
                    }}
                >
                    
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '70%'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                mt: 3
                            }}
                        >
                            <InputField
                                label="Blog post title"
                                placeholder="Enter title"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    setLink(`/${e.target.value
                                    .replaceAll(/\s+/g, '-')
                                    .trim()
                                    .toLowerCase()}`
                                )}}
                                isBorder={true}
                                labelStyle={{
                                    fontSize: theme.typography.labelbase.fontSize,
                                    fontWeight: 500
                                }}
                                value={title}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1, mt: '-12px'
                            }}
                        >
                            <Typography variant='paragraphsm'
                                sx={{
                                    color: theme.palette.secondary.light
                                }}
                            >
                                Permalink:
                            </Typography>
                            <Typography variant='paragraphsm'
                                sx={{
                                    color: theme.palette.primary.main
                                }}
                            >
                                {process.env.NEXT_PUBLIC_CLIENT_URL}{link}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                mt: 3
                            }}
                        >
                            <InputField
                                label="Author"
                                placeholder="Enter author"
                                isBorder={true}
                                labelStyle={{
                                    fontSize: theme.typography.labelbase.fontSize,
                                    fontWeight: 500
                                }}
                                value={author}
                                onChange={(e)=>setAuthor(e.target.value)}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 3
                            }}
                        >
                            <Typography variant="labelxs"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Blog Category
                            </Typography>
                            <Select
                                className="w-full h-10 font-light"
                                options={blogCategories}
                                styles={customStyles}
                                placeholder="Choose blog category"
                                name="category"
                                onChange={(item) => {
                                    setSelectedCategory(String(item?.value));
                                }}
                                value={{
                                    value: selectedCategory,
                                    label: capitalize.words(selectedCategory),
                                }}
                            />
                            <Typography 
                                onClick={handleModalOpen}
                                variant='labelxs' color={theme.palette.primary.main}
                                sx={{cursor: 'pointer'}}
                            >
                                Add blog category
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 3
                            }}
                        >
                            <Typography variant='labelbase' mb={2}>
                                Header image
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: isMobile ? 'column' : 'row'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '50%',
                                        m: 3
                                    }}
                                >
                                    <img
                                        alt='blog image'
                                        src={headerImage[0]
                                                ? URL.createObjectURL(headerImage[0]) 
                                                : image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image}` : '/logo.png'}
                                        crossOrigin='anonymous'
                                        style={{
                                            width: '100%',
                                            height: '200px'
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: '50%',
                                        border: `3px dashed ${theme.palette.secondary.lighter}`,
                                        borderRadius: theme.borderRadius.sm,
                                        backgroundColor: "white",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                
                                    <ImageUploader
                                        label={''}
                                        showImageName={true}
                                        allowMultiple={false}
                                        showDomiImage={false}
                                        spacebtwimgtypes={-2}
                                        title={false}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 3
                            }}
                        >
                            <Typography variant='labelbase' mb={2}>
                                Body image
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: isMobile ? 'column' : 'row'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '50%',
                                        position: 'relative',
                                        m: 3
                                    }}
                                >
                                    <img
                                        alt='blog image'
                                        src={bodyImage[0]
                                                ? URL.createObjectURL(bodyImage[0]) 
                                                : image2 ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image2}` : '/logo.png'}
                                        crossOrigin='anonymous'
                                        style={{
                                            width: '100%',
                                            height: '200px'
                                        }}
                                    />
                                    <Box 
                                        onClick={()=>{setImage2(''), setBodyImage([]), setRemoveImage(true)}}
                                        sx={{
                                            display: image2 ? 'flex' : 'none',
                                            left: '95%',
                                            top: '-12px',
                                            position: 'absolute',
                                            bgcolor: 'red',
                                            width: '1.8em',
                                            height: '1.8em',
                                            '&:hover': {
                                                bgcolor: 'red'
                                            },
                                            borderRadius: '50%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Close sx={{color: 'white', fontSize: '16px'}}/>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '50%',
                                        border: `3px dashed ${theme.palette.secondary.lighter}`,
                                        borderRadius: theme.borderRadius.sm,
                                        backgroundColor: "white",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                
                                    <ImageUploader2
                                        label={''}
                                        showImageName={true}
                                        allowMultiple={false}
                                        showDomiImage={false}
                                        spacebtwimgtypes={-2}
                                        title={false}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box my={4}>
                            <MyEditor
                                content={content}
                                setContent={setContent}
                            />
                        </Box>
                        <Box width={'100%'} mt={'4em'} mb={'2em'}>
                            <NButton
                                onClick={handleUpdateBlog}
                                bkgcolor={theme.palette.primary.main}
                                textcolor='white'
                                width='100%'
                            >
                                {upateBlogMutation.isLoading ? 'Saving...' : 'Save changes'}
                            </NButton>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            bgcolor: 'white',
                            width: isMobile ? '100%' : '30%',
                            borderRadius: theme.borderRadius.sm,
                            border: `1px solid ${theme.palette.border.main}`,
                            p: 3, flexDirection: 'column',
                            gap: 2,
                            height: isMobile ? '320px' : '270px',
                            mt: isMobile ? 1 : '2.8em'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2, width: '100%',
                                flexDirection: isMobile ? 'column' : 'row'
                            }}
                        >
                            <NButton 
                                textcolor='black' 
                                bkgcolor='white' 
                                bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '45%'}
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                                onClick={() => setOpenModal(true)}
                            >
                                <Typography variant='labelxs'>
                                    <RemoveRedEyeOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> Preview
                                </Typography>
                            </NButton>
                            <NButton 
                                textcolor='black'
                                bkgcolor={blogData.status === "draft" ? theme.palette.border.main : 'white'}
                                bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '55%'}
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                                onClick={handleDraft}
                                disabled={blogData.status === "draft"}
                            >
                                <Typography variant='labelxs'>
                                    <DescriptionOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> 
                                    {draftBlogMutation.isLoading ? 'Saving...' : 'Save as draft'}
                                </Typography>
                            </NButton>
                        </Box>
                        <NButton 
                            disabled={blogData.status === "publish"}
                            textcolor='white' 
                            bkgcolor={blogData.status === "publish" ? theme.palette.border.main : theme.palette.primary.main}
                            width='100%'
                            onClick={handlePublish}
                        >
                            <Typography variant='paragraphxs'>
                                <SendOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> 
                                {publishBlogMutation.isLoading ? 'Publishing...' : 'Publish'}
                            </Typography>
                        </NButton>
                        <NButton 
                            textcolor='red'
                            bkgcolor={blogData.status === "archive" ? theme.palette.border.main : 'white'}
                            bordercolor={theme.palette.state.error}
                            width='100%'
                            hoverbordercolor={theme.palette.state.error}
                            hovercolor={theme.palette.state.error}
                            disabled={blogData.status === "archive"}
                            onClick={handleArchive}
                        >
                            <Typography variant='paragraphxs'>
                                <DeleteOutlineOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> 
                                {archiveBlogMutation.isLoading ? 'Archiving...' : 'Archive'}
                            </Typography>
                        </NButton>
                        <Divider sx={{my: 4}}/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <RemoveRedEyeOutlined sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    2
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Views
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <FavoriteBorderOutlined sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    {blogData.likes?.length}
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Likes
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <ChatBubbleOutlineSharp sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    {blogData.comments?.length}
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Comments
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <MModal
                onClose={() => setOpenModal(false)}
                open={openModal}
                width={isMobile ? '80%' : '60%'}
            >
                <Box className="flex flex-col p-10"
                    sx={{
                        height: screenHeight/100 * 80
                    }}
                >
                    <Typography variant='h4' mb={2}>
                        Preview
                    </Typography>
                    <Divider sx={{mb: 4}} />
                    <Box overflow={'scroll'}>
                        <RenderParsedContent htmlContent={content} />
                    </Box>
                </Box>
            </MModal>

            <MModal
                onClose={() => setOpen(false)}
                open={open}
                width={isMobile ? '80%' : '60%'}
                height={250}
                showCloseIcon={false}
            >
                <Box className="flex flex-col py-5 px-10">
                    <Box
                        sx={{
                            width: '100%',
                            mt: 3, gap: 1
                        }}
                    >
                        <InputField
                            label="Blog category"
                            placeholder="Enter blog category"
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={bcategory}
                            onChange={(e)=>setBCategory(e.target.value)}
                        />

                        <NButton
                            bkgcolor={theme.palette.primary.main}
                            textcolor='white'
                            width='100%'
                            onClick={handleCreateNewCat}
                        >
                            {createBlogCategoryMutation.isLoading ? 'Loading...' : 'Submit'}
                        </NButton>
                    </Box>
                </Box>
            </MModal>

            <Toastify
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </Box>
    )
}
