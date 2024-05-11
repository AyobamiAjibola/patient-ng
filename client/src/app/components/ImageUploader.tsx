import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedImageArrayAtom } from '@/lib/atoms';
import Image from 'next/image';
import { Cancel } from '@mui/icons-material';
import PButton from './PButton';

interface ImageUploaderProps {
  label?: string;
  onFileChange?: (files: File[]) => void;
  showImageName?: boolean;
  allowMultiple?: boolean;
  onImageUpload?: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  onFileChange,
  showImageName = false,
  allowMultiple = false,
  onImageUpload,
}) => {
  const theme = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [selectedImageArray, setSelectedImageArray] = useState<File[]>([]);
  const [_, setImages] = useAtom(selectedImageArrayAtom);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setSelectedImageArray(
      allowMultiple
        ? [...selectedImageArray, ...droppedFiles.slice(0, 1)]
        : droppedFiles.slice(0, 1)
    );
    onFileChange?.(droppedFiles);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //@ts-ignore
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) =>
      /\.(jpg|jpeg|png)$/i.test(file.name)
    );

    if (validFiles.length === 0) {
      setError('Wrong File Format');
    } else {
      setError('');
      setSelectedImageArray(
        allowMultiple
          ? [...selectedImageArray, ...validFiles.slice(0, 1)]
          : validFiles.slice(0, 1)
      );
      onFileChange?.(validFiles);
      onImageUpload?.(validFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImageArray((prevArray) =>
      prevArray.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    setImages(selectedImageArray);
  }, [selectedImageArray]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography color={theme.palette.primary.main}>
          {label}
        </Typography>
        <Box
          sx={{
            mb: theme.spacing(4),
            mt: theme.spacing(2),
            borderRadius: theme.borderRadius.md,
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: theme.spacing(2),
            alignItems: 'center',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Image
            src='/photo.png'
            alt='photo'
            width={40}
            height={40}
          />
          <Typography
            color={theme.palette.secondary.light}
            sx={{
              mb: 2
            }}
          >
            Drag or upload a photo here
            {/* <button
              onClick={handleButtonClick}
              style={{
                color: '#006FEE',
                marginLeft: theme.spacing(1),
              }}
            >
              Browse
            </button> */}
            <input
              type="file"
              ref={inputRef}
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </Typography>
          <PButton transBg={true} bg={false} width='150px' onClick={handleButtonClick}>
            <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
                Browse
            </Typography>
          </PButton>
          <Typography
            color={theme.palette.secondary.light}
            sx={{
              mt: 6,
              fontSize: theme.typography.labelxs.fontSize
            }}
          >
            File should be in (png, jpeg or jpg) format
          </Typography>
          {error && (
            <Typography color={theme.palette.primary.main}>{error}</Typography>
          )}
        </Box>
        {showImageName && selectedImageArray.length > 0 && (
          <div>
            {selectedImageArray.map((file, index) => (
              <Box
                key={index}
                sx={{
                  mb: theme.spacing(4),
                  border: `1px solid ${theme.palette.border.main}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: theme.spacing(3),
                  minHeight: '36px',
                  borderRadius: theme.borderRadius.md,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(2),
                  }}
                >
                  <Image
                    src='/photo.png'
                    alt='photo'
                    width={20}
                    height={20}
                  />
                  <Typography
                    color={theme.palette.primary.main}
                  >
                    {file.name}
                  </Typography>
                </Box>
                <button onClick={() => handleRemoveImage(index)}>
                  <Cancel
                    sx={{
                      width: theme.iconSize.sm,
                      color: theme.palette.primary.main
                    }}
                  />
                </button>
              </Box>
            ))}
          </div>
        )}
      </Box>
    </>
  );
};

export default ImageUploader;
