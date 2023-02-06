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
    <footer className="bg-white p-4">
      <div className="md:prose-md container prose-sm m-auto flex items-center justify-between lg:prose-lg xl:prose-xl 2xl:prose-2xl ">
        <div className="flex">
          <a className="text-black" href="https://rs.school/js/">
            <img className="!m-0 w-20" src="src/assets/logo_rs_text.svg" />
          </a>
        </div>

        <div className="flex flex-row gap-4">
          {GITHUBS.map((github, index) => (
            <div key={index}>
              <a className="flex items-center justify-center gap-2 text-black" href={github.link}>
                <img className="!m-0 hidden h-8 w-8 md:inline-block" src="src/assets/github.svg" />
                {github.github}
              </a>
            </div>
          ))}
        </div>

        <div className="font-bold">2022</div>
      </div>
    </footer>
  )
}
