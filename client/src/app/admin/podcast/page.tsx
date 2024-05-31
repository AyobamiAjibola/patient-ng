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

const podcastData = [
  {
    _id: 1,
    title: "Method Practicing Playful Creation.",
    releaseDate: '05 Dec 2023',
    status: "published",
    duration: "0h 51m 22s",
    producedBy: "Anita Baker"
  },
  {
    _id: 2,
    title: "Method Practicing Playful Creation.",
    releaseDate: '05 Dec 2023',
    status: "draft",
    duration: "0h 51m 22s",
    producedBy: "Anita Baker"
  },
  {
    _id: 3,
    title: "Method Practicing Playful Creation.",
    releaseDate: '05 Dec 2023',
    status: "removed",
    duration: "0h 51m 22s",
    producedBy: "Anita Baker"
  },
  {
    _id: 4,
    title: "Method Practicing Playful Creation.",
    releaseDate: '05 Dec 2023',
    status: "on-going",
    duration: "0h 51m 22s",
    producedBy: "Anita Baker"
  }
];

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
  const [podcasts, setPodcast] =  useState<any>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedPodSource, setSelectedPodSource] = useState<string>('');

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

  const screenHeight = getHeight();

  const handleModalClose = () => {
    setIsEdit(false)
    setOpenModal(false)
  }

  const filteredData =
    podcasts &&
    podcasts.filter((item: any) =>
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

  const onSubmit = (data: FormValues) => {

    const payload = {
      ...data,
      date: selectedDate.toDate(),
    }

    console.log(payload)
  };

  useEffect(() => {
    if(currentItem === "All") {
      setPodcast(podcastData)
    } else if(currentItem === "Published") {
      const filteredData = podcastData.filter((podcast) => podcast.status === "published" || podcast.status === "on-going");
      setPodcast(filteredData)
    } else if(currentItem === "Draft") {
      const filteredData = podcastData.filter((podcast) => podcast.status === "draft");
      setPodcast(filteredData)
    }else if(currentItem === "Removed") {
      const filteredData = podcastData.filter((podcast) => podcast.status === "removed");
      setPodcast(filteredData)
    }
  },[currentItem]);

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
        <NButton textcolor="white" bkgcolor={theme.palette.primary.main} onClick={() => setOpenModal(true)}>
          <Add/> New podcast
        </NButton>
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
                px: 2,
                py: 4
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
                      my: 2,
                      display: 'flex',
                      flexDirection: sm ? 'column' : 'row',
                      gap: 3
                    }}
                  >
                    <Box
                      sx={{
                        width: sm ? '100%' : '50%'
                      }}
                    >
                      <Typography variant="labelxs">
                        Gender
                      </Typography>
                      <Select
                        className="w-full h-10 font-light mt-[2px]"
                        options={PodcastSource}
                        styles={customStyles}
                        placeholder="Choose podcast source"
                        name="podcast source"
                        onChange={(item) => {
                          setSelectedPodSource(String(item?.value));
                        }}
                        value={{
                          value: selectedPodSource,
                          label: selectedPodSource,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: sm ? "100%" : "50%"
                      }}
                    >
                      <InputField
                        label="Podcast Link"
                        placeholder="Enter title"
                        isBorder={true}
                        labelStyle={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: 500
                        }}
                        errorMessage={errors.podcastLink?.message}
                        error={!!errors.podcastLink}
                        register={register('podcastLink')}
                      />
                    </Box>
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
                      width: '100%',
                      display: 'flex',
                      flexDirection: sm ? 'column' : 'row',
                      gap: sm ? 3 : 3
                    }}
                  >
                    <Box
                      sx={{
                        width: sm ? '100%' : '40%'
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
                        width: sm ? '100%' : '40%'
                      }}
                    >
                      <Typography variant="labelxs">
                        Date
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
                
              </form>
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
              <NButton
                bkgcolor={'white'}
                textcolor="black"
                bordercolor={theme.palette.border.main}
              >
                Save as draft
              </NButton>
              <NButton
                bkgcolor={theme.palette.primary.main}
                textcolor="white"
              >
                Publish
              </NButton>
            </Box>
          </Box>
      </MModal>
    </Box>
  )
}
