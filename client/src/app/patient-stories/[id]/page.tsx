'use client';

import { useGetSingleStory } from "@/app/admin/hooks/patientStoriesHook/usePatientStories";
import { FramerMotion3 } from "@/app/components/FramerMotion";
import Navbar from "@/app/components/Navbar";
import Toastify from "@/app/components/ToastifySnack";
import { Reply } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const socials = [
  {
      logo: '/gmail_logo.png',
      link: ''
  },
  {
      logo: '/x_logo.png',
      link: ''
  },
  {
      logo: '/fb_logo.png',
      link: ''
  },
  {
      logo: '/linkedIn.png',
      link: ''
  }
];

export default function PatientStory({ params }: any) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const getSingleStoryMuatation = useGetSingleStory();
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const pathname = usePathname();

  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpenNotification(true);
  };

  const shareData = {
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${pathname}`
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        handleOpenNotification('error', '', 'Error sharing content')
      }
    } else {
      handleOpenNotification('error', '', 'Web Share API not supported in your browser')
    }
  };

  const fetchData = async (id: string) => {
    await getSingleStoryMuatation.mutateAsync(id, {
      onSuccess: (response: any) => {
        setTitle(response.result.title)
        setContent(response.result.content)
        setImage(response.result.image)
      }
    })
  }

  useEffect(() => {
    fetchData(params.id)
  },[params]);

  return (
    <>
      <Navbar/>
      <FramerMotion3
        sx={{
          display: 'flex',
          gap: 4, height: '100vh',
          pt: 7
        }}
      >
        {!md && (<img
          src={image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image}` : '/p_patient.png'}
          alt='patient'
          crossOrigin='anonymous'
          style={{
            width: '40%',
            height: '100%'
          }}
        />)}
        <Box
          sx={{
            display: 'flex',
            pr: 5, flexDirection: 'column',
            py: 4, overflow: 'auto',
            pl: md ? 4 : 0
          }}
        >
          <Typography variant="h3" mb={3}>
            {title}
          </Typography>
          <Typography color={theme.palette.secondary.light} variant='paragraphsm'>
            {content}
          </Typography>

          {/* <Box sx={{display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', mt: 8 }}>
            {
                socials.map((logo, index) => (
                  <IconButton
                      key={index}
                  >
                    <Image
                      src={logo.logo}
                      alt='social media logo'
                      width={20}
                      height={20}
                    />
                  </IconButton>
                ))
            }
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1, mt: 4
            }}
          >
            <Box sx={{backgroundColor: theme.palette.secondary.lighter, height: '1px', width: '100%'}}/>
            {/* <Typography sx={{color: theme.palette.secondary.light, flex: 1, fontSize: theme.typography.labelxs.fontSize}}>
              OR
            </Typography>
            <Box sx={{backgroundColor: theme.palette.secondary.lighter, height: '1px', width: '49%'}}/> */}
          </Box>
          <Button
            sx={{
              textTransform: 'none',
              alignSelf: 'center',
              my: 2,
              borderRadius: theme.borderRadius.sm,
              width: '200px',
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.lighter}`,
              '&:hover': {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
              px: theme.spacing(3)
            }}
            onClick={handleShare}
          >
            <Reply sx={{ mb: 1}}/> Share your story
          </Button>
        </Box>
      </FramerMotion3>

      <Toastify
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </>
  )
}
