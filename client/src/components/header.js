import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Header(props) {
  return(
    <AppBar color="inherit" position="sticky" enableColorOnDark disablegutters="true" sx={{ boxShadow:0 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h5" noWrap component="h6" sx={{ flexGrow:1, fontWeight:900 }} color="primary">
            Pesto: Calander App
          </Typography>
          <props.mode />
        </Toolbar>
      </Container>
    </AppBar>
  );
}