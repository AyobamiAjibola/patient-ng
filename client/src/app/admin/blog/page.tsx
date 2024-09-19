'use client';

import BlogAdminTable from "@/app/components/BlogAdminTable";
import { NButton } from "@/app/components/PButton";
import { Add, Delete, EditNote, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useCreateBlogCategory, useDeleteBlogCategory, useGetBlogCategories, useGetBlogs, useUpdateBlogCategory } from "../hooks/blogHook/useBlog";
import { useSession } from "next-auth/react";
import MModal from "@/app/components/Modal";
import InputField from "@/app/components/InputField";
import Toastify from "@/app/components/ToastifySnack";

const item = [
  "All",
  "Published",
  "Draft",
  "Archived"
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blogs, setBlogs] =  useState<any>([]);
  const router = useRouter();
  const getBlogsMutation = useGetBlogs();
  const {data: session} = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [bcategory, setBCategory] = useState<string>('');
  const createBlogCategoryMutation = useCreateBlogCategory();
  const updateBlogCategoryMutation = useUpdateBlogCategory();
  const [blogCategories, setBlogCategories] = useState<any>([]);
  const getBlogCategoryMutation = useGetBlogCategories(); 
  const [catId, setCatId] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const deleteBlogCategoryMutation = useDeleteBlogCategory();

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

  const filteredData =
    blogs &&
    blogs.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const handleCreateNewCat = async () => {
    await createBlogCategoryMutation.mutateAsync({name: bcategory}, {
        onSuccess: async (response) => {
            await handleBlogscat()
            handleOpenNotification('success', response.message)
            setBCategory('')
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
        }
    })
  }

  const handleUpdateCat = async () => {
    await updateBlogCategoryMutation.mutateAsync({name: bcategory, blogCatId: catId}, {
      onSuccess: async (response: any) => {
        await handleBlogscat()
        handleOpenNotification('success', response.message)
        setIsEdit(false)
        setCatId('')
        setBCategory('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }
  
  const handleDelCategory = async (id: string) => {
    await deleteBlogCategoryMutation.mutateAsync(id, {
      onSuccess: async (response) => {
          await handleBlogscat()
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        console.log(errorMessage, 'errorMessage')
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleBlogscat = async () => {
    await getBlogCategoryMutation.mutateAsync({},{
      onSuccess: (response: any) => {
        setBlogCategories(response.results)
      }
    });
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogsMutation.mutateAsync({}, {
        onSuccess: (response) => {
          if(currentItem === "All") {
            setBlogs(response.results)
          } else if(currentItem === "Published") {
            const filteredData = response.results?.filter((blogs: any) => blogs.status === "publish");
            setBlogs(filteredData)
          } else if(currentItem === "Draft") {
            const filteredData = response.results?.filter((blog: any) => blog.status === "draft");
            setBlogs(filteredData)
          }else if(currentItem === "Archived") {
            const filteredData = response.results?.filter((blog: any) => blog.status === "archive");
            setBlogs(filteredData)
          }
        }
      });
    }

    fetchBlogs();
  },[session, currentItem]);

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
          flexDirection: sm ? 'column' : 'row',
          justifyContent: sm ? 'flex-start' : 'space-between',
          alignItems: sm ? 'flex-start' : 'center'
        }}
      >
        <Typography variant={ md ? "h5" : "h4" }>
          Blog
        </Typography>
        {session?.user.userType.includes('blogger') || session?.user.userType.includes('admin') && (
          <Box
            sx={{
              display: 'flex',
              gap: 3, mt: 3,
              alignItems: 'center'
            }}
          >
            <NButton 
              textcolor="white" 
              bkgcolor={'black'} 
              onClick={() => setOpen(true)}
              bordercolor="black"
              hoverbordercolor="black"
              hovercolor="black"
            >
              <Add/> Blog category
            </NButton>
            <NButton 
              textcolor="white" 
              bkgcolor={theme.palette.primary.main} 
              onClick={() => router.push('/admin/blog/new-blog')}
            >
              <Add/> New blog post
            </NButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          p: 4,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          borderRadius: theme.borderRadius.sm,
          mt: 1,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 4, mt: 2,
            alignItems: 'center',
            px: 2, mb: 2,
            flexDirection: sm ? 'column' : 'row'
          }}
        >
          <Box 
            sx={{
              width: sm ? "100%" : "70%",
              display: 'flex',
              gap: 4
            }}
          >
            {item.map((item: string, index: number) => (
              <Typography variant={ currentItem === item ? "labelsm" : "paragraphsm"} 
                key={index}
                onClick={() => setCurrentItem(item)}
                sx={{
                  borderBottom: currentItem === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                  color: currentItem === item
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
                  cursor: 'pointer',
                  height: '1.6rem'
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{width: sm ? "100%" : "30%"}}>
            <Input
              size="large" 
              placeholder="Search" 
              prefix={<SearchOutlined sx={{color: theme.palette.secondary.lighter}}/>} 
              onChange={handleSearchChange}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            px: 2
          }}
        >
          <BlogAdminTable
            //@ts-ignore
            data={filteredData}
          />
        </Box>
      </Box>

      <MModal
        onClose={() => setOpen(false)}
        open={open}
        width={sm ? '90%' : '60%'}
        height={sm ? '100vh' : '80vh'}
        showCloseIcon={true}
      >
        <Box className="flex flex-col py-3 px-4">
            <Box
              sx={{
                width: '100%',
                mt: 3, gap: 3,
                display: 'flex',
                flexDirection: sm ? 'column' : 'row',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: sm ? '100%' : '50%'
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
              </Box>

              <Box width={sm ? '100%' : '50%'} mt={sm ? -3 : 3}>
                <NButton
                  bkgcolor={theme.palette.primary.main}
                  textcolor='white'
                  width='100%'
                  onClick={()=> isEdit ? handleUpdateCat() : handleCreateNewCat()}
                >
                  {isEdit 
                    ? updateBlogCategoryMutation.isLoading ? 'Updating...' : 'Update category'
                    : createBlogCategoryMutation.isLoading ? 'Creating...' : 'Create category'
                  }
                </NButton>
              </Box>
            </Box>

            <Box
              sx={{
                width: sm ? '100%' : '50%',
                border: `1px solid ${theme.palette.secondary.lighter}`,
                height: '70%',
                display: 'flex',
                flexDirection: 'column', mt: 3
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.secondary.lightest,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '10%',
                  p: 2
                }}
              >
                <Typography variant="labelsm">
                  Category Name
                </Typography>
                <Typography variant="labelsm">
                  Action
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  height: sm ? '200px' : '300px',
                  overflowY: 'scroll',
                  p: 2
                }}
              >
                {
                  blogCategories.map((cat: any, index: number) => (
                    <Box
                      key={cat._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="paragraphxs" className="capitalize">
                        {cat.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <IconButton
                          onClick={()=>{
                            setIsEdit(true)
                            setCatId(cat._id)
                            setBCategory(cat.name)
                          }}
                        >
                          <EditNote sx={{fontSize: '18px'}}/>
                        </IconButton>
                        <IconButton
                          onClick={()=>handleDelCategory(cat._id)}
                        >
                          <Delete sx={{color: 'red', fontSize: '13px'}}/>
                        </IconButton>
                      </Box>
                    </Box>
                  ))
                }
              </Box>
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
