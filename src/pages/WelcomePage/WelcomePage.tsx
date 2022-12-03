import './WelcomePage.scss';

function WelcomePage() {
  return (
    <div className="welcome-page__wrapper">
      <div className="welcome-page__section">
        <div className="image-wrapper">
          <img src="/welcome-image.png" alt="Laptop" className="main-image" />
        </div>
        <div className="welcome-page__main-text">
          <h1 className="main-heading">Приложение для управления проектами</h1>
          <h2 className="sub-heading">
            Наша цель - помочь вам лучше управлять рабочим процессом: увеличить продуктивность,
            стать более эффективными и сфокусированными на задаче
          </h2>
        </div>
      </div>
      <div className="welcome-page__section team-section">
        <h1 className="main-heading">Наша команда</h1>
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
                Миша
              </a>
            </h3>
            <div className="team__tasks">
              Worked on Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at odio eius
              eum, libero nemo. Dicta consequuntur, nostrum ducimus animi ratione culpa officiis ea
              eaque odio dolorum cupiditate perspiciatis veniam voluptas natus, magnam omnis
              deserunt quod, facere maiores consectetur libero? Ad corrupti facilis sapiente quaerat
              beatae repellendus eaque assumenda earum.
            </div>
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
                Паша
              </a>
            </h3>
            <div className="team__tasks">
              Worked on Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at odio eius
              eum, libero nemo. Dicta consequuntur, nostrum ducimus animi ratione culpa officiis ea
              eaque odio dolorum cupiditate perspiciatis veniam voluptas natus, magnam omnis
              deserunt quod, facere maiores consectetur libero? Ad corrupti facilis sapiente quaerat
              beatae repellendus eaque assumenda earum.
            </div>
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
                Наташа
              </a>
            </h3>
            <div className="team__tasks">
              Worked on Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at odio eius
              eum, libero nemo. Dicta consequuntur, nostrum ducimus animi ratione culpa officiis ea
              eaque odio dolorum cupiditate perspiciatis veniam voluptas natus, magnam omnis
              deserunt quod, facere maiores consectetur libero? Ad corrupti facilis sapiente quaerat
              beatae repellendus eaque assumenda earum.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
