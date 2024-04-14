import React from 'react'
import ReactDOM from 'react-dom'
import { useURL } from 'src/hooks/useURL'
import classes from './index.module.css'

interface SocialShareProps {
  onClose: () => void
}

const portalRoot: HTMLElement = document.getElementById('portal-root')!

const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url).then(
    () => {
      alert(
        'URL copied to clipboard! You can now paste it on Instagram or any other platform.',
      )
    },
    (err) => {
      console.error('Could not copy text: ', err)
    },
  )
}

const SocialShareComponent: React.FC<SocialShareProps> = ({ onClose }) => {
  const { path, name } = useURL() // url with hash, path withpout
  const title = `Some promo text about ${name} bot`

  // Encode URL and title to ensure they are URL-friendly
  const encodedUrl = encodeURIComponent(path)
  const encodedTitle = encodeURIComponent(title)

  // Social media share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`

  return (
    <div className={classes['social-share']}>
      <div
        className={classes['social-share_background']}
        onClick={onClose}
      ></div>
      <div className={classes['social-share_wrap']}>
        <h3>Share this page on:</h3>
        <button className={classes['social-share_close']} onClick={onClose}>Close</button>
        <ul>
          <li>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <button onClick={() => copyToClipboard(path)}>
              Copy URL for Instagram
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export const SocialShare: React.FC<SocialShareProps> = ({ onClose }) => {
  return ReactDOM.createPortal(
    <SocialShareComponent onClose={onClose} />,
    portalRoot,
  )
}
