import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import cards from '../../seeds/dashboard_cards';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateArticleForm from './Articles/Forms/CreateArticle/CreateArticleForm';
import UpdateArticleForm from './Articles/Forms/UpdateArticle/UpdateArticleForm';
import UserArticles from './Articles/UserArticles/UserArticles';
import { useParams } from 'react-router-dom';
import Profile from './Profile/Profile';
import Moderators from './Moderators/Main/Moderators';

const drawerWidth = 240;

const profileId = JSON.parse(localStorage.getItem('profileId'));
const path = window.location.pathname;

const backofficeComponent = () => {
  let { id } = useParams();
  switch (path) {
    case '/backoffice':
      return <Main cards={cards} drawerWidth={drawerWidth} />;
    case '/backoffice/articles/create':
      return <CreateArticleForm drawerWidth={drawerWidth} />;
    case `/backoffice/articles/author/${profileId}`:
      return <UserArticles drawerWidth={drawerWidth} profileId={profileId} path={path} />;
    case `/backoffice/articles/edit/${id}`:
      return <UpdateArticleForm drawerWidth={drawerWidth} />;
    case `/backoffice/profile/${id}`:
      return <Profile drawerWidth={drawerWidth} profileId={profileId} />;
    case `/backoffice/moderators`:
      return <Moderators drawerWidth={drawerWidth} />;
    default:
      break;
  }
};

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        // container={container}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      {/* {backofficeComponent[window.location.pathname]} */}
      {backofficeComponent()}
    </Box>
  );
}

export default ResponsiveDrawer;
