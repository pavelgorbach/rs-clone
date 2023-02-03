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
      <div className="flex container m-auto justify-between">
        <div className="flex">
          <a className="text-black" href="https://rs.school/js/">
            <img className="w-20" src="src/assets/logo_rs_text.svg"></img>
          </a>
        </div>
        <div className="flex flex-row gap-4">
          {GITHUBS.map((github, index) => (
            <div key={index}>
              <a className="text-black" href={github.link}>
                <img className="inline-block w-10 px-2" src="src/assets/github.svg"></img>
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
