const MEMBERS = [
  {
    imgSrc: 'src/assets/photos/pavel.jfif',
    name: 'Pavel',
    role: 'Tech- and TeamLead',
    contribution: ['Infrastructure', 'Organisation', 'Tasks', 'Code rewiew']
  },
  {
    imgSrc: 'src/assets/photos/maxer.png',
    name: 'Maksim',
    role: 'Frontend developer',
    contribution: ['Main Page', 'Board']
  },
  {
    imgSrc: 'src/assets/photos/kirill.png',
    name: 'Kirill',
    role: 'Frontend developer',
    contribution: ['Board List', 'Profile']
  }
]

export function TeamSection() {
  return (
    <section className="bg-white pt-5 pb-10">
      <div className="container m-auto border-l-2 border-l-purple-100 md:pl-3">
        <h3>Our Team</h3>
        <ul className="ml-0 flex flex-col justify-around align-top sm:flex-row">
          {MEMBERS.map((member, index) => (
            <li className="flex flex-col py-2" key={index}>
              <div className="max-w-xs">
                <img className="rounded-full" src={member.imgSrc} alt="member photo"></img>
              </div>
              <div className="font-bold md:pl-4">{member.name}</div>
              <div className="md:pl-4">{member.role}</div>
              <div className=" my-4 rounded-full border-2 text-center font-thin">
                Main contribution
              </div>
              <div>
                {member.contribution.map((feature, index) => (
                  <div className="border-l-2 pl-3 text-left" key={index}>
                    {feature}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
