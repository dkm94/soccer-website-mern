const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'isMod',
    numeric: false,
    disablePadding: false,
    label: 'Moderator'
  },
  {
    id: 'accountValidated',
    numeric: false,
    disablePadding: false,
    label: 'Profile'
  },
  {
    id: 'number_of_articles',
    numeric: true,
    disablePadding: false,
    label: 'Nb of articles'
  }
];

export default headCells;
