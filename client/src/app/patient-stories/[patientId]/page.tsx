'use client';

import Navbar from "@/app/components/Navbar";
import { Reply } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

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

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          gap: 4, height: '100vh'
        }}
      >
        {!md && (<img
          src='/p_patient.png'
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
          <Typography
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: theme.typography.h3.lineHeight,
              mb: 3
            }}
          >
            A fighter, a survivor, and an inspiration to us all
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light
            }}
          >
            {`My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.
              Today, as I look back on my journey, I'm filled with gratitude for the lessons it has taught me. I've discovered an inner resilience I never knew I had and forged connections with fellow warriors who understand the fight firsthand. And while my journey is far from over, I face the future with courage and determination, knowing that I am stronger than the challenges that come my way.
              To anyone navigating their own health struggles, I offer this message: You are not alone. Your story is a beacon of hope, a testament to the power of resilience in the face of adversity. Together, we can overcome anything life throws our way.
              My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.
              Today, as I look back on my journey, I'm filled with gratitude for the lessons it has taught me. I've discovered an inner resilience I never knew I had and forged connections with fellow warriors who understand the fight firsthand. And while my journey is far from over, I face the future with courage and determination, knowing that I am stronger than the challenges that come my way.
              To anyone navigating their own health struggles, I offer this message: You are not alone. Your story is a beacon of hope, a testament to the power of resilience in the face of adversity. Together, we can overcome anything life throws our way.
              My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.
              Today, as I look back on my journey, I'm filled with gratitude for the lessons it has taught me. I've discovered an inner resilience I never knew I had and forged connections with fellow warriors who understand the fight firsthand. And while my journey is far from over, I face the future with courage and determination, knowing that I am stronger than the challenges that come my way.
              To anyone navigating their own health struggles, I offer this message: You are not alone. Your story is a beacon of hope, a testament to the power of resilience in the face of adversity. Together, we can overcome anything life throws our way.
              My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.
              Today, as I look back on my journey, I'm filled with gratitude for the lessons it has taught me. I've discovered an inner resilience I never knew I had and forged connections with fellow warriors who understand the fight firsthand. And while my journey is far from over, I face the future with courage and determination, knowing that I am stronger than the challenges that come my way.
              To anyone navigating their own health struggles, I offer this message: You are not alone. Your story is a beacon of hope, a testament to the power of resilience in the face of adversity. Together, we can overcome anything life throws our way.
              My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.
              Today, as I look back on my journey, I'm filled with gratitude for the lessons it has taught me. I've discovered an inner resilience I never knew I had and forged connections with fellow warriors who understand the fight firsthand. And while my journey is far from over, I face the future with courage and determination, knowing that I am stronger than the challenges that come my way.
              To anyone navigating their own health struggles, I offer this message: You are not alone. Your story is a beacon of hope, a testament to the power of resilience in the face of adversity. Together, we can overcome anything life throws our way.
              `}
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
