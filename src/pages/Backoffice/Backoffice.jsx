import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import cards from '../../seeds/dashboard_cards';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import CreateArticleForm from './Articles/Forms/CreateArticle/CreateArticleForm';

const drawerWidth = 240;

const backofficeComponent = {
  '/backoffice': <Main cards={cards} drawerWidth={drawerWidth} />,
  '/backoffice/articles/create': <CreateArticleForm drawerWidth={drawerWidth} />
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
      {backofficeComponent[window.location.pathname]}
    </Box>
  );
}

export default ResponsiveDrawer;
