const GITHUBS = [
  {
    github: 'pavelgorbach',
    link: 'https://github.com/pavelgorbach'
  },
  {
    github: 'maxxxer',
    link: 'https://github.com/maxxxer'
  },
  {
    github: 'kirillmolotkov',
    link: 'https://github.com/kirillmolotkov'
  }
]

export function Footer() {
  return (
    <footer className="mt-auto bg-white p-4">
      <div className="md:prose-md container prose-sm m-auto flex flex-col items-center justify-between gap-4 md:flex-row lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <a href="https://rs.school/js/">
          <img className="!m-0 w-20" src="icons/rss.svg" />
        </a>

        <div className="flex gap-4">
          {GITHUBS.map((github, idx) => (
            <a
              key={idx}
              className="flex items-center gap-2 text-black hover:text-purple-500"
              href={github.link}
            >
              <img className="!m-0 h-5 w-5" src="icons/github.svg" />
              <span className="flex items-center font-thin">{github.github}</span>
            </a>
          ))}
        </div>

        <div className="font-bold">2022</div>
      </div>
    </footer>
  )
}
