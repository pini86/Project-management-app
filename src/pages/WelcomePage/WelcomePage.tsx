import './WelcomePage.scss';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="welcome-page__wrapper">
      <div className="welcome-page__section">
        <div className="image-wrapper">
          <img src="/welcome-image.png" alt="Laptop" className="main-image" />
        </div>
        <div className="welcome-page__main-text">
          <h1 className="main-heading">{t('WelcomePage.main-heading')}</h1>
          <h2 className="sub-heading">{t('WelcomePage.sub-heading')}</h2>
        </div>
      </div>
      <div className="welcome-page__section team-section">
        <h1 className="main-heading">{t('WelcomePage.team-heading')}</h1>
        <div className="teams">
          <div className="team__card">
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/94520585?v=4"
                alt="Developer's avatar"
                className="team__img"
              />
            </div>
            <h3>
              <a className="team__name" href="https://github.com/user0k">
                {t('WelcomePage.team-members.misha.name')}
              </a>
            </h3>
            <div className="team__tasks">{t('WelcomePage.team-members.misha.work')}</div>
          </div>
          <div className="team__card">
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/25122117?v=4"
                alt="Developer's avatar"
                className="team__img"
              />
            </div>
            <h3>
              <a className="team__name" href="https://github.com/user0k">
                {t('WelcomePage.team-members.pasha.name')}
              </a>
            </h3>
            <div className="team__tasks">{t('WelcomePage.team-members.pasha.work')}</div>
          </div>
          <div className="team__card">
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/96010768?v=4"
                alt="Developer's avatar"
                className="team__img"
              />
            </div>
            <h3>
              <a className="team__name" href="https://github.com/user0k">
                {t('WelcomePage.team-members.natasha.name')}
              </a>
            </h3>
            <div className="team__tasks">{t('WelcomePage.team-members.natasha.work')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
