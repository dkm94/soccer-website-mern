// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArticleIcon from '@mui/icons-material/Article';
// import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
// import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import StarIcon from '@mui/icons-material/Star';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const style = {
	position: 'absolute',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	top: '50%',
};

const cards = [
	{
		id: 2,
		title: 'Total articles',
		// size: "sm",
		wip: false,
		collection: 'articles',
		icon: <ArticleIcon fontSize="large" style={{
			...style,
			color: '#aee2bd', 
		}} />,
	},
	{
		id: 3,
		title: 'Offline articles',
		// size: "sm",
		wip: false,
		collection: 'articles',
		icon: <RadioButtonCheckedIcon fontSize="large" style={{
			...style,
			color: '#ea5b5b', 
		}} />,
	},
	{
	    id: 1,
	    title: 'Featured articles',
	    size: 'sm',
	    collection: 'articles',
	    icon: <StarIcon fontSize="large" style={{
			...style,
			color: '#e2d758', 
		}} />,
	},
];

export default cards;
