import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import logo from '../../assets/logo.png'
import React, {useState, useContext, useEffect} from 'react';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import customHamburger from '../../assets/HamburgerMenu.png'

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "0em",
        [theme.breakpoints.down("md")]: {
          marginBottom: "0em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "0em"
        }
      },
    button : {
        ...theme.estimate,
        borderRadius: '50px',
        marginLeft: '25px',
        marginRight: '25px',
        border: '2px solid black',
        color: 'black',
        transform: 'scale(.77)'
    },
    logoContainer : {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    logoImg: {
        height: 'calc(400px * .104)!important;',
        width: 'calc(1480px * .104)!important;',
        marginLeft: '11px',
        [theme.breakpoints.down('md')]: {
            height: 'height: calc(400px * .02)!important'
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
      },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    toolbar: {
        maxHeight: '47px!important',
        minHeight: '47px!important',
        width: `100vw!important`
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
          backgroundColor: "transparent"
        }
      },
    drawer: {
        backgroundColor: theme.palette.common.blue,
        width: 166
      },
    tabContainer: {
        marginLeft: 'auto',
    },
    individualTab: {
        // fontFamily: 'Orpheus-Pro',
        fontFamily: 'Raleway',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '1rem',
        minWidth : 3,
        marginLeft: '25px'
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
          opacity: 1
        }
      },
      paper: {
        width: 250,
      }
  })
)

export default function Header(props) {
    const theme = useTheme();
    let history = useHistory();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const { state, dispatch } = useContext(AuthContext);
    const classes = useStyles()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [tabPosition, setTabPosition] = useState(0); 
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = (e, value) => {
        setTabPosition(value)
    }
    const handleClose = e => {
        setAnchorEl(null);
        setOpenMenu(false);
      };

      const logout = () => {
        setTabPosition(0)
        // auth().signOut();
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: null
        });
        history.push('/login');
    };

    useEffect(() => {
        if (window.location.pathname === '/' && tabPosition !== 0) {
            setTabPosition(0)
        } else if (window.location.pathname === '/breakdown' && tabPosition !== 1) {
            setTabPosition(1)
        } else if (window.location.pathname === '/calculator' && tabPosition !== 2) {
            setTabPosition(2)
        } else if (window.location.pathname === '/gains' && tabPosition !== 3) {
            setTabPosition(3)
        } else if (window.location.pathname === '/input' && tabPosition !== 4) {
            setTabPosition(4)
        }
    }, [tabPosition])

    const routes = [
        { name: "Home", link: "/", activeIndex: 0 },
        {
          name: "Breakdown",
          link: "/breakdown",
          activeIndex: 1,
          ariaOwns: anchorEl ? "simple-menu" : undefined,
          ariaPopup: anchorEl ? "true" : undefined,
          mouseOver: event => handleClick(event)
        },
        { name: "Calculator", link: "/calculator", activeIndex: 2 },
        { name: "Gains", link: "/gains", activeIndex: 3 },
        { name: "Input", link: "/input", activeIndex: 4 }
      ];

      useEffect(() => {
        [...routes].forEach(route => {
          switch (window.location.pathname) {
            case `${route.link}`:
              if (props.value !== route.activeIndex) {
                props.setValue(route.activeIndex);
                if (
                  route.selectedIndex &&
                  route.selectedIndex !== props.selectedIndex
                ) {
                  props.setSelectedIndex(route.selectedIndex);
                }
              }
              break;
            case "/estimate":
              props.setValue(5);
              break;
            default:
              break;
          }
        });
      }, [props.value, props.selectedIndex, routes, props]);


    const drawer = (
        <React.Fragment>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            classes={{ paper: classes.drawer }}
          >
            <div className={classes.toolbarMargin} />
            <List disablePadding>
              {routes.map(route => (
                <ListItem
                  divider
                  key={`${route}${route.activeIndex}`}
                  button
                  component={Link}
                  to={route.link}
                  selected={props.value === route.activeIndex}
                  classes={{ selected: classes.drawerItemSelected }}
                  onClick={() => {
                    setOpenDrawer(false);
                    setTabPosition(route.activeIndex);
                  }}
                >
                  <ListItemText className={classes.drawerItem} disableTypography>
                    {route.name}
                  </ListItemText>
                </ListItem>
              ))}
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  setTabPosition(5);
                }}
                divider
                button
                component={Link}
                classes={{
                  root: classes.drawerItemEstimate,
                  selected: classes.drawerItemSelected
                }}
                to="/login"
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Logout
                </ListItemText>
              </ListItem>
            </List>
          </SwipeableDrawer>
          <IconButton
            className={classes.drawerIconContainer}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
              {/* <img src={customHamburger}/> */}
            <MenuIcon className={classes.drawerIcon} />
          </IconButton>
        </React.Fragment>
      );


    const tabs = (
        <React.Fragment>
          <Tabs
            value={tabPosition}
            onChange={handleClick}
            className={classes.tabContainer}
            indicatorColor="primary"
          >
               <Tabs indicatorColor='primary' onChange={handleClick} value={tabPosition} className={classes.tabContainer}>
                 <Tab to="/" component={Link} className={classes.individualTab} label='Home'></Tab>
                 <Tab to="/breakdown" component={Link} className={classes.individualTab} label='Breakdown'></Tab>
                 <Tab to="/calculator" component={Link} className={classes.individualTab} label='Calculator'></Tab>
                 <Tab to="/gains" component={Link} className={classes.individualTab} label='Gains'></Tab>
                 <Tab to="/input" component={Link} className={classes.individualTab} label='Input'></Tab>
                 <Button onClick={logout} className={classes.button} color='secondary' variant='contained'>Logout</Button>
             </Tabs> 
          </Tabs>
         
        </React.Fragment>
      );


    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Toolbar className={classes.toolbar} disableGutters={true}>
                    <Button disableRipple onClick={logout} className={classes.logoContainer} component={Link} to="/">
                        <img className={classes.logoImg} src={logo} />
                    </Button>
                    {matches ? drawer : tabs}
                </Toolbar>
            </AppBar>
            {/* <div className={classes.toolbarMargin} /> */}
      </React.Fragment>

    )
};

