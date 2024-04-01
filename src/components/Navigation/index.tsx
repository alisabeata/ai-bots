import classes from './index.module.css'
import logo from './../../images/svg/logo.svg'
import ghost from './../../images/ghost.gif'

export const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <a href="/">
        <img src={logo} alt="Iris" className={classes.logo} />
      </a>
      <a href="/" title="Log In" className={classes.login}>
        <img src={ghost} alt="Ghost" className={classes['ghost-image']} />
        <span>Cute Ghost</span>
      </a>
    </nav>
  )
}
