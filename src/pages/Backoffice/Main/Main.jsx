/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '../../../components/Dashboard/TopCard/Card';
import { changeModStatus } from '../../../services/queries/admin_queries';
import { getArticles, getUsers } from '../../../services/queries/public_queries';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './Main.css';
import { Grid, Typography, styled, useTheme, Paper, Container } from '@mui/material';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { max } from '@cloudinary/url-gen/actions/roundCorners';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import avatar from '../../../../src/images/avatar.png';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array?.map((el, index) => [el, index]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis?.map((el) => el[0]);
// }
const Item = styled(Paper)(({ theme }) => ({
  padding: '1rem 2rem',
  position: 'relative',
  width: '95%',
  textAlign: 'center'
}));

const Name = styled(Paper)(({ theme }) => ({
  fontSize: 'initial',
  fontFamily: "'Adamina', serif"
}));

const Handle = styled(Paper)(({ theme }) => ({
  color: theme.palette.grey.dark
}));

const UserCard = ({ name, handle, img, userArticles }) => {
  const imageSrc = img?.public_id;
  const articlesCount = userArticles?.length;

  const onLineArticlesCount = userArticles?.filter((article) => article.online == true).length;

  const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' })
    .roundCorners(max())
    .resize(fill().height(100))
    .delivery(format(auto()));

  return (
    <Grid item xs={12} md={3} className="dashboard__user-card">
      <Item>
        {!img ? (
          <Box
            component="img"
            sx={{
              height: 229,
              width: 220,
              maxHeight: { xs: 50, md: 75, lg: 100 },
              maxWidth: { xs: 50, md: 75, lg: 100 },
              borderRadius: '50%',
              alignSelf: 'center',
              mt: '1rem',
              mb: '2rem'
            }}
            alt="default avatar"
            src={avatar}
          />
        ) : (
          <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <AdvancedImage cldImg={myImage} />
          </div>
        )}
        <Box>
          <Grid>
            <Name variant="body1">{name}</Name>
          </Grid>
          <Grid>
            <Handle variant="body2">{handle || 'Handle'}</Handle>
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid>
            <Typography variant="body2">Total posts: {articlesCount}</Typography>
          </Grid>
          <Grid>
            <Typography variant="body2">Online posts: {onLineArticlesCount}</Typography>
          </Grid>
        </Box>
      </Item>
    </Grid>
  );
};

const Main = ({ cards, drawerWidth }) => {
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('name');
  // eslint-disable-next-line no-unused-vars
  const [toggleValue, setToggleValue] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);

  // const profileId = localStorage.getItem('profileId');
  // const parsedProfileId = JSON.parse(profileId);

  const {
    isLoading,
    isError,
    data: rows
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const {
    isLoadingArticles,
    isErrorArticles,
    data: articles
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });
  // console.log('🚀 ~ file: Main.jsx:132 ~ Main ~ articles:', articles);
  // const userArticles = rows?.map((user) => {
  //   articles?.filter((userArticle) => userArticle.id_profile == user._id);
  // });

  const mutation = useMutation({
    mutationFn: changeModStatus,
    onMutate: async (updatedObj) => {
      await queryClient.cancelQueries({ queryKey: ['users', updatedObj._id] });
      const previousObj = queryClient.getQueryData(['users', updatedObj._id]);
      queryClient.setQueryData(['users', updatedObj._id], updatedObj._id);

      return { previousObj, updatedObj };
    },
    onError: (err, updatedObj, context) => {
      queryClient.setQueryData(['users', context.updatedObj._id], context.previousObj);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['users', updatedObj._id] });
    }
  });

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDeleteSelected = () => {
    // eslint-disable-next-line no-unused-vars
    const newRows = rows?.filter((row) => !selectedIds?.includes(row._id));
    setSelectedIds([]);
    // TODO: Handle deletion of selected rows
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedIds = rows.map((row) => row._id);
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  // const handleDeleteClick = () => {
  //   console.log('Deleting rows with ids:', selectedRows);
  // };

  const filteredRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleToggle = (user) => {
    const promise = new Promise((resolve, reject) => {
      if (!user) {
        reject('Error user');
      } else {
        resolve('Execute API call next');
      }
    });

    promise
      .then(() => {
        setToggleValue(user._id);
      })
      .then(() => mutation.mutate(user))
      .catch(() => {
        throw new Error('Error mutation');
      });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem'
      }}>
      <Grid spacing={2} container md={12}>
        {cards.map((card, i) => {
          return (
            <Card
              key={card.id}
              title={card.title}
              icon={card.icon}
              collection={card.collection}
              wip={card.wip}
            />
          );
        })}
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} mt={4}>
          {rows &&
            rows.map((user) => {
              const { name, handle, file } = user.id_profile;
              const userArticles = articles?.filter(
                (userArticle) => userArticle.id_profile == user.id_profile._id
              );
              return (
                <UserCard
                  key={user?._id}
                  name={name}
                  handle={handle}
                  img={file}
                  userArticles={userArticles}
                />
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
