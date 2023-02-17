import { useTranslation } from 'react-i18next'
import cx from 'classnames'

export function Features() {
  const { t } = useTranslation()

  const FEATURES = [
    {
      text: t('features.firstF'),
      img: 'icons/infinite.svg',
      position: 'right'
    },
    {
      text: t('features.secondF'),
      img: 'icons/checks.svg',
      position: 'left'
    },
    {
      text: t('features.thirdF'),
      img: 'icons/cursor.svg',
      position: 'right'
    },
    {
      text: t('features.fourthF'),
      img: 'icons/shelves.svg',
      position: 'left'
    },
    {
      text: t('features.fifthF'),
      img: 'icons/search.svg',
      position: 'right'
    },
    {
      text: t('features.sixthF'),
      img: 'icons/img-upload.svg',
      position: 'left'
    }
  ]

  return (
    <section className="bg-white pt-5 pb-10 dark:bg-slate-800">
      <div className="container m-auto border-l-2 border-l-purple-100 dark:border-l-purple-800  lg:pl-3">
        <h3 className="text-center dark:text-slate-200 lg:text-left">{t('features.features')}</h3>

        <div className=" m-auto grid grid-cols-1 gap-4 md:w-4/5 md:grid-cols-2 lg:w-3/4">
          {FEATURES.map(({ text, position, img }, idx) => (
            <div
              key={idx}
              className={cx(
                'not-prose h-30 w-30 flex items-center gap-2 rounded-full bg-gray-100 p-1 dark:bg-slate-700 dark:text-slate-200',
                {
                  'flex-row-reverse': position === 'left',
                  'text-left': position === 'left',
                  'text-right': position === 'right',
                  'flex-row': position === 'rigth'
                }
              )}
            >
              <div className="flex-1 font-thin">{text}</div>
              <div className="h-30 w-30 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400">
                <img src={img} alt="icon" className="h-30 w-30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
