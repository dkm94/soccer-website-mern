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
  const profileId = JSON.parse(localStorage.getItem('profileId'));

  const [open, setOpen] = useState(false);
  const modStatus = JSON.parse(localStorage.getItem('isMod'));

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

  const articlesItems = [
    {
      id: 1,
      name: 'Create a new article',
      path: '/backoffice/articles/create'
    },
    {
      id: 2,
      name: 'My articles',
      path: `/backoffice/articles/author/${profileId}`
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
                  {articlesItems.map((item) => (
                    <ListItemButton
                      key={`article-item-${item?.id}`}
                      sx={{ pl: 10 }}
                      disabled={item?.id === 1 && !modStatus}
                      href={item?.path}>
                      <ListItemText primary={item?.name} />
                    </ListItemButton>
                  ))}
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
