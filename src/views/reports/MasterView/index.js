import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Master = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Master">
      <Container maxWidth={false}>
        <Grid container spacing={3} />
      </Container>
    </Page>
  );
};

export default Master;
