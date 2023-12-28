import React, { useEffect, useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useNavigate,
  // useLocation,
} from 'react-router-dom';
import { LoginPage } from './pages/Login';
import Bots from './pages/Bots';
// import { AuthContext } from './contexts/auth';
import Console from './pages/Console';
import {
  // createBot,
  // getBot,
  getBots,
  getUserInfo,
  // log,
  // saveOverview,
  // updateBot,
} from './api';
import Overview from './pages/Overview';
import Intents from './pages/Intents';
import Flow from './pages/Flow';
import Test from './pages/Test';
import Users from './pages/Users';
import Webhooks from './pages/Webhooks';
import BotHeader from './components/BotHeader';
import AppHeader from './components/AppHeader';
import { CampaignsPage } from './components/Campaigns';
import { WebhooksV2 } from './pages/Webhookv2';
import { NotFound } from './pages/NotFound';
import { TrainNavigation } from './components/TrainNavigation';
import { Entities } from './pages/Entities';
import Rules from './pages/Rules';
import Appearance from './pages/Appearance';
// import jwtDecode from 'jwt-decode';
import '@fontsource/montserrat/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/raleway/400.css';
import '@fontsource/oswald/400.css';
import TrainSettings from './pages/TrainSettings';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import Setup from './pages/Setup';
import { AppearanceNavigation } from './components/AppearanceNavigation';

export default function App() {
  // const { user } = useContext(AuthContext);

  function RequireAuth({ children }) {
    // let location = useLocation();
    // if (!user) {
    //   return <Navigate to="/login" state={{ from: location }} replace />;
    // }
    return children;
  }

  function RequireAdmin({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);
      getUserInfo().then(res => {
        if (res.role !== 'admin') {
          navigate('/404');
        }
        setLoading(false);
      });
    }, [navigate]);

    if (loading) return <></>;

    return children;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Console />
            </RequireAuth>
          }
        >
          <Route
            exact
            path=""
            element={<Navigate to="bots" replace={true} />}
          />
          <Route exact path="test" element={<Test />} />
          <Route path="bots">
            <Route
              index={true}
              element={
                <RequireAuth>
                  <AppHeader />
                  <div>
                    <Bots />
                  </div>
                </RequireAuth>
              }
              loader={getBots}
            />
            <Route
              path=":botId"
              element={
                <RequireAuth>
                  <BotHeader />
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route
                exact
                path=""
                element={<Navigate to="overview" replace={true} />}
              />
              <Route
                path="overview"
                element={
                  <RequireAuth>
                    <Overview />
                  </RequireAuth>
                }
              />
              <Route
                path="rules"
                exact
                element={
                  <div>
                    <Rules />
                  </div>
                }
              />
              <Route path="train">
                <Route
                  exact
                  path=""
                  element={<Navigate to="intents" replace={true} />}
                />
                <Route
                  path="intents"
                  element={
                    <RequireAuth>
                      <TrainNavigation />
                      <div className="intent-parent">
                        <Intents />
                      </div>
                    </RequireAuth>
                  }
                />
                <Route
                  path="entities"
                  element={
                    <RequireAuth>
                      <TrainNavigation />
                      <Entities />
                    </RequireAuth>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <RequireAuth>
                      <TrainNavigation />
                      <div>
                        <TrainSettings />
                      </div>
                    </RequireAuth>
                  }
                />
                <Route
                  path="intents"
                  element={
                    <RequireAuth>
                      <TrainNavigation />
                      <Intents />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route
                path="webhooks"
                element={
                  <RequireAuth>
                    <div>
                      <Webhooks />
                    </div>
                  </RequireAuth>
                }
              />
              <Route
                path="webhooks-v2"
                element={
                  <RequireAuth>
                    <WebhooksV2 />
                  </RequireAuth>
                }
              />
              <Route
                path="flow"
                element={
                  <RequireAuth>
                    <Flow botId={'1234'} />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
          <Route
            path="users"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <AppHeader />
                  <div>
                    <Users />
                  </div>
                </RequireAdmin>
              </RequireAuth>
            }
          />
          <Route
            path="campaigns"
            element={
              <RequireAuth>
                <AppHeader />
                <div>
                  <CampaignsPage />
                </div>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="setup"
            element={
              <div>
                <AppHeader />
                <Setup />
              </div>
            }
          />
          <Route
            path="appearance"
            element={
              <>
                <AppHeader />
                <Appearance />
              </>
            }
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
