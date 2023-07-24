import { Link } from 'react-router-dom';
import './NotFound.css';
import { useEffect } from 'react';

const NotFound = ({ setInvalidPath }) => {
	useEffect(() => {
		setInvalidPath(true);
	}, []);
	return (
		<div className="not-found">
			<div>
				<h1>{'404'}</h1>
				<h2>{'Oops, the page you requested couldn\'t be found !'}</h2>
				<div>
					<Link to="/" reloadDocument>Back to home page</Link>
				</div>
			</div>
		</div>
	);
};
export default NotFound;