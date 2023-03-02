import { useTranslation } from 'react-i18next'

export function TeamSection() {
  const { t } = useTranslation()

  const MEMBERS = [
    {
      imgSrc: 'photos/pavel.jfif',
      name: t('teamsection.pavel'),
      role: t('teamsection.lead'),
      contribution: [
        t('teamsection.Infrastructure'),
        t('teamsection.Organisation'),
        t('teamsection.Tasks'),
        t('teamsection.Code')
      ]
    },
    {
      imgSrc: 'photos/maxer.png',
      name: t('teamsection.maksim'),
      role: t('teamsection.developer'),
      contribution: [t('teamsection.Main'), t('teamsection.Profile')]
    },
    {
      imgSrc: 'photos/kirill.png',
      name: t('teamsection.kirill'),
      role: t('teamsection.developer'),
      contribution: [t('teamsection.BoardList'), t('teamsection.Board')]
    }
  ]

  return (
    <section className="bg-white pt-5 pb-10 dark:bg-slate-800 dark:text-slate-200">
      <div className="container m-auto border-l-2 border-l-purple-100 px-2 text-center dark:border-l-purple-800 lg:px-20 lg:text-left">
        <h3>{t('teamsection.team')}</h3>
        <ul className="ml-0 flex flex-col justify-center gap-4 pl-0 align-top md:flex-row md:justify-center">
          {MEMBERS.map((member, index) => (
            <li className="flex flex-col bg-gray-50 !px-5 pb-5 dark:bg-slate-700" key={index}>
              <img
                className="w-52 self-center rounded-full"
                src={member.imgSrc}
                alt="member photo"
              ></img>

              <div className="font-bold md:pl-4">{member.name}</div>
              <div className="md:pl-4">{member.role}</div>
              <div className=" my-4 rounded-full border-2 text-center font-thin dark:border-purple-800">
                {t('teamsection.contribution')}
              </div>

              <div>
                {member.contribution.map((feature, index) => (
                  <div
                    className="border-l-2 pl-3 text-left font-light dark:border-l-purple-800"
                    key={index}
                  >
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
