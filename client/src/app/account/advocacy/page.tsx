'use client';

import { useUsersAdvocacies } from "@/app/admin/hooks/advocacyHook/useAdvocacy";
import { useGetAdvocacyFiles } from "@/app/admin/hooks/userHook/useUser";
import PButton from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { setMenuIndex } from "@/lib/atoms";
import { wordBreaker } from "@/lib/helper";
import { HourglassEmpty } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { Tag } from "antd";
import capitalize from "capitalize";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const items = [
  "Advocate Resources",
  "Complains"
]

export default function Advocacy() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const advocacyMutation = useUsersAdvocacies();
  const [advocacies, setAdvocacies] = useState<any[]>([]);
  const {data: session} = useSession();
  const [currentItem, setCurrentItem] = useState<string>('Advocate Resources');
  const getFilesMutation = useGetAdvocacyFiles();
  const [ebooks, setEBooks] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(advocacies.length / itemsPerPage);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const fetchAdvocacies = async () => {
    await advocacyMutation.mutateAsync(session?.user.userId, {
      onSuccess: (response: any) => {
        setAdvocacies(response.results)
      } 
    })
  }

  useEffect(() => {
    fetchAdvocacies()
  },[session]);

  useEffect(() => {
    setCurrentIndex(3)
  },[]);

  const fetchFiles = async () => {
    await getFilesMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const books = response.result[0].files.filter((f: any) => f.file.includes('.pdf'));
        const videos = response.result[0].files.filter((f: any) => f.file.includes('.mp4'));
        setEBooks(books)
        setFiles(videos)
      }
    })
  }

  const saveFile = (file: string) => {
      try {
        setIsLoading(true);

        saveAs(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/${file}`,
          "ebook"
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
  };

  useEffect(() => {
    fetchFiles()
  },[]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4, pb: 6,
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
            display: 'flex',
            gap: 4
          }}
        >
          {items.map((item: string, index: number) => (
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
      </Box>
      
      {currentItem === "Complains" 
        ? ( <>
              { advocacies.length > 0
                  ? (advocacies.map((advocacy: any, index: number) => (
                      <Box key={advocacy._id}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          p: 4,
                          backgroundColor: theme.palette.secondary.lightest,
                          border: `1px solid ${theme.palette.secondary.lighter}`,
                          borderRadius: theme.borderRadius.sm,
                          display: 'flex', gap: 4, flexDirection: 'column'
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography variant="labellg">
                            {advocacy.hospitalName}
                          </Typography>
                          <Tag 
                            color={advocacy.status === 'approved'
                                    ? 'success'
                                    : advocacy.status === 'closed'
                                      ? 'error'
                                      : 'warning'
                                  }
                          >
                            {capitalize.words(advocacy.status)}
                          </Tag>
                        </Box>

                        <Typography variant="labelsm"
                          sx={{
                            color: theme.palette.secondary.light
                          }}
                        >
                          {wordBreaker(advocacy.complaints, 40)}
                        </Typography>

                        
                        <PButton transBg={true} bg={false} width='10%'
                          onClick={() => {
                            router.push(`/account/advocacy/${advocacy._id}`)
                          }}
                        >
                          Modify
                        </PButton>
                      </Box>
                    ))
                  ) : (
                    <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                      <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                      <Typography variant='paragraphlg' color={theme.palette.border.main}>
                          No Data
                      </Typography>
                    </Box>
                  )
              }
      
              <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 5
                }}
              >
                {advocacies.length !== 0 && (<Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />)}
              </Box>
          </>
        ) : (
          <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
              }}
            >
              <Typography variant="labellg">
                Ebooks
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                  bgcolor: theme.palette.secondary.lighter,
                  p: 4, borderRadius: theme.borderRadius.sm
                }}
              >
                {ebooks.length > 0 
                    ? (
                        ebooks.map((file: any, index: number) => (
                            <Box key={index}
                                sx={{
                                    width: '25%',
                                    height: '8em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    border: `1px solid ${theme.palette.border.main}`,
                                    borderRadius: theme.borderRadius.sm,
                                    pr: 2, 
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    onClick={()=>saveFile(file.file)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: theme.palette.border.main,
                                            borderTopLeftRadius: theme.borderRadius.sm,
                                            borderBottomLeftRadius: theme.borderRadius.sm
                                        },
                                        width: '40%',
                                        height: '100%',
                                        pt: 3
                                    }}
                                >
                                    <img
                                        src="/pdflogo.png"
                                        alt='pdf'
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </Box>
                                
                                <Box
                                    sx={{
                                        width: '60%',
                                        height: '100%',
                                        p: 1,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography variant="paragraphxs">
                                        {wordBreaker(file.description, 12)}
                                    </Typography>
                                </Box>
                                
                            </Box>
                        ))
                    ) : (
                      <Box>
                        <Typography variant="labelsm" color={theme.palette.secondary.light}>
                          {getFilesMutation.isLoading ? 'Loading...' : 'No EBook found.'}
                        </Typography>
                      </Box>
                    )
                }
              </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column'
                }}
            >
                <Typography variant="labellg">
                    Videos
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        flexWrap: 'wrap',
                        bgcolor: theme.palette.secondary.lighter,
                        p: 4, borderRadius: theme.borderRadius.sm
                    }}
                >
                    {files.length > 0 
                        ? (
                            files.map((file: any, index: number) => (
                                <Box key={index}
                                    sx={{
                                        width: '33%',
                                        height: '15em',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        border: `1px solid ${theme.palette.border.main}`,
                                        pb: 2, borderBottomRightRadius: theme.borderRadius.sm,
                                        borderBottomLeftRadius: theme.borderRadius.sm,
                                        position: 'relative'
                                    }}
                                >
                                    <video controls crossOrigin="anonymous"
                                        style={{
                                            minHeight: "80%",
                                            width: '100%'
                                        }}
                                    >
                                        <source 
                                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${file.file}`} 
                                            type="video/mp4"
                                        />
                                    </video>
                                    
                                    <Typography variant="paragraphxs" height="10%" mx={1}>
                                        {wordBreaker(file.description, 12)}
                                    </Typography>
                                    
                                </Box>
                            ))
                        ) : (
                            <Box>
                                <Typography variant="labelsm" color={theme.palette.secondary.light}>
                                    {getFilesMutation.isLoading ? 'Loading...' : 'No Videos found.'}
                                </Typography>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
        )
      }
    </Box>
  )
}
