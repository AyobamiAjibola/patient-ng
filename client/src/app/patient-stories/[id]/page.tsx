'use client';

import { useGetSingleStory } from "@/app/admin/hooks/patientStoriesHook/usePatientStories";
import Navbar from "@/app/components/Navbar";
import { Reply } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
]

export default function PatientStory({ params }: any) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const getSingleStoryMuatation = useGetSingleStory();
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

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
      <Box
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

          <Box sx={{display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', mt: 8 }}>
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
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1, my: 1
            }}
          >
            <Box sx={{backgroundColor: theme.palette.secondary.lighter, height: '1px', width: '49%'}}/>
            <Typography sx={{color: theme.palette.secondary.light, flex: 1, fontSize: theme.typography.labelxs.fontSize}}>
              OR
            </Typography>
            <Box sx={{backgroundColor: theme.palette.secondary.lighter, height: '1px', width: '49%'}}/>
          </Box>
          <Button
            sx={{
              textTransform: 'none',
              alignSelf: 'center',
              my: 2,
              borderRadius: theme.borderRadius.sm,
              width: '120px',
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.lighter}`,
              '&:hover': {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
              px: theme.spacing(3),
            }}
          >
            <Reply sx={{ mb: 1}}/> Share
          </Button>
        </Box>
      </Box>
    </>
  )
}
