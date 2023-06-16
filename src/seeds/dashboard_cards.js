// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  top: '50%'
};

const cards = [
  // {
  //     id: 1,
  //     title: "Moderators",
  //     size: "sm",
  //     collection: "users",
  //     icon: <SupervisedUserCircleIcon fontSize="large" style={style} />
  // },
  {
    id: 2,
    title: 'Total articles',
    // size: "sm",
    wip: false,
    collection: 'articles',
    icon: <ArticleIcon fontSize="large" style={{ ...style, color: '#ffe100' }} />
  },
  {
    id: 3,
    title: 'Reported comments',
    // size: "sm",
    wip: false,
    // collection: 'comments',
    icon: <DisabledByDefaultIcon fontSize="large" style={{ ...style, color: '#ea5b5b' }} />
  },
  {
    id: 4,
    title: 'Chat',
    // size: "lg",
    wip: true,
    icon: <MarkChatUnreadIcon fontSize="large" style={{ ...style, color: '#88dbef' }} />
  }
];

export default cards;
