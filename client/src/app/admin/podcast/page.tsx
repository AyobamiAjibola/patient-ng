'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import PodcastAdminTable from "@/app/components/PodcastAdminTable";
import { Add, Close, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import { useGetPodcastCategories, useGetPodcasts, useGetSinglePodcast, useGetUsersPodcasts, usePostPodcast, usePostPodcastCategory, useUpdatePodcast, useUpdatePodcastStatus } from "../hooks/podcastHook/usePodcast";
import Toastify from "@/app/components/ToastifySnack";
import capitalize from "capitalize";
import { useSession } from "next-auth/react";

const PodcastSource = [
  {value: 'youtube', label: 'Youtube'}, 
  {value: 'apple', label: 'Apple'},
  {value: 'spotify', label: 'Spotify'}
];

type FormValues = {
  title: string;
  producedBy: string;
  podcastLink: string;
  duration: string;
  description: string;
}

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [podcastData, setPodcastData] =  useState<any>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const postPodcastMutation = usePostPodcast();
  const updatePodcastMutation = useUpdatePodcast();
  const getPodcastsMutation = useGetUsersPodcasts();
  const [status, setStatus] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [podcastCategories, setPodcastCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const podcastCategoryMutation = useGetPodcastCategories();
  const [pcategory, setPCategory] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const {data: session} = useSession();
  const postPodcastCategoryMutation = usePostPodcastCategory();
  const getSinglePodcastMutation = useGetSinglePodcast();
  const [podcastId, setPodcastId] = useState('');
  const [sources, setSources] = useState([{
    source: '',
    link: ''
  }]);
  const [isStatus, setIsStatus] = useState<boolean>(false);
  const changePodcastStatusMutation = useUpdatePodcastStatus();
  
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

  const item = [
    "All",
    "Published",
    "Draft",
    "Removed"
  ]

  const getHeight = () => {
    if (typeof window !== 'undefined') {
      return window.innerHeight;
    }
      return 0;
  };

  const handleChangeStatus = async () => {
    await changePodcastStatusMutation.mutateAsync({
      status,
      podcastId
    }, {
      onSuccess: async (response) => {
        await handleFetchPodcasts()
        handleOpenNotification('success', response.message)
        setIsStatus(false)
        setPodcastId('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleAddLink = () => {
    setSources((prev) => [
      ...prev,
      { source: '', link: '' },
    ]);
  };

  const handleRemoveLink = (index: number) => {
    const newSource = [...sources];
    newSource.splice(index, 1);
    setSources(newSource);
  };

  const handleGetSinglePodcast = async (id: string) => {
    await getSinglePodcastMutation.mutateAsync(id, {
      onSuccess: (response: any) => {
        setValue('title', response.result.title)
        setValue('producedBy', response.result.producedBy)
        setValue('duration', response.result.duration)
        setValue('description', response.result.summary)
        setSources(response.result.channels)
        setSelectedDate(dayjs(response.result.releaseDate))
        setStatus(response.result.status)
        setActiveStatus(response.result.status)
        setSelectedCategory(response.result.category)
      }
    })
  
  }

  const handleFetchCategories = async () => {
    await podcastCategoryMutation.mutateAsync({}, {
      onSuccess: async (response: any) => {
        let cat: any[] = [];
        response.results.map((item: any, _: number) => (
            cat.push({
              value: item.name,
              label: capitalize.words(item.name)
            })
        ))
        setPodcastCategories(cat)
      }
    })
  }

  const handleSubmitPCategory = async () => {
    await postPodcastCategoryMutation.mutateAsync({name: pcategory.toLocaleLowerCase()}, {
      onSuccess: async (response) => {
        await handleFetchCategories()
        handleOpenNotification('success', response.message)
        setOpen(false)
        setPCategory('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleFetchPodcasts = async () => {
    await getPodcastsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        if(currentItem === "All") {
          setPodcastData(response.results)
        } else if(currentItem === "Published") {
          const filteredData = response.results.filter((podcast: any) => podcast.status === "published" || podcast.status === "on-going");
          setPodcastData(filteredData)
        } else if(currentItem === "Draft") {
          const filteredData = response.results.filter((podcast: any) => podcast.status === "draft");
          setPodcastData(filteredData)
        }else if(currentItem === "Removed") {
          const filteredData = response.results.filter((podcast: any) => podcast.status === "removed");
          setPodcastData(filteredData)
        }
      }
    })
  }

  const screenHeight = getHeight();

  const handleModalClose = () => {
    setIsEdit(false)
    setOpenModal(false)
  }

  const filteredData =
    podcastData &&
    podcastData.filter((item: any) =>
      item.producedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
      defaultValues: {
        title: '',
        producedBy: '',
        podcastLink: '',
        duration: '',
        description: ''
      },
  });

  const onSubmit = async (data: FormValues) => {

    if(isEdit) {
      const payload = {
        title: data.title,
        producedBy: data.producedBy,
        link: data.podcastLink,
        source: sources,
        duration: data.duration,
        summary: data.description,
        releaseDate: selectedDate.toDate(),
        category: selectedCategory,
        podcastId,
        // image: 
      }
  
      await updatePodcastMutation.mutateAsync(payload, {
        onSuccess: async (response) => {
          await handleFetchPodcasts()
          handleOpenNotification('success', response.message)
          handleModalClose()
          reset()
          setSelectedDate(dayjs())
          setStatus('')
          setSelectedCategory('')
          setSources([{
            source: '',
            link: ''
          }])
          setPodcastId('')
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
        }
      })
    } else {
      const payload = {
        title: data.title,
        producedBy: data.producedBy,
        link: data.podcastLink,
        source: sources,
        duration: data.duration,
        summary: data.description,
        releaseDate: selectedDate.toDate(),
        status,
        category: selectedCategory,
        // image: 
      }
  
      await postPodcastMutation.mutateAsync(payload, {
        onSuccess: async (response) => {
          await handleFetchPodcasts()
          handleOpenNotification('success', response.message)
          handleModalClose()
          reset()
          setSelectedDate(dayjs())
          setStatus('')
          setSelectedCategory('')
          setSources([{
            source: '',
            link: ''
          }])
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
        }
      })
    }
    
  };


  useEffect(() => {
    handleFetchPodcasts()
  },[currentItem]);

  useEffect(() => {
    handleFetchCategories()
  },[]);

  useEffect(() => {
    if(podcastId) {
      handleGetSinglePodcast(podcastId)
    }
  },[podcastId]);

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
          alignItems: sm ? 'flex-start' : 'center',
          gap: sm ? 4 : 0
        }}
      >
        <Typography variant={ md ? "h5" : "h4" }>
          Podcast
        </Typography>
        {(session?.user.userType.includes('podcast') || session?.user.userType.includes('admin')) && (<NButton textcolor="white" bkgcolor={theme.palette.primary.main} onClick={() => setOpenModal(true)}>
          <Add/> New podcast
        </NButton>)}
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
              prefix={<SearchOutlined sx={{color: theme.palette.border.main}}/>} 
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
          <PodcastAdminTable
            //@ts-ignore
            data={filteredData}
            setIsEdit={setIsEdit}
            setOpenModal={setOpenModal}
            setPodcastId={setPodcastId}
            setIsStatus={setIsStatus}
          />
        </Box>
      </Box>

      <MModal
        onClose={handleModalClose}
        open={openModal}
        width={sm ? '95%' : '60%'}
        showCloseIcon={false}
      >
        <Box className="flex flex-col"
          sx={{
            height: screenHeight/100 * 80,
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll', 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: '15%',
              bgcolor: 'white',
              borderBottom: `1px solid ${theme.palette.border.main}`,
              alignItems: 'center',
              px: 2
            }}
          >
              <Typography variant='labellg'>
                {isEdit ? 'Update podcast' : 'New podcast'}
            </Typography>
            <IconButton>
              <Close 
                onClick={handleModalClose}
                sx={{
                  fontSize: '20px',
                  color: theme.palette.secondary.light
                }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 4
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    my: 2
                  }}
                >
                  <InputField
                    label="Podcast Title"
                    placeholder="Enter title"
                    isBorder={true}
                    labelStyle={{
                      fontSize: theme.typography.labelsm.fontSize,
                      fontWeight: 500
                    }}
                    errorMessage={errors.title?.message}
                    error={!!errors.title}
                    register={register('title')}
                  />
                </Box>
                <Box
                  sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                  }}
                >
                    <Typography variant="labelxs"
                        sx={{
                            mb: 2
                        }}
                    >
                        Podcast Category
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={podcastCategories}
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
                    {session?.user.userType.includes('admin') && (<Typography 
                        onClick={()=>setOpen(true)}
                        variant='labelxs' color={theme.palette.primary.main}
                        sx={{cursor: 'pointer'}}
                    >
                        Add podcast category
                    </Typography>)}
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'end'}
                  justifyContent={'end'}
                  gap={theme.spacing(0)}
                  mr={2} mt={2}
                >
                  <Typography variant="labelxs"
                    color={theme.palette.primary.main}
                    onClick={handleAddLink}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.darker
                      }
                    }}
                  >
                    Add
                  </Typography>
                </Box>
                {
                  sources?.map((source, index) => (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        width: '100%',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{width: '50%', mb: 3}}>
                        <Typography variant="labelxs">
                          Source
                        </Typography>
                        <Select
                          className="w-full h-10 font-light"
                          options={PodcastSource}
                          styles={customStyles}
                          placeholder="Choose podcast source"
                          name="podcast source"
                          onChange={(item) => {
                            const newSource = [...sources];
                            newSource[index].source = String(item?.value)
                            setSources(newSource);
                          }}
                          value={{
                            value: source.source,
                            label: source.source,
                          }}
                        />
                      </Box>
                      <Box sx={{width: '50%'}}>
                        <InputField
                          label={index === 0 ? 'Link' : ''}
                          type="text"
                          placeholder="Link"
                          value={source.link}
                          isBorder={true}
                          onChange={(e) => {
                            const newSource = [...sources];
                            newSource[index].link = e.target.value;
                            setSources(newSource);
                          }}
                          labelStyle={{
                            fontSize: theme.typography.labelxs.fontSize,
                            mb: -1,
                            fontWeight: 500
                          }}
                        />
                      </Box>
                      
                      <IconButton onClick={() => handleRemoveLink(index)}
                        disabled={index === 0}
                      >
                        <Close 
                          sx={{
                            fontSize: '16px',
                            color: index === 0 ? theme.palette.border.main : theme.palette.state.error,
                            mt: index === 0 ? 2 : 0
                          }}
                        />
                      </IconButton>
                    </Box>
                  ))
                }
                <Box
                  sx={{
                    width: '100%',
                    my: 2
                  }}
                >
                    <InputField
                      label="Description"
                      placeholder="description"
                      isBorder={true}
                      labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: 500
                      }}
                      multiline={true}
                      rows={4}
                      errorMessage={errors.description?.message}
                      error={!!errors.description}
                      register={register('description')}
                    />
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: sm ? 'column' : 'row',
                    gap: sm ? 3 : 3
                  }}
                >
                  <Box
                    sx={{
                      width: sm ? '100%' : '60%'
                    }}
                  >
                    <InputField
                      label="Produced by"
                      placeholder="Enter name"
                      isBorder={true}
                      labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: 500
                      }}
                      errorMessage={errors.producedBy?.message}
                      error={!!errors.producedBy}
                      register={register('producedBy')}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: sm ? '100%' : '30%'
                    }}
                  >
                    <Typography variant="labelxs">
                      Release Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']} sx={{width: '100%'}}>
                        <DatePicker
                          value={selectedDate}
                          onChange={(newValue: any) => setSelectedDate(newValue)}
                          slots={{ textField: (params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              sx={{ height: 40, width: '100%' }}
                              InputProps={{
                                ...params.InputProps,
                                style: { 
                                  height: 40,
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  borderRadius: theme.borderRadius.sm,
                                  backgroundColor: 'white'
                                }
                              }}
                            />
                          )}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box> 
                  <Box
                    sx={{
                      width: sm ? '100%' : '30%',
                      mt: 1
                    }}
                  >
                    <InputField
                      label="Duration"
                      placeholder="duration"
                      isBorder={true}
                      labelStyle={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: 500, mb: -1
                      }}
                      errorMessage={errors.duration?.message}
                      error={!!errors.duration}
                      register={register('duration')}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  height: '15%',
                  bgcolor: 'white',
                  borderTop: `1px solid ${theme.palette.border.main}`,
                  alignItems: 'center',
                  gap: 2,
                  px: 2, py: 2
                }}
              >
                {!isEdit && (<>
                  <NButton
                    bkgcolor={'white'}
                    textcolor="black"
                    bordercolor={theme.palette.border.main}
                    hoverbordercolor={theme.palette.border.main}
                    type="submit"
                    onMouseEnter={()=>setStatus("draft")}
                    disabled={activeStatus === 'draft' || activeStatus === 'removed'}
                  >
                    {postPodcastMutation.isLoading && status === 'draft' ? 'Saving...' : 'Save as draft'}
                  </NButton>
                  <NButton
                    bkgcolor={activeStatus === 'removed' || activeStatus === 'published' ? theme.palette.border.main : theme.palette.primary.main}
                    textcolor="white"
                    type="submit"
                    onMouseEnter={()=>setStatus("published")}
                    disabled={activeStatus === 'removed' || activeStatus === 'published'}
                  >
                    {postPodcastMutation.isLoading && status === 'publish' ? 'Publishing...' : 'Publish'}
                  </NButton>
                </>)}
                {isEdit && (<NButton
                  bkgcolor={activeStatus === 'removed' || activeStatus === 'published' ? theme.palette.border.main : theme.palette.primary.main}
                  textcolor="white"
                  type="submit"
                  disabled={activeStatus === 'removed' || activeStatus === 'published'}
                >
                  {updatePodcastMutation.isLoading ? 'Saving...' : 'Save'}
                </NButton>)}
              </Box>
              
            </form>
          </Box>
        </Box>
      </MModal>

      <MModal
        onClose={()=> {
          setOpen(false)
          setPCategory('')
        }}
        open={open}
        width={sm ? '95%' : '50%'}
        showCloseIcon={false}
        height={'220px'}
      >
        <Box className="flex flex-col"
          sx={{
            height: screenHeight/100 * 80,
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: '15%',
              bgcolor: 'white',
              borderBottom: `1px solid ${theme.palette.border.main}`,
              alignItems: 'center',
              px: 2
            }}
          >
            <Typography variant='labellg'>
              {'Podcast category'}
            </Typography>
            <IconButton>
              <Close 
                onClick={()=>setOpen(false)}
                sx={{
                  fontSize: '20px',
                  color: theme.palette.secondary.light
                }}
              />
            </IconButton>
          </Box>

          <Box width={'100%'} mb={3}>
            <InputField
              label={''}
              type="text"
              placeholder="Category"
              value={pcategory}
              isBorder={true}
              onChange={(e) => setPCategory(e.target.value)}
              labelStyle={{
                fontSize: theme.typography.labelsm.fontSize,
                fontWeight: 500
              }}
            />
          </Box>
          <NButton
            bkgcolor={theme.palette.primary.main}
            textcolor="white"
            width='100%'
            onClick={handleSubmitPCategory}
          >
            {postPodcastCategoryMutation.isLoading ? "Please wait..." : "Save"}
          </NButton>
        </Box>
      </MModal>

      <MModal
        onClose={()=> {
          setIsStatus(false)
          setPodcastId('')
        }}
        open={isStatus}
        width={sm ? '95%' : '30%'}
        showCloseIcon={false}
        height={'220px'}
      >
        <Box className="flex flex-col gap-2 p-3"
          sx={{
            height: screenHeight/100 * 80,
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll'
          }}
        >
          <Typography variant="labellg" mb={3}>
            Change Podcast Status
          </Typography>
          <NButton
            bkgcolor={'white'}
            textcolor="black"
            bordercolor={theme.palette.border.main}
            hoverbordercolor={theme.palette.border.main}
            onMouseEnter={()=>setStatus("draft")}
            disabled={activeStatus === 'removed' || activeStatus === 'draft'}
            onClick={handleChangeStatus}
          >
            Draft
          </NButton>
          <NButton
            bkgcolor={activeStatus === 'removed' || activeStatus === 'published' ? theme.palette.border.main : theme.palette.primary.main}
            textcolor="white"
            onMouseEnter={()=>setStatus("published")}
            disabled={activeStatus === 'published' || activeStatus === 'removed'}
            onClick={handleChangeStatus}
          >
            Publish
          </NButton>
          <NButton
            bkgcolor={activeStatus === 'removed' ? theme.palette.border.main : "red"}
            hovercolor="red"
            hoverbordercolor="red"
            textcolor="white"
            type="submit"
            onMouseEnter={()=>setStatus("removed")}
            disabled={activeStatus === 'removed'}
            onClick={handleChangeStatus}
          >
            Remove
          </NButton>
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
