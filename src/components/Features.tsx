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

const FEATURES: feature[] = [
  {
    text: 'Create any number of boards and tasks',
    img: IconInfinite,
    position: 'right'
  },
  {
    text: 'Track personal tasks in your profile',
    img: Checks,
    position: 'left'
  },
  {
    text: 'Expand tasks by adding checklists',
    img: Cursor,
    position: 'right'
  },
  {
    text: 'Change the order of tasks and columns',
    img: Shelves,
    position: 'left'
  },
  {
    text: 'Find tasks through search',
    img: Search,
    position: 'right'
  },
  {
    text: 'Elaborate tasks by attaching images',
    img: Img,
    position: 'left'
  }
]

export function Features() {
  return (
    <section className="w-full">
      <h3>Features</h3>
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
    </section>
  )
}
