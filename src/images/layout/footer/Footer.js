import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Container,
  Grid,
  Link,
  StylesProvider,
  Typography,
} from '@material-ui/core'
import './Footer.css'
import logo from '../../../images/logoOfficial.jpg'

function Footer() {
  return (
    <StylesProvider injectFirst>
      <footer className="footer-container">
        <AppBar className="primary-color marginT-3 pad-2" position="static">
          <Grid component={Container} container>
            {/* <Grid item xs={12} sm={3}>
              <img src={logo} alt="logo" className="footer-logo" />
            </Grid> */}

            <Grid item xs={12} sm={12} className="links footer-grid">
              <Link className="link" component={RouterLink} to="/">
                Home
              </Link>
              <span>/</span>

              <Link className="link" component={RouterLink} to="/">
                About
              </Link>
              <span>/</span>

              <Link className="link" component={RouterLink} to="/">
                Register
              </Link>
              <span>/</span>

              <Link className="link" component={RouterLink} to="/">
                Get Started
              </Link>
              <span>/</span>

              <Link className="link" component={RouterLink} to="/">
                Terms
              </Link>
              <span>/</span>

              <Link className="link" component={RouterLink} to="/">
                Privacy
              </Link>
            </Grid>

            <Grid item xs={12} sm={3}></Grid>

            <Grid item xs={12} sm={12}>
              <Typography className="copyright">
                Copyright &copy; {new Date().getFullYear()} NFT-Giftcards
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
      </footer>
    </StylesProvider>
  )
}

export default Footer
