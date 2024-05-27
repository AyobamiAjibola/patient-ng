import { 
    ChatOutlined,
    DesktopWindowsOutlined, 
    DynamicFeedOutlined, 
    EmojiEventsOutlined, 
    EventNoteOutlined, 
    FavoriteBorderOutlined, 
    FlagOutlined, 
    KeyboardVoiceOutlined, 
    MedicationOutlined, 
    PersonOutlineOutlined 
} from "@mui/icons-material"

const items = {
    '': [
        {
            title: 'Dashboard',
            link: '/admin/dashboard',
            iconName: DesktopWindowsOutlined
        },
        {
            title: 'Users',
            link: '/admin/users',
            iconName: PersonOutlineOutlined
        },
        {
            title: 'Crowdfunding',
            link: '/admin/crowdfunding',
            iconName: FavoriteBorderOutlined
        },
        {
            title: 'Healthcare Mgt',
            link: '/admin/healthcare',
            iconName: MedicationOutlined
        },
        {
            title: 'Advocacy',
            link: '/admin/advocacy',
            iconName: FlagOutlined
        }
    ],
    RESOURCES: [
        {
            title: 'Blog',
            link: '/admin/blog',
            iconName: EventNoteOutlined
        },
        {
            title: 'Patient Stories Mgt',
            link: '/admin/patientstories',
            iconName: ChatOutlined
        },
        {
            title: 'Webinar',
            link: '/admin/webinar',
            iconName: DynamicFeedOutlined
        },
        {
            title: 'Podcast',
            link: '/admin/podcast',
            iconName: KeyboardVoiceOutlined
        },
        {
            title: 'Award Mgt',
            link: '/admin/award',
            iconName: EmojiEventsOutlined
        }
    ]
}

export default items