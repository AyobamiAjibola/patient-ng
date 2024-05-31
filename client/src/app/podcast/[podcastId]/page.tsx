'use client';

import Navbar from '@/app/components/Navbar'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import PodcastEmbed from '@/app/components/PodcastEmbed'
import { wordBreaker } from '@/lib/helper';

export default function page() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');

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
            // mt: '6rem',
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
            link='https://embed.podcasts.apple.com/us/podcast/108-dr-jordan-b-peterson-we-who-wrestle-with-god/id1492492083?i=1000654660669&amp;itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto'//'https://www.youtube.com/embed/kW1kwLeCFis?si=bGcF1DaxX9qnXGX-'//'https://open.spotify.com/embed/episode/64S83bNTSVn08f62qNi1lI?utm_source=generator'
          />

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
              py: 4
            }}
          >
            {wordBreaker(`It all began when rock musician David Byrne swapped bodies with a Barbie doll in a Freaky Friday-style transformation. That's what prompted him and his partner Mala Gaonkar to turn a 15,000 square foot warehouse in Denver, Colorado into the Theater of the Mind, a cerebral amusement park.
            In this episode, Byrne and neuroscientist Thalia Wheatley have a live discussion at the Denver Center for the Performing Arts, which is moderated by co-host Latif Nasser. The three discuss how we don't see or hear or know what we believe we do, but also how all of that... can actually be a wonderful thing.
            We would especially want to thank Charlie Miller and the Denver Center for the Performing Arts team, Emily Simoness and the Arbutus Foundation team, Boen Wang, and Heather Radke.`, 100)}
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
            <Typography
              sx={{
                fontSize: theme.typography.labelxs.fontSize,
                color: theme.palette.primary.main
              }}
            >
              Suzie Lechtenberg
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: theme.typography.labelxs.fontSize,
              color: theme.palette.secondary.light
            }}
          >
            {`We publish a newsletter every Wednesday. Short essays, suggestions, and information on additional ways to engage with the show are all included. Register at newsletter.
            Follow us on social media at on Instagram, Twitter, and Facebook, and send us your feedback at www.google.com`}
          </Typography>
        </Box>
        <Box sx={{height: 5, width: '100%', mt: '30rem', }}/>
      </Box>
    </>
  )
}
