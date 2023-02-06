import { useTranslation } from 'react-i18next'

import IconInfinite from '../assets/infinite.svg'
import Checks from '../assets/checks.svg'
import Cursor from '../assets/cursor.svg'
import Img from '../assets/img.svg'
import Search from '../assets/search.svg'
import Shelves from '../assets/shelves.svg'

type feature = {
  text: string
  img: string
  position: 'left' | 'right'
}

export function Features() {
  const { t } = useTranslation()

  const FEATURES: feature[] = [
    {
      text: t('features.firstF'),
      img: IconInfinite,
      position: 'right'
    },
    {
      text: t('features.secondF'),
      img: Checks,
      position: 'left'
    },
    {
      text: t('features.thirdF'),
      img: Cursor,
      position: 'right'
    },
    {
      text: t('features.fourthF'),
      img: Shelves,
      position: 'left'
    },
    {
      text: t('features.fifthF'),
      img: Search,
      position: 'right'
    },
    {
      text: t('features.sixthF'),
      img: Img,
      position: 'left'
    }
  ]

  return (
    <section className="bg-white pt-5 pb-10">
      <div className="container m-auto border-l-2 border-l-purple-100 text-center lg:pl-3 lg:text-left">
        <h3>{t('features.features')}</h3>
        <div className="col-auto m-auto grid content-center items-center gap-2 self-center sm:grid-cols-1 md:grid-cols-2 lg:w-3/4 xl:w-2/3 ">
          {FEATURES.map(({ text, position, img }, idx) => (
            <div
              key={idx}
              className={`not-prose flex w-3/4 items-center justify-between justify-self-center p-4 ${
                position === 'left' ? 'flex-row-reverse' : 'flex-row'
              } rounded-full border-2`}
            >
              <div>{text}</div>
              <div>
                <img src={img} alt="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
