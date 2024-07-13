import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedImageArrayAtom } from '@/lib/atoms';
import { Close, CloudDownload } from '@mui/icons-material';

interface UploaderProps {
  label?: string;
  onFileChange?: (files: File[]) => void;
  showImageName?: boolean;
  allowMultiple?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
  label,
  onFileChange,
  showImageName = false,
  allowMultiple = false,
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
      /\.(mp4|pdf)$/i.test(file.name)
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
        <Typography variant="labelsm" color={theme.palette.primary.base}>
          {label}
        </Typography>
        <Box
          sx={{
            mb: theme.spacing(4),
            mt: theme.spacing(2),
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.palette.border.main}`,
            minHeight: 162,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: theme.spacing(2),
            alignItems: 'center',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CloudDownload sx={{fontSize: '20px'}}/>
          <Typography
            variant="paragraphbase"
            color={theme.palette.primary.base}
          >
            Drop your file here or
            <button
              onClick={handleButtonClick}
              style={{ color: '#006FEE', marginLeft: theme.spacing(1) }}
            >
              Browse
            </button>
            <input
              type="file"
              ref={inputRef}
              accept="application/pdf, video/mp4"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </Typography>
          <Typography
            variant="paragraphsm"
          >
            Supports: MP4 or PDF
          </Typography>
          <Typography
            variant="paragraphxxs"
          >
            Allowed file size: 50MB
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
                  <CloudDownload sx={{fontSize: '20px'}}/>
                  <Typography
                    variant="paragraphsm"
                    color={theme.palette.primary.base}
                  >
                    {file.name}
                  </Typography>
                </Box>
                <button onClick={() => handleRemoveImage(index)}>
                  <Close
                    sx={{
                        fontSize: '20px',
                        color: 'red'
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

export default Uploader;
