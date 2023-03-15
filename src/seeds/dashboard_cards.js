import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

const style = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "50%"
}

const cards = [
    {
        id: 1,
        title: "Moderators",
        size: "sm",
        icon: <SupervisedUserCircleIcon fontSize="large" style={style} />
    },
    {
        id: 2,
        title: "My articles",
        size: "sm",
        icon: <ArticleIcon fontSize="large" style={style} />
    },
    {
        id: 3,
        title: "Reported comments",
        size: "sm",
        icon: <DisabledByDefaultIcon fontSize="large" style={style} />
    },
    {
        id: 4,
        title: "Chat",
        size: "lg",
        icon: <MarkChatUnreadIcon fontSize="large" style={style} />
    }
];

export default cards;