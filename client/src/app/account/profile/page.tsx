'use client';

import InputField from "@/app/components/InputField";
import PButton from "@/app/components/PButton";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { FileDownloadOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";

const gender = [
  {value: 'male', label: 'Male'}, 
  {value: 'female', label: 'Female'}
]

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

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
        mt: 6, mb: 8
      }}
    >
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
              label="Last Name"
              placeholder="Last name"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              // onChange={(e) => setData({...data, title: e.target.value})}
              // value={data.title}
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
              label="Phone Number"
              placeholder="Phone number"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              // onChange={(e) => setData({...data, title: e.target.value})}
              // value={data.title}
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
              label="Email Address"
              placeholder="Email address"
              isBorder={true}
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
            // onChange={(e) => setData({...data, title: e.target.value})}
            // value={data.title}
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

      <PButton transBg={false} bg={true} width="100%">
        <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
          <FileDownloadOutlined/> Apply Changes
        </Typography>
      </PButton>
    </Box>
  )
}
