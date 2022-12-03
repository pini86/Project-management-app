import { Box } from '@mui/material';
import './welcomePage.scss';

function WelcomePage() {
  return (
    <Box className="welcome-page__wrapper">
      <div className="welcome-page__section">
        <Box className="image-wrapper">
          <img src="/welcome-image.png" alt="Laptop" className="main-image" />
        </Box>
        <Box className="welcome-page__main-text">
          <h1 className="main-heading">Project Management Application</h1>
          <h2 className="sub-heading">
            Our app&apos;s aim is to help you with workflow management. Increase productivity,
            become more efficient and focused on tasks.
          </h2>
        </Box>
      </div>
      <div className="welcome-page__section team-section">
        <h1 className="main-heading">Our team</h1>
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
                @pini86
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
                @user0k
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
                @natashapridanova
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
    </Box>
  );
}

export default WelcomePage;
