import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import cards from '../../seeds/dashboard_cards';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateArticleForm from './Articles/Forms/CreateArticle/CreateArticleForm';
import MyArticles from './Articles/MyArticles/MyArticles';

const drawerWidth = 240;

const profileId = JSON.parse(localStorage.getItem('profileId'));
const path = window.location.pathname;

// const backofficeComponent = {
//   '/backoffice': <Main cards={cards} drawerWidth={drawerWidth} />,
//   '/backoffice/articles/author/:id': <MyArticles drawerWidth={drawerWidth} />,
//   '/backoffice/articles/create': <CreateArticleForm drawerWidth={drawerWidth} />
// };

const backofficeComponent = () => {
  switch (path) {
    case '/backoffice':
      return <Main cards={cards} drawerWidth={drawerWidth} />;
    case '/backoffice/articles/create':
      return <CreateArticleForm drawerWidth={drawerWidth} />;
    case `/backoffice/articles/author/${profileId}`:
      return <MyArticles drawerWidth={drawerWidth} profileId={profileId} />;
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
