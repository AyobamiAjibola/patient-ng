'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import { Add, Close, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import AwardAdminTable from "@/app/components/AwardAdminTable";
import MultipleTextField from "@/app/components/MultipleTextField";

const awardData = [
  {
    _id: 1,
    awardName: "Excellence in Patient Care Award.",
    dateRecieved: '05 Dec 2023',
    recipient: 'ABC Hospital',
    nominees: 10,
    category: "award"
  },
  {
    _id: 3,
    awardName: "Excellence in Patient Care Award.",
    dateRecieved: '05 Dec 2023',
    recipient: 'ABC Hospital',
    nominees: 10,
    category: "award"
  },
  {
    _id: 3,
    awardName: "Excellence in Patient Care Award.",
    dateRecieved: '05 Dec 2023',
    recipient: 'ABC Hospital',
    nominees: 10,
    category: "award"
  },
];

const PodcastSource = [
  {value: 'youtube', label: 'Youtube'}, 
  {value: 'apple', label: 'Apple'},
  {value: 'spotify', label: 'Spotify'}
];

type FormValues = {
  awardName: string;
  podcastLink: string;
  duration: string;
  description: string;
}

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nominee, setNominee] = useState<string>('');
  const [items, setItems] = useState<any>([]);
  const [nominees, setNominees] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

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
    awardData &&
    awardData.filter((item: any) =>
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.awardName.toLowerCase().includes(searchQuery.toLowerCase())
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
        awardName: '',
        podcastLink: '',
        duration: '',
        description: ''
      },
  });

  const onSubmit = (data: FormValues) => {

    const payload = {
      ...data,
      date: selectedDate.toDate(),
      recipient: nominee,
      nominees
    }

    console.log(payload)
  };

  useEffect(() => {
    let arr: any = [];
    items.map((item: string, index: number ) => {
      arr.push({
        value: item,
        label: item
      })
    });

    setNominees(arr)
  },[items]);

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
          Award Management
        </Typography>
        <NButton textcolor="white" bkgcolor={theme.palette.primary.main} onClick={() => setOpenModal(true)}>
          <Add/> New Award
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
          <Box sx={{width: "100%"}}>
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
          <AwardAdminTable
            //@ts-ignore
            data={filteredData}
            setIsEdit={setIsEdit}
            setOpenModal={setOpenModal}
            setDeleteModalOpen={setDeleteModalOpen}
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
                {isEdit ? 'Update Award' : 'New Award'}
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
                    label="Award Name"
                    placeholder="Enter award name"
                    isBorder={true}
                    labelStyle={{
                      fontSize: theme.typography.labelsm.fontSize,
                      fontWeight: 500
                    }}
                    errorMessage={errors.awardName?.message}
                    error={!!errors.awardName}
                    register={register('awardName')}
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    mb: 3
                  }}
                >
                  <MultipleTextField
                    label={"Nominees"}
                    labelStyle={{
                      fontSize: theme.typography.fontSize.labelxs,
                      fontWeight: 500
                    }}
                    items={items}
                    setItems={setItems}
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    mb: 3
                  }}
                >
                  <Typography variant="labelxs">
                    Select recipient
                  </Typography>
                  <Select
                    className="w-full h-10 font-light mt-[2px]"
                    options={nominees}
                    styles={customStyles}
                    placeholder="Choose podcast source"
                    name="podcast source"
                    onChange={(item) => {
                      setNominee(String(item?.value));
                    }}
                    value={{
                      value: nominee,
                      label: nominee,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: '100%'
                  }}
                >
                  <Typography variant="labelxs">
                    Date received
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
              bkgcolor={theme.palette.primary.main}
              textcolor="white"
            >
              Save
            </NButton>
          </Box>
        </Box>
      </MModal>

      <MModal
        onClose={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        width={sm ? '80%' : '40%'}
        showCloseIcon={false}
      >
        <Box className="flex flex-col items-center justify-center p-5">
            <Typography variant="labellg" mb={4}>
              Are you sure want to delete this award?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3
              }}
            >
              <NButton
                bkgcolor={theme.palette.primary.main}
                textcolor="white"
                onClick={() => setDeleteModalOpen(false)}
              >
                Yes
              </NButton>
              <NButton
                bkgcolor={theme.palette.state.error}
                textcolor="white"
                onClick={() => setDeleteModalOpen(false)}
                hovercolor={theme.palette.state.error}
              >
                No
              </NButton>
            </Box>
        </Box>
      </MModal>
    </Box>
  )
}
