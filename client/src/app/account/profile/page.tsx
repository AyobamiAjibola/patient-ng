'use client';

import InputField from "@/app/components/InputField";
import PButton from "@/app/components/PButton";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { FileDownloadOutlined, PlusOneOutlined, Upload } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      image: profileImage,
      gender: selectedGender,
      state: selectedState,
      lga: selectedDistrict
    }
    console.log(payload, 'data')
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 0,
      address: '',
      oldPassword: '',
      newPassword: ''
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
              src={imagePreview}
              alt=""
              className="w-[150px] h-[150px] rounded-[50%] mt-5"
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
            display: 'flex', gap: 3, mt: 4
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
                // onChange={(e) => setData({...data, title: e.target.value})}
                // value={data.title}
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
                // onChange={(e) => setData({...data, title: e.target.value})}
                // value={data.title}
            />
          </Box>
        </Box>

        <PButton transBg={false} bg={true} width="100%" type="submit">
          <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
            <FileDownloadOutlined/> Apply Changes
          </Typography>
        </PButton>
      </form>
    </Box>
  )
}
