import { useState } from 'react';
import classNames from 'classnames';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiMui, SiChakraui } from 'react-icons/si';
import { Link, Switch, Route, useLocation } from 'wouter';

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

  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const header = (
    <header className="pb-2 border-b border-gray-200 flex">
      <div>
        <button
          className="p-2 block md:hidden"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div className="flex flex-1 justify-end">Right</div>
    </header>
  );

  return (
    <div className="flex h-screen flex-col">
      {/* Main Content */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={classNames(
            'bg-white p-4 overflow-y-auto border-r border-gray-200 h-screen md:block fixed md:relative w-full md:w-64 top-16 md:top-0',
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
                      'flex font-semibold items-center h-10 p-2 rounded hover:bg-gray-300 hover:text-violet-600',
                      {
                        'bg-gray-100': location === route.path,
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
