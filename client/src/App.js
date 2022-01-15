import React from 'react';
import './App.css';
import { ConfigProvider } from './components/ConfigProvider';
import Consumer from './components/ConfigProvider';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoginPage from './components/LoginPage';
import LeaguesPage from './components/LeaguesPage';

function App() {
  return (
    <ConfigProvider>
      <div className='App'>
        <div style={{ height: '90%' }}>
          <Consumer>
            {context => (
              <>
                {context.isLoading ? (
                  <Container
                    component='main'
                    maxWidth='xs'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '1%',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      marginTop: '15%'
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </Container>
                ) : (
                  <div>
                    {context.userLoggedIn ? (
                      <LeaguesPage
                        getLeagues={context.getLeagues}
                        currentUser={context.currentUser}
                        logoutUser={context.logoutUser}
                      />
                    ) : (
                      <LoginPage />
                    )}
                  </div>
                )}
              </>
            )}
          </Consumer>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;