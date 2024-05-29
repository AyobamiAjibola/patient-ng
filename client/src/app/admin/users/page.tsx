'use client';

import UsersAdminTable from "@/app/components/UsersAdminTable";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

const item = [
  "All users",
  "Active users",
  "Inactive users"
]

const usersData = [
  {
    _id: 1,
    name: "Eliz Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 2,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Male",
    state: "Abuja",
    status: "inactive"
  },
  {
    _id: 3,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 4,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 5,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Male",
    state: "Abuja",
    status: "inactive"
  },
  {
    _id: 6,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 7,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 8,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Male",
    state: "Abuja",
    status: "inactive"
  },
  {
    _id: 9,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 10,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 11,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Male",
    state: "Abuja",
    status: "inactive"
  },
  {
    _id: 12,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 13,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
  {
    _id: 14,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Male",
    state: "Abuja",
    status: "inactive"
  },
  {
    _id: 15,
    name: "Lisa Steve",
    email: "lisa@gmail.com",
    phoneNumber: '08043434343',
    gender: "Female",
    state: "Abuja",
    status: "active"
  },
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const [currentItem, setCurrentItem] = useState<string>('All users');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<any>([]);

  const filteredData =
    users &&
    users.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // const activeUsers = filteredData.filter((user) => user.status === "active");
  // const inactiveUsers = filteredData.filter((user) => user.status === "inactive");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  useEffect(() => {
    if(currentItem === "All users") {
      setUsers(usersData)
    } else if(currentItem === "Active users") {
      const filteredData = usersData.filter((data) => data.status === "active");
      setUsers(filteredData)
    } else if(currentItem === "Inactive users") {
      const filteredData = usersData.filter((data) => data.status === "inactive");
      setUsers(filteredData)
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
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Users
      </Typography>

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
    </Box>
  )
}
