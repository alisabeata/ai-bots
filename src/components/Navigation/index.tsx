import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../Utils/Button'
import classes from './index.module.css'
import logo from 'src/images/svg/logo.svg'
import { ReactComponent as LoginIcon } from 'src/images/svg/login.svg'
import ghost from 'src/images/ghost.gif'

interface NavigationProps {
  hideOnMobile?: boolean
  className?: string
}

export const Navigation: React.FC<NavigationProps> = React.memo(
  ({ hideOnMobile = false, className }) => {
    const location = useLocation()
    const isChat = location.pathname.includes('chat')

    let navigationClasses = classes.navigation

    if (isChat) {
      navigationClasses += ` ${classes['navigation__chat']}`
    }

    if (hideOnMobile) {
      navigationClasses += ` ${classes['navigation__hide-on-mobile']}`
    }

    if (className) {
      navigationClasses += ` ${className}`
    }

    return (
      <nav className={navigationClasses} aria-label="Main navigation">
        <a href="/" aria-label="Home">
          <img src={logo} alt="Iris" className={classes.logo} />
        </a>
        <div className={classes['navigation-buttons']}>
          <a href="/" title="Log In" className={classes.login}>
            <div
              style={{ backgroundImage: `url(${ghost})` }}
              className={classes.avatar}
              aria-label="User Avatar"
            />
            <div className={classes['login_name']}>
              <span>Cute Ghost</span>
              <LoginIcon />
            </div>
          </a>
          {isChat && (
            <Button
              whiteBorder
              style={{
                fontSize: '10px',
                padding: '0.2rem 0.5rem',
                marginLeft: '1rem',
              }}
              aria-label="Create Account Button"
            >
              create account
            </Button>
          )}
        </div>
      </nav>
    )
  },
)
