'use client';

import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Uploader from "../components/UploadFiles";
import InputField from "@/app/components/InputField";
import { useEffect, useState } from "react";
import { NButton } from "@/app/components/PButton";
import { useDeleteAdvocacyFile, useGetAdvocacyFiles, useUploadAdvocacyFile } from "../hooks/userHook/useUser";
import { wordBreaker } from "@/lib/helper";
import { saveAs } from "file-saver";
import { Delete } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Toastify from "@/app/components/ToastifySnack";
import { useAtom } from "jotai";
import { selectedImageArrayAtom } from "@/lib/atoms";

export default function page() {
    const theme = useTheme();
    const [description, setDescription] = useState<string>('');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [ebooks, setEBooks] = useState<any>([]);
    const [files, setFiles] = useState<any>([]);
    const getFilesMutation = useGetAdvocacyFiles();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {data: session} = useSession();
    const deleteFileMutation = useDeleteAdvocacyFile();
    const uploadFileMutation = useUploadAdvocacyFile();
    const [file, setFile] = useAtom(selectedImageArrayAtom);

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

    const handleDelete = async (id: string) => {
        await deleteFileMutation.mutateAsync(id, {
            onSuccess: () => {
                fetchFiles()
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleUpload = async () => {
        if(file[0] && Math.floor(file[0].size / (1024 * 1024)) > 50) {
            handleOpenNotification('error', '', 'File size is too large.')
            return;
        }

        const payload = {
            description: description,
            file: file[0]
        }

        await uploadFileMutation.mutateAsync(payload, {
            onSuccess: () => {
                setFile(null)
                setDescription('')
                fetchFiles()
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

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
                flexDirection: 'column',
                pt: '2em',
                px: 4
            }}
        >
            <Typography variant="h5">
                Upload advocacy files
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: 3, mt: 2,
                    flexDirection: isMobile ? 'column' : 'row'
                }}
            >
                <Box width={isMobile ? '100%' : '50%'}>
                    <Uploader
                        showImageName={true}
                        allowMultiple={false}
                    />
                </Box>
                
                <Box width={isMobile ? '100%' : '50%'}>
                    <InputField
                        label="File description"
                        placeholder="Enter title"
                        onChange={(e: any) => setDescription(e.target.value)}
                        isBorder={true}
                        labelStyle={{
                            fontSize: theme.typography.labelbase.fontSize,
                            fontWeight: 500
                        }}
                        multiline={true}
                        rows={6}
                        value={description}
                    />
                </Box>
            </Box>

            <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                <NButton
                    onClick={handleUpload}
                    textcolor="white"
                    bkgcolor={theme.palette.primary.main}
                    width={'30%'}
                >
                    {uploadFileMutation.isLoading ? 'Submitting...' : 'Submit'}
                </NButton>
            </Box>
            <Divider sx={{my: 4}}/>
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
                                        {session?.user.userType.includes('admin') && (<IconButton sx={{position: 'absolute', top: 2, left: '9em', zIndex: 1000}}
                                            onClick={()=>handleDelete(file._id)}
                                        >
                                            <Delete sx={{color: 'red'}}/>
                                        </IconButton>)}
                                        
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
                                        {session?.user.userType.includes('admin') && (<IconButton sx={{position: 'absolute', top: 2, left: '12em'}}
                                            onClick={()=>handleDelete(file._id)}
                                        >
                                            <Delete sx={{color: 'red'}}/>
                                        </IconButton>)}
                                        
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

            <Toastify
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </Box>
    )
}
