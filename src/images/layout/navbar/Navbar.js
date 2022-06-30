import React, { useState } from 'react'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { StylesProvider } from '@material-ui/core/styles'
import './Navbar.css'
import logo from '../../../images/logo_official.png'
import UAuth from '@uauth/js'

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

export const Navbar = withRouter(({ connectWallet, udUser, userLogOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <StylesProvider injectFirst>
      <div className="grow">
        <AppBar position="fixed">
          <Toolbar>
            <Button className="">
              <img
                src="https://duckduckgo.com/i/7f3d4ac9.png"
                alt="logo"
                className="logo"
              />
              Beats-Store
            </Button>

            <Button className="whiteLink" component={Link} to="/">
              Home
            </Button>

            <Button className="whiteLink" component={Link} to="/store">
              Store
            </Button>

            <Button className="whiteLink" component={Link} to="/profile">
              Profile
            </Button>

            <Button className="whiteLink" component={Link} to="/add-beat">
              Add-Beat
            </Button>

            <div className="grow" />
            <div className="sectionDesktop">
              {udUser ? (
                <>
                  <Button
                    variant="contained"
                    className="connected-btn"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {udUser}
                  </Button>
                  <Button className="whiteLink" onClick={() => userLogOut()}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  className="connected-btn"
                  onClick={() => connectWallet()}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </StylesProvider>
  )
})
