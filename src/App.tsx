import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiMui, SiChakraui } from 'react-icons/si';
import { Link, Switch, Route, useLocation } from 'wouter';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

function App() {
  const routes = [
    {
      path: '/material-ui',
      label: 'Material UI',
      Icon: SiMui,
    },
    {
      path: '/chakra-ui',
      label: 'Chakra UI',
      Icon: SiChakraui,
    },
  ];

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDarkMode(prefersDark);

    // Update class when user toggles system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sync dark mode with the HTML <body> tag
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const header = (
    <header className="pb-2 border-b border-gray-200 flex dark:border-gray-800">
      <div>
        <button
          className="p-2 block md:hidden"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div className="flex flex-1 justify-end">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2">
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </header>
  );

  return (
    <div className="flex h-screen flex-col dark:bg-gray-900 dark:text-gray-200">
      {/* Main Content */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={classNames(
            'bg-white p-4 overflow-y-auto border-r border-gray-200 dark:border-gray-800 h-screen md:block fixed md:relative w-full md:w-64 top-16 md:top-0 dark:bg-gray-900 dark:text-gray-200',
            {
              block: isOpen, // Show sidebar when isSidebarOpen is true
              hidden: !isOpen, // Hide sidebar when isSidebarOpen is false
            }
          )}
        >
          <nav className="top-0 md:top-10 relative">
            <ul>
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={classNames(
                      'flex font-semibold items-center h-10 p-2 rounded hover:bg-gray-300 hover:text-violet-600 dark:hover:bg-gray-800',
                      {
                        'bg-gray-100': location === route.path,
                        'dark:bg-gray-950': location === route.path,
                        'text-gray-700': location !== route.path,
                        'text-violet-600': location === route.path,
                      }
                    )}
                  >
                    {<route.Icon />}
                    <span className="pl-2">{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-4 overflow-y-auto">
          {header}
          <div className="my-4">
            <Switch>
              <Route path="/material-ui">Material UI</Route>
              <Route path="/chakra-ui">Chakra UI</Route>
              <Route path="/ant-design">Ant Design</Route>
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
