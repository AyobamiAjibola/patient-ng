'use client';

import Navbar from '@/app/components/Navbar'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PodcastEmbed from '@/app/components/PodcastEmbed'
import { useGetSinglePodcast } from '@/app/admin/hooks/podcastHook/usePodcast';
import { NButton } from '@/app/components/PButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const sources = [
  "Youtube",
  "Sportify",
  "Apple"
]

export default function page({params}: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const getSinglePodcastMutation = useGetSinglePodcast();
  const [links, setLinks] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [producedBy, setProducedBy] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { status: authStatus } = useSession();
  const router = useRouter();

  const handlegetSinglePodcast = async () => {
    await getSinglePodcastMutation.mutateAsync(params.podcastId, {
      onSuccess: (response: any) => {
        setLinks(response.result.channels)
        setDescription(response.result.summary)
        setProducedBy(response.result.producedBy)
      }
    })
  }

  useEffect(() => {
    handlegetSinglePodcast() 
  },[params]);

  useEffect(() => {
    if(links.length > 0) {
      setValue(links[0].link)
    }
  },[links]);

  useEffect(() => {
    if(authStatus === 'unauthenticated') {
      router.push('/podcast')
    }
  },[authStatus]);

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            height: '300px'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'white',
            top: '8em',
            width: !isMobile ? '60%' : '90%',
            display: 'flex',
            borderRadius: theme.borderRadius.sm,
            boxShadow: 3,
            px: '10px', pt: '10px', pb: 5,
            flexDirection: 'column',
            height: 'auto'
          }}
        >
          <PodcastEmbed
            link={value}
          />
          <Box display={'flex'} gap={2}>
            {
              links.map((source: any, index: number) => (
                <Box key={index} mt={3}>
                  <NButton
                    onClick={() => {
                      setValue(source.link)
                      setSelectedIndex(index)
                    }}
                    bkgcolor={selectedIndex === index ? theme.palette.primary.main : 'white'}
                    textcolor={selectedIndex === index ? 'white' : theme.palette.primary.main}
                    bordercolor={selectedIndex === index ? theme.palette.primary.main : theme.palette.border.main}
                  >
                    <Typography className="capitalize"
                      sx={{
                        fontSize: isMobile ? theme.typography.labelxs : theme.typography.labelsm
                      }}
                    >
                      {source.source}
                    </Typography>
                  </NButton>
                </Box>
              ))
            }
          </Box>
          <Typography
            sx={{
              fontSize: theme.typography.h5.fontSize,
              fontWeight: theme.typography.h5.fontWeight,
              mt: 4
            }}
          >
            Episode Description
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              pt: 2, pb: 4
            }}
          >
            {description}
          </Typography>

          <Typography
            sx={{
              fontSize: theme.typography.labellg.fontSize,
              fontWeight: theme.typography.labellg.fontWeight,
            }}
          >
            Episode Credit
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1, mb: 4
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.labelxs.fontSize,
                color: theme.palette.secondary.light
              }}
            >
              Produced by
            </Typography>
            <Typography className='capitalize'
              sx={{
                fontSize: theme.typography.labelxs.fontSize,
                color: theme.palette.primary.main
              }}
            >
              {producedBy}
            </Typography>
          </Box>
        </Box>
        <Box sx={{height: 5, width: '100%', mt: '30rem', }}/>
      </Box>
    </>
  )
}
