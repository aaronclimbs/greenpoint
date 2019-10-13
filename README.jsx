const React = require("react");
const {
  metadata,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  UL,
  IMG,
  BOLD,
  ITALIC,
  OL,
  SCRATCH,
  BR,
  HR,
  A,
  CODE,
  QUOTE,
  COLLAPSIBLE,
  TASKS,
  BADGE,
  TABLE
} = require("readme-jsx");

const Header = ({ children }) => <h1 className="header">{children}</h1>;

const Subheader = ({ children }) => <h2 className="subheader">{children}</h2>;

const CustomHeader = ({ title, color }) => (
  <h1 className="custom-header" style={{ WebkitTextFillColor: color }}>
    {title}
  </h1>
);

const Logo = ({}) => (
  <h1 id="logo">
    <span>GREENPOINT</span>
  </h1>
);

const Description = ({}) => (
  <h1 id="description">
    <span>{metadata.description}</span>
  </h1>
);

module.exports = (
  <React.Fragment>
    <style>
      {`
      @import url('https://fonts.googleapis.com/css?family=Raleway:100|Pacifico&display=swap');
      .custom-header{
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
         color:red;
        font-family: Pacifico;
        width: 880px;
        font-size: 3em;
        padding: 0px 0px 10px 10px;
        display: flex;
        margin: 0px;
        align-items: center;
      }
      #logo {
        width: 880px;
        height: 180px;
        margin: 0px;
        font-size: 8em;
        display: flex;
        font-weight:100;
        justify-content: center;
        align-items: center;
        padding: 0px;
        color: black;
        font-family: "Raleway";
        // text-shadow: 0 0.1em 20px black, 0.05em -0.03em 0 black, 0.05em 0.005em 0 black, 0em 0.08em 0 black, 0.05em 0.08em 0 black, 0px -0.03em 0 black, -0.03em -0.03em 0 black, -0.03em 0.08em 0 black, -0.03em 0 0 black;
      }
      #description{
        padding: 0px 0px 40px 0px;
        width: 880px;
        height: 70px;
        margin: 0px;
        display: flex;
        font-weight:800;
        justify-content: center;
        align-items: center;
        color: #e91e63;
        font-family: "Raleway";
        font-size: 1.6em;
      }
      .header {
        width: 880px;
        height: 50px;
        margin: 0px;
        font-size: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        color: white;
        background: black;
        font-family: "Raleway";
        text-transform: uppercase;
      }
      .subheader {
        width: 880px;
        height: 40px;
        margin: 0px;
        font-size: 1.5em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0px 5px;
        color: white;
        font-family: "Raleway";
        background: #e91e63;
        text-transform: uppercase;
        border-top: 3px solid black;
      }
      `}
    </style>
    <Logo />
    <BR />
    <Description />
    <BR />

    <BADGE
      label="LICENSE"
      message={metadata.license}
      style="for-the-badge"
      color="e91e63"
    />
    <BADGE
      label="VERSION"
      message={metadata.version}
      style="for-the-badge"
      color="e91e63"
    />

    <BR />
    <BR />
    <Header>About</Header>
    <BR />
    <QUOTE>
      Greenpoint is an app intended to build awareness around environmentally
      conscious actions and reward uses through points and community. Ultimately{" "}
    </QUOTE>
    <BR />
    <Header>Showcase</Header>
    <BR />
    <IMG src="./readme_assets/dashboard.png" />
    <IMG src="./readme_assets/resources.png" />
    <Header>Roadmap</Header>
    <BR />
    <TASKS
      list={[
        {
          title:
            "Implement routes to MongoDB backend for adding and deleting user events",
          done: true
        },
        {
          title:
            "Utilize JSON web tokens and custom middleware for authentication",
          done: true
        },
        { title: "Create dashboard view for users on login", done: true },
        {
          title: "Add redux for sharing state between adjacent components",
          done: true
        },
        {
          title:
            "Test code incrementally and manually because we're not crazy enough to write unit tests for each case",
          done: true
        },
        {
          title: "Allow user to view next and  previous days in dashboard",
          done: false
        },
        { title: "Add support chat", done: false },
        { title: "Refactor redux store to React Context API", done: false },
        { title: "Refactor major components to use React Hooks", done: false },
        { title: "Create apple watch app", done: false }
      ]}
    />
    <BR />
    <Header>Usage</Header>
    <BR />
    <QUOTE>
      The basic user story is to sign up for an account via the signup form.
      Upon signup, the user will be logged in and taken to a dashboard view. On
      the dashboard, they will see the current breakdown of their actions by
      category, a list of actions to add for that day, and an option to show
      either the weather or a selection of environmental news articles. There
      will also be additional resources to show where various materials can be
      recycled on a map and an advanced carbon footprint calculator.
    </QUOTE>
  </React.Fragment>
);
