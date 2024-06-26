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
import { useGetAwards, useGetSingleAward, usePostAward } from "../hooks/userHook/useUser";
import Toastify from "@/app/components/ToastifySnack";

const awards = [
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
  const [awardName, setAwardname] = useState<string>('');
  const postAwardMutation = usePostAward();
  const fetchAwardsMutation = useGetAwards();
  const fetchSingleAwardMutation = useGetSingleAward();
  const [awards, setAwards] = useState<any[]>([]);
  const [currentAwardId, setCurrentAwardId] = useState<string>('');

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

  const handleGetSingleAward = async () => {
    await fetchSingleAwardMutation.mutateAsync(currentAwardId, {
      onSuccess: (response: any) => {
        console.log(response, 'response')
        setAwardname(response.result.awardName)
        setNominee(response.result.recipient)

      }
    })
  }

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
    awards &&
    awards.filter((item: any) =>
      item.awardName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const handleFetchAwards = async () => {
    await fetchAwardsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        setAwards(response.results)
      }
    })
  }

  const handleOnSubmit = async () => {
    let array = [];
    for (let x of nominees) {
      //@ts-ignore
      array.push(x.value);
    }

    const payload = {
      dateRecieved: selectedDate.toDate(),
      recipient: nominee,
      nominees: array,
      awardName: awardName
    }

    await postAwardMutation.mutateAsync(payload, {
      onSuccess: async (response) => {
        await handleFetchAwards()
        handleOpenNotification('success', response.message)
        handleModalClose()
        setAwardname('')
        setNominees([])
        setNominee('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })

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

  useEffect(() => {
    handleFetchAwards();
  },[]);

  useEffect(() => {
    if(currentAwardId) {
      handleGetSingleAward()
    }
  },[currentAwardId])
console.log(currentAwardId, 'id')
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
            setCurrentAwardId={setCurrentAwardId}
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
                  value={awardName}
                  onChange={(e) => setAwardname(e.target.value)}
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
              onClick={handleOnSubmit}
            >
              {postAwardMutation.isLoading ? 'Saving...' : 'Save'}
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
