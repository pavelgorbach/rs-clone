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
    <section>
      <h3>Our Team</h3>
      <ul className="flex justify-around align-top">
        {MEMBERS.map((member, index) => (
          <Member
            photo={member.imgSrc}
            name={member.name}
            role={member.role}
            contribution={member.contribution}
            key={index}
          />
        ))}
      </ul>
    </section>
  )
}

type memberProps = {
  photo: string
  name: string
  role: string
  contribution: string[]
  key: number
}

export function Member(props: memberProps) {
  return (
    <li className="flex flex-col py-2">
      <div className="max-w-xs">
        <img className="rounded-full" src={props.photo} alt="member photo"></img>
      </div>
      <div className="pl-4 font-bold">{props.name}</div>
      <div className="pl-4">{props.role}</div>
      <div className=" my-4 rounded-full border-2 text-center font-thin">Main contribution</div>
      <div>
        {props.contribution.map((feature, index) => (
          <div className="border-l-2 pl-3 text-left" key={index}>
            {feature}
          </div>
        ))}
      </div>
    </li>
  )
}
