'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import WebinarAdminTable from "@/app/components/WebinarAdminTable";
import { Add, AddCircle, Close, Remove, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
        speakers
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
          />
        </Box>
      </Box>

      <MModal
        onClose={() => setOpenModal(false)}
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
                height: '10%',
                bgcolor: 'white',
                borderBottom: `1px solid ${theme.palette.border.main}`,
                alignItems: 'center',
                px: 2
              }}
            >
               <Typography variant='labelsm'>
                  Create webinar
              </Typography>
              <IconButton>
                <Close 
                  onClick={() => setOpenModal(false)}
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
                px: 2
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
                          fontSize: theme.typography.labelbase.fontSize,
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
                          fontSize: theme.typography.labelbase.fontSize,
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
                      my: 2
                    }}
                  >
                      <InputField
                        label="Webinar Link"
                        placeholder="webinar link"
                        isBorder={true}
                        labelStyle={{
                          fontSize: theme.typography.labelbase.fontSize,
                          fontWeight: 500
                        }}
                        errorMessage={errors.webinarLink?.message}
                        error={!!errors.webinarLink}
                        register={register('webinarLink')}
                      />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 3
                    }}
                  >

                  </Box>

                  <Box
                    display={'flex'}
                    alignItems={'end'}
                    justifyContent={'end'}
                    gap={theme.spacing(0)}
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
                          // flexDirection: sm ? 'column' : 'row',
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
                height: '10%',
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
