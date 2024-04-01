import { useState } from 'react'
import { Button } from '../Utils/Button'
import classes from './index.module.css'

interface ItemsProps {
  id: string
  name: string
  descr: string
  image: string
}

interface AIListProps {
  items: ItemsProps[]
  title: string
  descr: string
}

// load by 9
let quantity = 9

export const AIList: React.FC<AIListProps> = ({ items, title, descr }) => {
  const [shownElements, setShownElements] = useState<number>(quantity)
  const filteredItems = items.slice(0, shownElements)

  const handleClick = () => {
    setShownElements(shownElements + quantity)
  }

  return (
    <section className={classes['ai-section']}>
      <h2 className={classes['ai-section_title']}>{title}</h2>
      <p className={classes['ai-section_descr']}>{descr}</p>
      <ol className={classes['ai-list']}>
        {filteredItems.map((item, ind) => (
          <li key={item.id} className={ind >= 9 ? classes.animated : ''}>
            <a href="/">
              <span className={classes['ai-list_number']}>{ind + 1}</span>
              <img
                src={item.image}
                alt={item.name}
                className={classes['ai-list_image']}
              />
              <div className={classes['ai-list_text']}>
                <h5 className={classes['ai-list_name']}>{item.name}</h5>
                <p className={classes['ai-list_descr']}>{item.descr}</p>
              </div>
            </a>
          </li>
        ))}
      </ol>

      {/* show the button if original size of the array more that filteredArray and shownElements */}
      {items.length >= filteredItems.length && items.length > shownElements && (
        <div className={classes['show-button']}>
          <Button onClick={handleClick}>show more</Button>
        </div>
      )}
    </section>
  )
}
