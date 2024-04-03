import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '../Utils/Button'
import { Loading } from '../Loading'
import classes from './index.module.css'

export interface ItemsProps {
  id: string
  name: string
  descr: string
  image: string
}

interface AIListProps {
  items: ItemsProps[]
  title: string
  descr: string
  isLoading?: boolean
}

// load by 9
let quantity = 9

export const AIList: React.FC<AIListProps> = ({
  items,
  title,
  descr,
  isLoading = false,
}) => {
  const [shownElements, setShownElements] = useState<number>(quantity)
  const filteredItems = items.slice(0, shownElements)
  const listEndRef = useRef<HTMLLIElement>(null)

  const handleClick = () => {
    setShownElements(shownElements + quantity)
  }

  const handleScroll = useCallback(() => {
    // debounce scroll event
    const timeout = setTimeout(() => {
      if (
        listEndRef.current &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        items.length > shownElements
      ) {
        setShownElements(shownElements + quantity)
      }
    }, 100)

    // clear the timeout on each scroll event
    return () => clearTimeout(timeout)
  }, [shownElements, items])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <section className={classes['ai-section']}>
      <h2 className={classes['ai-section_title']}>{title}</h2>
      <p className={classes['ai-section_descr']}>{descr}</p>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ol className={classes['ai-list']}>
            {filteredItems.map((item, ind) => (
              <li
                key={item.id}
                className={ind >= 9 ? classes.animated : ''}
                ref={ind === filteredItems.length - 1 ? listEndRef : null}
              >
                <a href="/">
                  <span className={classes['ai-list_number']}>{ind + 1}</span>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={classes['ai-list_image']}
                    />
                  ) : (
                    <span className={classes['ai-list_no-image']} />
                  )}
                  <div className={classes['ai-list_text']}>
                    <h5 className={classes['ai-list_name']}>{item.name}</h5>
                    <p className={classes['ai-list_descr']}>
                      {item.descr || 'Some text here...'}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>

          {/* show the button if original size of the array more that filteredArray and shownElements */}
          {items.length >= filteredItems.length &&
            items.length > shownElements && (
              <div className={classes['show-button']}>
                <Button onClick={handleClick}>show more</Button>
              </div>
            )}
        </>
      )}
    </section>
  )
}
