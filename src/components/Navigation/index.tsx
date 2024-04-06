import { useLocation } from 'react-router-dom'
import { Button } from '../Utils/Button'
import classes from './index.module.css'
import logo from 'src/images/svg/logo.svg'
import ghost from 'src/images/ghost.gif'

export const Navigation = () => {
  const location = useLocation()
  const isChat = location.pathname.includes('chat')

  let navigationClasses = classes.navigation

  if (isChat) {
    navigationClasses += ` ${classes['navigation__chat']}`
  }

  return (
    <nav className={navigationClasses}>
      <a href="/">
        <img src={logo} alt="Iris" className={classes.logo} />
      </a>
      <div className={classes['navigation-buttons']}>
        <a href="/" title="Log In" className={classes.login}>
          <img src={ghost} alt="Ghost" className={classes['ghost-image']} />
          <span>Cute Ghost</span>
        </a>
        {isChat && (
          <Button
            whiteBorder
            style={{
              fontSize: '10px',
              padding: '0.2rem 0.5rem',
              marginLeft: '1rem',
            }}
          >
            create account
          </Button>
        )}
      </div>
    </nav>
  )
}
