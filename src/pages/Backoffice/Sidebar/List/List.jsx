import React, { useState, useEffect } from 'react';
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
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideBarList = () => {
  const profileId = JSON.parse(localStorage.getItem('profileId'));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleListItemClick = (e, idx) => {
    localStorage.setItem('list-item-idx', idx);
  };

  const modStatus = JSON.parse(localStorage.getItem('isMod'));

  useEffect(() => {
    const idx = JSON.parse(localStorage.getItem('list-item-idx'));
    setSelectedIndex(idx);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickItem = (e, idx) => {
    handleListItemClick(e, idx);
  };

  const listData = [
    {
      id: 1,
      idx: 0,
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: `/backoffice`
    },
    {
      id: 2,
      idx: 1,
      name: 'Moderators',
      icon: <SupervisedUserCircleIcon />,
      path: `/backoffice/moderators`
    },
    {
      id: 3,
      idx: 2,
      name: 'Articles',
      icon: <ArticleIcon />
    },
    {
      id: 4,
      idx: 5,
      name: 'Reported comments',
      icon: <DisabledByDefaultIcon />
    },
    {
      id: 5,
      idx: 6,
      name: 'My profile',
      icon: <ContactsIcon />,
      path: `/backoffice/profile/${profileId}`
    }
  ];

  const articlesItems = [
    {
      id: 1,
      idx: 3,
      name: 'Create a new article',
      path: '/backoffice/articles/create'
    },
    {
      id: 2,
      idx: 4,
      name: 'My articles',
      path: `/backoffice/articles/author/${profileId}`
    }
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {listData.map(({ id, idx, name, icon, path }) => {
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
                      selected={selectedIndex === item?.idx}
                      sx={{ pl: 10 }}
                      disabled={item?.id === 1 && !modStatus}
                      onClick={(e) => handleClickItem(e, idx)}
                      href={item?.path}>
                      <ListItemText primary={item?.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem key={id} disablePadding>
              <ListItemButton
                href={path}
                selected={selectedIndex === idx}
                onClick={(e) => handleClickItem(e, idx)}>
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
