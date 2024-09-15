import { characterBreaker, wordBreaker } from '@/lib/helper';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Tag } from 'antd';
import { useRouter } from 'next/navigation';
import HtmlToText from '../components/HtmlToText';

export default function BlogCard({blog}: any) {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box
            key={blog._id}
            sx={{
                minWidth: '300px',
                width: isMobile ? '70%' : '32%',
                height: '500px',
                backgroundColor: theme.palette.secondary.lightest,
                border: `1px solid ${theme.palette.secondary.lighter}`,
                borderRadius: theme.borderRadius.sm,
                flex: '0 0 auto',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.lighter
                }
            }}
            onClick={() => router.push(`/blog${blog.urlSlug }`)}
        >
            <img
                src={blog.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.titleImage}` : '/logo.png'}
                alt='blog'
                style={{
                    minWidth: '100%',
                    height: '60%',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm,
                    objectFit: 'cover'
                }}
                crossOrigin='anonymous'
            />
            <Tag className='capitalize' color='green'
                style={{
                color: theme.palette.primary.main,
                marginTop: '1em', marginLeft: isMobile ? '1em' : '1em',
                whiteSpace: isMobile ? 'pre-wrap' : 'none',
                }}
            >
                {blog.category.name}
            </Tag>
            <Typography className='capitalize'
                sx={{
                mx: isMobile ? 2 : 3,
                my: 2,
                fontSize: isMobile ? theme.typography.labelsm : theme.typography.labellg, 
                whiteSpace: isMobile ? 'pre-wrap' : 'none', lineHeight: 1.3
                }}
            >
                {blog.title.length > 50 ? `${characterBreaker(blog.title, 50)}...` : blog.title}
            </Typography>
            <HtmlToText
                mx={isMobile ? 2 : 3}
                htmlString={isMobile ? wordBreaker(blog.content, 25) : wordBreaker(blog.content, 25)}
            />
            </Box>
    )
}
