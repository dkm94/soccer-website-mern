const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'isMod',
      numeric: false,
      disablePadding: false,
      label: 'Moderator',
    },
    {
      id: 'isActivated',
      numeric: false,
      disablePadding: false,
      label: 'Profile activated',
    },
    {
      id: 'number_of_articles',
      numeric: true,
      disablePadding: false,
      label: 'Nb of articles',
    },
  ];

  export default headCells;