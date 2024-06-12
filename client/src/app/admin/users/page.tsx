'use client';

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import UsersAdminTable from "@/app/components/UsersAdminTable";
import { Add, Close, SearchOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Snackbar, SnackbarOrigin, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectComponent from "../components/MultiSelect";
import Toastify from "@/app/components/ToastifySnack";
import { useCreateUser, useFetchUsers } from "../hooks/userHook/useUser";
import { types } from "../../../../types/models";
import { useSession } from "next-auth/react";

const item = [
  "All users",
  "Active users",
  "Inactive users"
]

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

type OptionType = {
  label: string;
  value: string;
};

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All users');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<any>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const createUserMutation = useCreateUser();
  const fetchUserMutation = useFetchUsers();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpen(true);
  };

  const filteredData =
    users &&
    users.filter((item: any) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const handleModalClose = () => {
    setOpenModal(false)
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: ''
      },
  });

  const onSubmit = async (data: FormValues) => {

    if(!selectedOptions) {
      setSnackbarOpen(true)
      setIsError(true)
      setError("Please select permissions for the user.")
      handleOpenNotification('error', '', "Please select permissions for the user.")
    };

    let perms: string[] = []
    if(selectedOptions) {
      selectedOptions.forEach(obj => {
        perms.push(obj.value)
      });
    }

    const payload = {
      ...data,
      userType: perms
    }

    await createUserMutation.mutateAsync(payload as types.CreateUserRequest, {
      onError: (error: any) => {
        setError(error.response.data.message)
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      },
      onSuccess: () => {
        setOpenModal(false);
        fetchUserMutation.mutateAsync();
        reset()
        setSelectedOptions([]);
      }
    })
  };

  useEffect(() => {
    if(currentItem === "All users") {
      setUsers(fetchUserMutation.data?.results)
    } else if(currentItem === "Active users") {
      const filteredData = fetchUserMutation.data?.results?.filter((data) => data.active === true);
      setUsers(filteredData)
    } else if(currentItem === "Inactive users") {
      const filteredData = fetchUserMutation.data?.results?.filter((data) => data.active === false);
      setUsers(filteredData)
    }
  },[currentItem, fetchUserMutation.isSuccess]);

  useEffect(() => {
    const fetchUsers = () => {
      fetchUserMutation.mutateAsync()
    }

    fetchUsers()
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
          flexDirection: sm ? 'column' : 'row',
          justifyContent: sm ? 'flex-start' : 'space-between',
          alignItems: sm ? 'flex-start' : 'center'
        }}
      >
        <Typography variant={ md ? "h5" : "h4" }>
          User
        </Typography>
        <NButton
          textcolor="white" 
          bkgcolor={theme.palette.primary.main} 
          onClick={() => setOpenModal(true)}
        >
          <Add/> New User
        </NButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          p: 1,
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
            px: 2, mb: 2
          }}
        >
          <Box 
            sx={{
              width: "70%",
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
          <Box sx={{width: "30%"}}>
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
          <UsersAdminTable
            //@ts-ignore
            data={filteredData}
          />
        </Box>
      </Box>

      <MModal
        onClose={handleModalClose}
        open={openModal}
        width={sm ? '95%' : '40%'}
        showCloseIcon={false}
      >
        <Box className="flex flex-col justify-center items-center "
          sx={{
            height: 'auto',
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll', 
            p: 3
          }}
        >
          <Box className="flex justify-between items-center w-full">
            <Typography variant="labellg">
              New User
            </Typography>
            <IconButton
              onClick={()=>setOpenModal(false)}
            >
              <Close/>
            </IconButton>
          </Box>
          <Divider sx={{my: 3, width: '100%'}}/>
          <form onSubmit={handleSubmit(onSubmit)} noValidate style={{width: '100%'}}>
            <Box
              sx={{
                width: '100%',
                mt: 1
              }}
            >
              <InputField
                label="First name"
                placeholder="First name"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                errorMessage={errors.firstName?.message}
                error={!!errors.firstName}
                register={register('firstName', {
                  required: 'First name is required',
                })}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                mt: 1
              }}
            >
              <InputField
                label="Last name"
                placeholder="Last name"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                errorMessage={errors.lastName?.message}
                error={!!errors.lastName}
                register={register('lastName', {
                  required: 'Last name is required',
                })}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                mt: 1
              }}
            >
              <InputField
                label="Email"
                placeholder="Email"
                type="email"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                errorMessage={errors.email?.message}
                error={!!errors.email}
                register={register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                mt: 1
              }}
            >
              <MultiSelectComponent
                setSelectedOptions={setSelectedOptions}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                label="Select user permissions"
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                mt: 4
              }}
            >
              <NButton type="submit"
                bkgcolor={theme.palette.primary.main}
                textcolor="white"
                hoverbordercolor={theme.palette.primary.main}
                width="100%"
              >
                {createUserMutation.isLoading ? 'Saving...' : 'Submit'}
              </NButton>
            </Box>
          </form>
        </Box>
      </MModal>

      <Toastify
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </Box>
  )
}
