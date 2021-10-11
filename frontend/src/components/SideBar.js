import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'

import { Link } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'
import Logout from './Logout'

export default function TemporaryDrawer({authenticatedUser, authenticatedRestaurant, firstname, lastname, userid, restaurantName}) { 
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
          {authenticatedUser &&
          <ListItem button key={'profile'}>
              <MuiLink component = {Link} to ={ `/profile`} style={{color : '#303030',"&:hover": {textDecoration : 'none'}}}> 
                  <Avatar>
                      {firstname && firstname.substring(0,1)}{ lastname && lastname.substring(0,1)}
                  </Avatar>
              </MuiLink>
          </ListItem>}

          {authenticatedRestaurant &&
          <ListItem button key={'profile'}>
              <MuiLink component = {Link} to ={ `/profile`} style={{color : '#303030',"&:hover": {textDecoration : 'none'}}}> 
                  <Avatar>
                      {restaurantName && restaurantName.substring(0,1)}
                  </Avatar>
              </MuiLink>
          </ListItem>}

          {authenticatedUser &&
          <ListItem button key={'name'}>
              {firstname} {lastname}
          </ListItem>}

          {authenticatedRestaurant &&
          <ListItem button key={'name'}>
              {restaurantName}
          </ListItem>}

          <Divider />

          {authenticatedUser &&
          <>
            <ListItem button key={'orders'}>
                <MuiLink component = {Link} to ={ `/orders`}  style={{color : '#303030'}}> 
                    <ListItemText>Orders</ListItemText>
                </MuiLink>
            </ListItem>
            <ListItem button key={'favorites'}>
                <MuiLink component = {Link} to ={ `/favorites`} style={{color : '#303030'}} > 
                    <ListItemText>Favorites</ListItemText>
                </MuiLink>
            </ListItem>

            <Divider />

          </>}

          <ListItem button key={'signupRestaurant'}>
            <MuiLink component = {Link} to ={ `/restaurantSignup`} style={{color : '#424242'}} > 
                <ListItemText>Signup Restaurant</ListItemText>
            </MuiLink>
          </ListItem>
          <ListItem button key={'loginRestaurant'}>
              <MuiLink component = {Link} to ={ `/restaurantLogin`} style={{color : '#424242'}} > 
                  <ListItemText>Login Restaurant</ListItemText>
              </MuiLink>
          </ListItem>

          {authenticatedRestaurant &&
          <ListItem button key={'loginRestaurant'}>
              <MuiLink component = {Link} to ={ `/orderSummary`} style={{color : '#424242'}} > 
                  <ListItemText>Order Summary</ListItemText>
              </MuiLink>
          </ListItem>
          }

          <Divider />

          <ListItem button key={'logout'}>
              <MuiLink component = {Link} to ={ `/login`} style={{color : '#303030'}}> 
                  <Logout/>
              </MuiLink>
          </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
        <React.Fragment key={'left'}>
            <Button onClick={toggleDrawer('left', true)}>
                <MenuIcon style={{color : 'black'}}/>
            </Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  )
}