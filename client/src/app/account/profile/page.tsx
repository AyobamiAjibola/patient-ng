'use client';

import { useChangePassword, useFetchSingleUser, useUpdateUser } from "@/app/admin/hooks/userHook/useUser";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { FileDownloadOutlined, Upload } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const gender = [
  {value: 'male', label: 'Male'}, 
  {value: 'female', label: 'Female'}
];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  oldPassword?: string;
  newPassword?: string;
}

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<any>(null);
  const [profileImage, setProfileImage] = useState(null);
  const updateUserMutation = useUpdateUser();
  const getUserMutation = useFetchSingleUser();
  const {data: session} = useSession();
  const changePassworcMutation = useChangePassword();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

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

  const handleModalClose = () => {
    setOpenSnack(false)
  }

  const handleChangePassword = async () => {
    await changePassworcMutation.mutateAsync({
      currentPassword: oldPassword,
      newPassword
    }, {
      onSuccess: async () => {
        await fetchSingleUser(session?.user.userId)
        handleOpenNotification('success', 'Successfully changed password.')
        setNewPassword('')
        setOldPassword('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleDistrict = (value: any) => {
    if (!value) {
      return;
    }
    const newData = Object.entries(stateLga).find(
      (_items) => _items[0] === value
    );

    if (!newData) {
      return;
    }
    const districtArray = newData[1]?.map(
      (item) => {
        return {
          value: item,
          label: item,
        };
      }
    );
    setDistrict(districtArray);
  };

  const fetchSingleUser = async (id: any) => {
    await getUserMutation.mutateAsync(id, {
      onSuccess: (response: any) => {
        const data = response.result;
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
        setValue('email', data.email)
        setValue('phone', data.phone)
        setValue('age', data.age)
        setValue('address', data.address)
        setImagePreview(data.image)
        setSelectedGender(data.gender)
        setSelectedState(data.state)
        setSelectedDistrict(data.lga)
      }
    })
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      address: data.address,
      image: profileImage,
      gender: selectedGender,
      state: selectedState,
      lga: selectedDistrict,
      userId: session?.user.userId
    }

    updateUserMutation.mutateAsync(payload, {
      onSuccess: async () => {
        await fetchSingleUser(session?.user.userId)
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
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 0,
      address: ''
    },
  });

  useEffect(() => {
    let stateArray: any = [];
    const newData = Object.entries(stateLga);

    newData.map((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateArray);
  }, []);

  useEffect(() => {
    fetchSingleUser(session?.user.userId)
  },[session]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 6
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: 4
          }}
        >
          <input
            name="profileImage"
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(event: any) => {
              const previewURL = URL.createObjectURL(event.target.files[0]);
              setImagePreview(previewURL);
              setProfileImage(event.currentTarget.files[0])
            }}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            {imagePreview && (
            <img
              src={imagePreview.includes('uploads/') ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${imagePreview}` : imagePreview}
              alt=""
              className="w-[150px] h-[150px] rounded-[50%] mt-5"
              crossOrigin="anonymous"
            />)}
            {!imagePreview && (
              <div
                className={`w-[150px] h-[150px] rounded-[50%] mt-5
                border-[1px] flex justify-center items-center
                hover:border-[1px] hover:border-[#05CC7E] border-dashed`}
              >
                <div className="flex flex-col justify-center items-center">
                  <Upload sx={{fontSize: '30px'}}/>
                  <div className="mt-4">Upload Image</div>
                </div>
                
              </div>
            )}
          </div>
        </Box>
        <Box
          sx={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex', gap: 3
          }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="First Name"
                placeholder="First name"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                errorMessage={errors.firstName?.message}
                error={!!errors.firstName}
                register={register('firstName')}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="Last Name"
                placeholder="Last name"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                errorMessage={errors.lastName?.message}
                error={!!errors.lastName}
                register={register('lastName')}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex', gap: 3, my: 4
          }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="Email Address"
                placeholder="Email address"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                errorMessage={errors.email?.message}
                error={!!errors.email}
                register={register('email')}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="Phone Number"
                placeholder="Phone number"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                errorMessage={errors.phone?.message}
                error={!!errors.phone}
                register={register('phone', {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Invalid Phone Number',
                  },
                  maxLength: {
                    value: 11,
                    message: 'Phone Number should not exceed 12 digits',
                  },
                  minLength: {
                    value: 11,
                    message: 'Phone Number should not less than 12 digits',
                  },
                })}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex', gap: 3
          }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="Age"
                placeholder="Age"
                type="number"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                errorMessage={errors.age?.message}
                error={!!errors.age}
                register={register('age', {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Age must be number.',
                  }
                })}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <Typography
              sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight,
                  mb: 2
              }}
            >
                Gender
            </Typography>
            <Select
              className="w-full h-10 font-light"
              options={gender}
              styles={customStyles}
              placeholder="Choose gender"
              name="gender"
              onChange={(item) => {
                setSelectedGender(String(item?.value));
              }}
              value={{
                value: selectedGender,
                label: selectedGender,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            mt: 4
          }}
        >
          <InputField
              label="Street Address"
              placeholder="Street address"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              errorMessage={errors.address?.message}
              error={!!errors.address}
              register={register('address')}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex', gap: 3, mt: 4, mb: 3
          }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <Typography
              sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight,
                  mb: 2
              }}
            >
                State
            </Typography>
            <Select
              className="w-full h-10 font-light"
              options={state}
              styles={customStyles}
              placeholder="Select State"
              name="state"
              onChange={(item) => {
                handleDistrict(String(item?.value));
                setSelectedState(String(item?.value));
              }}
              value={{
                  value: selectedState,
                  label: selectedState
              }}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight,
                mb: 2
              }}
            >
                LGA
            </Typography>
            <Select
              className="w-full h-10 font-light"
              options={district}
              styles={customStyles}
              placeholder="Select LGA"
              name="lga"
              onChange={(item) => {
                setSelectedDistrict(String(item?.value))
              }}
              value={{
                  value: selectedDistrict,
                  label: selectedDistrict,
              }}
            />
          </Box>
        </Box>

        <NButton
          textcolor="white"
          bkgcolor={theme.palette.primary.main}
          width="100%" 
          type="submit"
        >
          <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
            <FileDownloadOutlined/> {updateUserMutation.isLoading ? 'Saving...' : `Save`}
          </Typography>
        </NButton>
      </form>

      <Box width={'100%'} mb={6}>
        <Typography
          sx={{
            fontSize: theme.typography.h4.fontSize,
            fontWeight: theme.typography.h4.fontWeight,
            mt: 6, mb: 2
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            display: 'flex', gap: 3, my: 4
          }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="Old Password"
                placeholder="Old password"
                isBorder={true}
                type="password"
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '50%'
            }}
          >
            <InputField
                label="New Password"
                placeholder="New password"
                isBorder={true}
                type="password"
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelsm.fontWeight
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
            />
          </Box>
        </Box>
        
        <NButton 
          textcolor="white"
          bkgcolor={theme.palette.primary.main}
          width="100%" 
          onClick={handleChangePassword}
        >
          <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
            <FileDownloadOutlined/> {changePassworcMutation.isLoading ? 'Apllying...' : 'Apply Changes'}
          </Typography>
        </NButton>
      </Box>

      <Toastify
        open={openSnack}
        onClose={handleModalClose}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </Box>
  )
}
