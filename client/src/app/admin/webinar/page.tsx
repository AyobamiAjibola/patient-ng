'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import WebinarAdminTable from "@/app/components/WebinarAdminTable";
import { Add, Close, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import capitalize from "capitalize";
import { useChangeWebinarStatus, useGetSingleWebinar, useGetWebinarCategories, useGetWebinars, usePostWebinar, usePostWebinarCategory, useUpdateWebinar } from "../hooks/webinarHook/useWebinar";
import Toastify from "@/app/components/ToastifySnack";
import { useSession } from "next-auth/react";

type FormValues = {
  webinarName: string;
  description: string;
  webinarLink: string;
  time: string;
  duration: string;
}

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [webinars, setWebinar] =  useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState([{
    speakerName: '',
    occupation: '',
    image: null
  }]);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [webinarCategories, setWebinarCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const postWebinarCategoryMutation = usePostWebinarCategory();
  const [wcategory, setWCategory] = useState<string>('');
  const fetchWebinarCategoryMutation = useGetWebinarCategories();
  const {data: session} = useSession();
  const [status, setStatus] = useState<string>('');
  const postWebinarMutation = usePostWebinar();
  const fetchWebinarsMutation = useGetWebinars();
  const [webinarId, setWebinarId] = useState('');
  const singleWebinarMutattion = useGetSingleWebinar();
  const [isStatus, setIsStatus] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState('');
  const updateWebinarMutation = useUpdateWebinar();
  const changeWebinarStatusMutation = useChangeWebinarStatus();

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

  const handleGetSingleWebinar = async () => {
    await singleWebinarMutattion.mutateAsync(webinarId, {
      onSuccess: async(response: any) => {
        setValue('webinarName', response.result.title)
        setValue('webinarLink', response.result.webinarLink)
        setValue('description', response.result.summary)
        setValue('duration', response.result.duration)
        setSpeakers(response.result.speakers)
        setSelectedDateTime(dayjs(response.result.speakers.webinarDateTime))
        setSelectedCategory(response.result.category)
        setStatus(response.result.status)
        setActiveStatus(response.result.status)
      }
    })
  }

  const handleChangeStatus = async () => {
    await changeWebinarStatusMutation.mutateAsync({
      status,
      webinarId
    }, {
      onSuccess: async (response: any) => {
        await handleFetchWebinars()
        handleOpenNotification('success', response.message)
        setIsStatus(false)
        setWebinarId('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const item = [
    "All",
    "Published",
    "Completed",
    sm ? "" : "Draft"
  ]

  const getHeight = () => {
    if (typeof window !== 'undefined') {
        return window.innerHeight;
    }
        return 0;
  };

  const screenHeight = getHeight();

  const handleAddSpeaker = () => {
    setSpeakers((prevSpeakers) => [
      ...prevSpeakers,
      { speakerName: '', occupation: '', image: null },
    ]);
  };

  const handleImageChange = (e: any, index: number) => {
    const file = e.target.files[0];
    if (file) {
      const newSpeakers = [...speakers];
      newSpeakers[index].image = file;
      setSpeakers(newSpeakers);
    }
  };

  const handleRemoveSpeaker = (index: number) => {
    const newSpeakers = [...speakers];
    newSpeakers.splice(index, 1);
    setSpeakers(newSpeakers);
  };

  const handleModalClose = () => {
    setIsEdit(false)
    setOpenModal(false)
    setWebinarId('')
  }

  const filteredData =
    webinars &&
    webinars.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const handleFetchWebinars = async () => {
    await fetchWebinarsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const webinarData = response.results;
        if(currentItem === "All") {
          setWebinar(webinarData)
        } else if(currentItem === "Published") {
          const filteredData = webinarData.filter((webinars: any) => webinars.status === "published");
          setWebinar(filteredData)
        }else if(currentItem === "Completed") {
          const filteredData = webinarData.filter((webinar: any) => webinar.status === "completed");
          setWebinar(filteredData)
        }else if(currentItem === "Draft") {
          const filteredData = webinarData.filter((webinar: any) => webinar.status === "draft");
          setWebinar(filteredData)
        }
      }
    })
  }

  const handleFetch = async () => {
    await fetchWebinarCategoryMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        let cat: any[] = [];
        response.results.map((item: any, _: number) => (
            cat.push({
              value: item.name,
              label: capitalize.words(item.name)
            })
        ))
        setWebinarCategories(cat)
      }
    })
  }

  const handleSubmitWCategory = async () => {
    await postWebinarCategoryMutation.mutateAsync({name: wcategory.toLocaleLowerCase()}, {
      onSuccess: async (response) => {
        await handleFetch()
        handleOpenNotification('success', response.message)
        setOpen(false)
        setWCategory('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
      defaultValues: {
        webinarName: '',
        description: '',
        webinarLink: '',
        duration: ''
      },
  });

  const onSubmit = async (data: FormValues) => {

    if(isEdit) {
      const payload = {
        title: data.webinarName,
        webinarLink: data.webinarLink,
        summary: data.description,
        duration: data.duration,
        speakers,
        webinarDateTime: selectedDateTime.toDate(),
        category: selectedCategory,
        webinarId
      }
      
      await updateWebinarMutation.mutateAsync(payload, {
        onSuccess: async (response) => {
          await handleFetchWebinars();
          handleOpenNotification('success', response.message)
          setOpenModal(false)
          reset()
          setSpeakers([{
            speakerName: '',
            occupation: '',
            image: null
          }]);
          setSelectedCategory('')
          setStatus('')
          setWebinarId('')
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
        }
      })
    } else {
      const payload = {
        title: data.webinarName,
        webinarLink: data.webinarLink,
        summary: data.description,
        duration: data.duration,
        speakers,
        webinarDateTime: selectedDateTime.toDate(),
        category: selectedCategory,
        status: status
      }
      
      await postWebinarMutation.mutateAsync(payload, {
        onSuccess: async (response) => {
          await handleFetchWebinars();
          handleOpenNotification('success', response.message)
          setOpenModal(false)
          reset()
          setSpeakers([{
            speakerName: '',
            occupation: '',
            image: null
          }]);
          setSelectedCategory('')
          setStatus('')
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
        }
      })
    }
  };

  useEffect(() => {
    handleFetchWebinars()
  },[currentItem]);

  useEffect(() => {
    handleFetch();
  },[]);

  useEffect(() => {
    if(webinarId) {
      handleGetSingleWebinar()
    }
  },[webinarId])

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
          Webinars
        </Typography>
        {session?.user.userType.includes('webinar') || session?.user.userType.includes('admin') && (<NButton textcolor="white" bkgcolor={theme.palette.primary.main} onClick={() => setOpenModal(true)}>
          <Add/> New webinar
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
            px: 2,
            overflow: 'scroll'
          }}
        >
          <WebinarAdminTable
            //@ts-ignore
            data={filteredData}
            setIsEdit={setIsEdit}
            setOpenModal={setOpenModal}
            setWebinarId={setWebinarId}
            setIsStatus={setIsStatus}
          />
        </Box>
      </Box>

      <MModal
        onClose={()=> {
          setOpen(false)
          setWCategory('')
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
                {'Webinar category'}
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

          <Box width={'100%'} mb={3}>
            <InputField
              label={''}
              type="text"
              placeholder="Category"
              value={wcategory}
              isBorder={true}
              onChange={(e) => setWCategory(e.target.value)}
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
            onClick={handleSubmitWCategory}
          >
            {postWebinarCategoryMutation.isLoading ? "Please wait..." : "Save"}
          </NButton>
        </Box>
      </MModal>

      <MModal
        onClose={handleModalClose}
        open={openModal}
        width={sm ? '95%' : '60%'}
        showCloseIcon={false}
      >
        <Box className="flex flex-col hide-scrollbar"
          sx={{
            height: screenHeight/100 * 80,
            bgcolor: theme.palette.secondary.lightest
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
              {isEdit ? (
              <Box display={'flex'}>
                <Typography variant='labellg'>
                  Update webinar
                </Typography>
              </Box>
            ) : (
              <Typography variant='labellg'>
                Create webinar
              </Typography>
            )}
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
                      label="Webinar Name"
                      placeholder="Webinar name"
                      isBorder={true}
                      labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: 500
                      }}
                      errorMessage={errors.webinarName?.message}
                      error={!!errors.webinarName}
                      register={register('webinarName')}
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
                        Webinar Category
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={webinarCategories}
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
                    {session?.user.isAdmin && (<Typography 
                        onClick={handleModalOpen}
                        variant='labelxs' color={theme.palette.primary.main}
                        sx={{cursor: 'pointer'}}
                    >
                        Add webinar category
                    </Typography>)}
                </Box>
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
                    width: '100%'
                  }}
                >
                    <InputField
                      label="Webinar Link"
                      placeholder="webinar link"
                      isBorder={true}
                      labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: 500
                      }}
                      errorMessage={errors.webinarLink?.message}
                      error={!!errors.webinarLink}
                      register={register('webinarLink')}
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
                      width: sm ? '100%' : '50%'
                    }}
                  >
                    <Typography variant="labelxs">
                      Date and Time
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']} sx={{width: '100%'}}>
                        <DateTimePicker
                          value={selectedDateTime}
                          onChange={(newValue: any) => setSelectedDateTime(newValue)}
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
                      width: sm ? '100%' : '50%',
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

                <Box
                  display={'flex'}
                  alignItems={'end'}
                  justifyContent={'end'}
                  gap={theme.spacing(0)}
                  mr={2} mt={2}
                >
                  <Typography variant="labelxs"
                    color={theme.palette.primary.main}
                    onClick={handleAddSpeaker}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.darker
                      }
                    }}
                  >
                    Add speaker
                  </Typography>
                </Box>
                {
                  speakers.map((speaker, index) => (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        width: '100%',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{width: '33%'}}>
                        <InputField
                          label={index === 0 ? 'Speaker Name' : ''}
                          type="text"
                          placeholder="Speaker name"
                          value={speaker.speakerName}
                          isBorder={true}
                          onChange={(e) => {
                            const newSpeakers = [...speakers];
                            newSpeakers[index].speakerName = e.target.value;
                            setSpeakers(newSpeakers);
                          }}
                          labelStyle={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: 500
                          }}
                        />
                      </Box>
                      <Box sx={{width: '33%'}}>
                        <InputField
                          label={index === 0 ? 'Occupation' : ''}
                          type="text"
                          placeholder="occupation"
                          value={speaker.occupation}
                          isBorder={true}
                          onChange={(e) => {
                            const newSpeakers = [...speakers];
                            newSpeakers[index].occupation = e.target.value;
                            setSpeakers(newSpeakers);
                          }}
                          labelStyle={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: 500
                          }}
                        />
                      </Box>
                      <Box sx={{ width: '33%', mt: 2 }}>
                        <input
                          accept="image/jpeg, image/png"
                          type="file"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                      </Box>
                      <IconButton onClick={() => handleRemoveSpeaker(index)}
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
                  px: 2, py: 2,
                  mt: 2
                }}
              >
                {!isEdit && (<>
                  <NButton
                    disabled={isEdit && status === 'completed' || isEdit && status === 'draft' || isEdit && status === 'published'}
                    type="submit"
                    bkgcolor={'white'}
                    textcolor="black"
                    bordercolor={theme.palette.border.main}
                    onMouseEnter={()=>setStatus('draft')}
                  >
                    {status === 'draft' && postWebinarMutation.isLoading 
                      ? 'Saving...' 
                      : 'Save as draft'}
                  </NButton>
                  <NButton
                    disabled={isEdit && status === 'completed' || isEdit && status === 'on-going' || isEdit && status === 'published'}
                    type="submit"
                    bkgcolor={theme.palette.primary.main}
                    textcolor="white"
                    onMouseEnter={()=>setStatus('published')}
                  >
                    {status === 'publish' && postWebinarMutation.isLoading ? 'Publishing...' : 'Publish'}
                  </NButton>
                </>)}
                {isEdit && (<NButton
                  bkgcolor={theme.palette.primary.main}
                  textcolor="white"
                  type="submit"
                >
                  {updateWebinarMutation.isLoading ? 'Saving...' : 'Save'}
                </NButton>)}
              </Box>
            </form>
          </Box>
        </Box>
      </MModal>

      <MModal
        onClose={()=> {
          setIsStatus(false)
          setWebinarId('')
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
            Change Webinar Status
          </Typography>
          <NButton
            bkgcolor={'white'}
            textcolor="black"
            bordercolor={theme.palette.border.main}
            hoverbordercolor={theme.palette.border.main}
            onMouseEnter={()=>setStatus("draft")}
            disabled={activeStatus === 'completed' || activeStatus === 'draft' || activeStatus === 'on-going'}
            onClick={handleChangeStatus}
          >
            Draft
          </NButton>
          <NButton
            bkgcolor={activeStatus === 'completed' || activeStatus === 'published' || activeStatus === 'on-going' ? theme.palette.border.main : theme.palette.primary.main}
            textcolor="white"
            onMouseEnter={()=>setStatus("published")}
            disabled={activeStatus === 'published' || activeStatus === 'completed' || activeStatus === 'on-going'}
            onClick={handleChangeStatus}
          >
            Publish
          </NButton>
          <NButton
            bkgcolor={activeStatus === 'completed' ? theme.palette.border.main : theme.palette.primary.darker}
            hovercolor={theme.palette.primary.darker}
            hoverbordercolor={theme.palette.primary.darker}
            textcolor="white"
            type="submit"
            onMouseEnter={()=>setStatus("completed")}
            disabled={activeStatus === 'completed'}
            onClick={handleChangeStatus}
          >
            Completed
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
