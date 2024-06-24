'use client';

import ImageUploader from '@/app/components/ImageUploader';
import InputField from '@/app/components/InputField';
import MModal from '@/app/components/Modal';
import { NButton } from '@/app/components/PButton';
import { selectedImageArrayAtom, selectedImageArrayAtom2 } from '@/lib/atoms';
import { ArrowBackRounded, DescriptionOutlined, RemoveRedEyeOutlined, SendOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Select from "react-select";
import { useCreateBlog, useCreateBlogCategory, useGetBlogCategories } from '../../hooks/blogHook/useBlog';
import { customStyles } from '@/constant/customStyles';
import { useSession } from 'next-auth/react';
import Toastify from '@/app/components/ToastifySnack';
import capitalize from 'capitalize';
import ImageUploader2 from '@/app/components/ImageUploader2';
import HTMLReactParser from 'html-react-parser';
import TextEditor from '../../components/TextEditor';

export default function page() {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [headerImage, _] = useAtom(selectedImageArrayAtom);
    const [bodyImage, __] = useAtom(selectedImageArrayAtom2);
    const [link, setLink] = useState("");
    const editor = useRef<any>(null);
    const [content, setContent] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();
    const createBlogCategoryMutation = useCreateBlogCategory();
    const getBlogCategoryMutation = useGetBlogCategories(); 
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const {data: session} = useSession();
    const [blogCategories, setBlogCategories] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [bcategory, setBCategory] = useState<string>("");
    const createBlogMutation = useCreateBlog();
    const[title, setTitle] = useState<string>('');
    const[author, setAuthor] = useState<string>('');
    const [status, setStatus] = useState<string>('')

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

    const handleModalOpen = () => {
        setOpen(true)
    };

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

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        }
            return 0;
    };

    const handleCreateNewCat = async () => {
        await createBlogCategoryMutation.mutateAsync({name: bcategory}, {
            onSuccess: async (response) => {
                await handleBlogscat()
                handleOpenNotification('success', response.message)
                setOpen(false)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }
    
    const screenHeight = getHeight();

    const handleCreateBlog = async () => {

        const payload = {
            titleImage: headerImage[0],
            bodyImage: bodyImage[0],
            urlSlug: link,
            body: content,
            title: title,
            category: selectedCategory,
            publisher: author,
            status: status
        }

        await createBlogMutation.mutateAsync(payload, {
            onSuccess: async (response) => {
                router.back()
                await getBlogCategoryMutation.mutateAsync({})
                handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    };

    const config = {
        height: 400
    };

    useEffect(() => {
        handleBlogscat()
    },[]);

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
                    Create new blog post
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
                                    .toLowerCase()}`)
                                }}
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
                                placeholder="Choose hospitals"
                                name="rating"
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
                                    width: '100%',
                                    border: `3px dashed ${theme.palette.secondary.lighter}`,
                                    borderRadius: theme.borderRadius.sm,
                                    backgroundColor: "white",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
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
                                    width: '100%',
                                    border: `3px dashed ${theme.palette.secondary.lighter}`,
                                    borderRadius: theme.borderRadius.sm,
                                    backgroundColor: "white",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
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

                        <Box mt={4} mb={3}>
                            <TextEditor
                                preference={content}
                                setPreference={setContent}
                            />
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
                            height: isMobile ? '150px' : '120px',
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
                                    <RemoveRedEyeOutlined sx={{fontSize: '14px'}}/> Preview
                                </Typography>
                            </NButton>
                            <NButton 
                                textcolor='black' 
                                bkgcolor='white' 
                                bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '45%'}
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                                onClick={handleCreateBlog}
                                onMouseEnter={()=>setStatus('draft')}
                            >
                                <Typography variant='labelxs'>
                                    <DescriptionOutlined sx={{fontSize: '14px', mb: '0.5px'}}/>
                                    {createBlogMutation.isLoading && status === 'draft' ? 'Saving...' : 'Save as draft'}
                                </Typography>
                            </NButton>
                        </Box>
                        <NButton 
                            onMouseEnter={()=>setStatus('publish')}
                            onClick={handleCreateBlog}
                            textcolor='white' 
                            bkgcolor={theme.palette.primary.main}
                            width='100%'
                        >
                            <Typography variant='paragraphxs'>
                                <SendOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> 
                                {createBlogMutation.isLoading && status === 'publish' ? 'Publishing...' : 'Publish'}
                            </Typography>
                        </NButton>
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
                    {/* <Box
                        sx={{
                            overflow: 'scroll'
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    /> */}
                    <Box overflow={'scroll'}>
                        {HTMLReactParser(content)}
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
