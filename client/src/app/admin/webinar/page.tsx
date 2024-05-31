'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import WebinarAdminTable from "@/app/components/WebinarAdminTable";
import { Add, Close, SearchOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

const webinarData = [
  {
    _id: 1,
    name: "I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.",
    date: '05 Dec 2023',
    time: "2pm WAT",
    status: "pending",
    author: "Lisa James"
  },
  {
    _id: 2,
    name: "I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.",
    date: '05 Dec 2023',
    time: "2pm WAT",
    status: "on-going",
    author: "Kid Kudi"
  },
  {
    _id: 3,
    name: "I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.",
    date: '05 Dec 2023',
    time: "2pm WAT",
    status: "on-going",
    author: "Kida Kudx"
  },
  {
    _id: 4,
    name: "I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.",
    date: '05 Dec 2023',
    time: "2pm WAT",
    status: "completed",
    author: "Ezi Igi"
  },
  {
    _id: 4,
    name: "I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.",
    date: '05 Dec 2023',
    time: "2pm WAT",
    status: "draft",
    author: "Ezi Igi"
  },
];

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
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState([{
    speakerName: '',
    occupation: ''
  }]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const item = [
    "All",
    "Pending",
    "On going",
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
      { speakerName: '', occupation: '' },
    ]);
  };

  const handleRemoveSpeaker = (index: number) => {
    const newSpeakers = [...speakers];
    newSpeakers.splice(index, 1);
    setSpeakers(newSpeakers);
  };

  const handleModalClose = () => {
    setIsEdit(false)
    setOpenModal(false)
  }

  const filteredData =
    webinars &&
    webinars.filter((item: any) =>
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
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
        webinarName: '',
        description: '',
        webinarLink: '',
        time: '',
        duration: ''
      },
  });

  const onSubmit = (data: FormValues) => {

    const payload = {
        ...data,
        speakers,
        date: selectedDate.toDate(),
        time: selectedTime.toDate(),
    }

    console.log(payload)
  };

  useEffect(() => {
    if(currentItem === "All") {
      setWebinar(webinarData)
    } else if(currentItem === "Pending") {
      const filteredData = webinarData.filter((webinars) => webinars.status === "pending");
      setWebinar(filteredData)
    } else if(currentItem === "On going") {
      const filteredData = webinarData.filter((webinar) => webinar.status === "on-going");
      setWebinar(filteredData)
    }else if(currentItem === "Completed") {
      const filteredData = webinarData.filter((webinar) => webinar.status === "completed");
      setWebinar(filteredData)
    }else if(currentItem === "Draft") {
      const filteredData = webinarData.filter((webinar) => webinar.status === "draft");
      setWebinar(filteredData)
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
          Webinars
        </Typography>
        <NButton textcolor="white" bkgcolor={theme.palette.primary.main} onClick={() => setOpenModal(true)}>
          <Add/> New webinar
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
          <WebinarAdminTable
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
                  {isEdit ? 'Update webinar' : 'Create webinar'}
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
                      // mb: 2
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
                        width: sm ? '100%' : '40%'
                      }}
                    >
                      <Typography variant="labelxs">
                        Time
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DesktopTimePicker']}>
                          <DesktopTimePicker
                            value={selectedTime}
                            onChange={(newValue: any) => setSelectedTime(newValue)}
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
                        <Box sx={{width: '50%'}}>
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
                        <Box sx={{width: '50%'}}>
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
