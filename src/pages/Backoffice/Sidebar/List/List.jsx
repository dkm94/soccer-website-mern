import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ContactsIcon from '@mui/icons-material/Contacts';

const SideBarList = () => {
  // Moderators
  // Articles: mes articles, tous les articles
  // Reported comments
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const listData = [
    {
      id: 1,
      name: 'Moderators',
      icon: <SupervisedUserCircleIcon />
    },
    {
      id: 2,
      name: 'Articles',
      icon: <ArticleIcon />
    },
    {
      id: 3,
      name: 'Reported comments',
      icon: <DisabledByDefaultIcon />
    },
    {
      id: 4,
      name: 'My profile',
      icon: <ContactsIcon />
    }
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {listData.map(({ id, name, icon }) => {
          return name === 'Articles' ? (
            <>
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon color="red">{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 10 }}>
                    <ListItemText primary="My articles" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 10 }}>
                    <ListItemText primary="All articles" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem key={id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );
};

export default SideBarList;
