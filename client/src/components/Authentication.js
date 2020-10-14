import React from 'react';
import { Redirect, Route, Switch, Link, useLocation } from 'react-router-dom';
import BodyClassName from 'react-body-classname';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import authenticationRoutes from 'routes/authentication';
import { FormattedMessage as T } from 'react-intl';
import withAuthentication from 'containers/Authentication/withAuthentication';
import { compose } from 'utils';
import Icon from 'components/Icon';

function PageFade(props) {
  return (
    <CSSTransition {...props} classNames="authTransition" timeout={500} />
  );
}

function AuthenticationWrapper({ isAuthorized = false, ...rest }) {
  const to = { pathname: '/homepage' };
  const location = useLocation();
  const locationKey = location.pathname;

  return (
    <>
      {isAuthorized ? (
        <Redirect to={to} />
      ) : (
        <BodyClassName className={'authentication'}>
          <div class="authentication-page">
            <Link
              to={'bigcapital.io'}
              className={'authentication-page__goto-bigcapital'}
            >
              <T id={'go_to_bigcapital_com'} />
            </Link>

            <div class="authentication-page__form-wrapper">
              <div class="authentication-insider">
                <div className={'authentication-insider__logo-section'}>
                  <Icon icon="bigcapital" height={37} width={214} />
                </div>

                <TransitionGroup>
                  <PageFade key={locationKey}>
                    <Switch>
                      {authenticationRoutes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ))}
                    </Switch>
                  </PageFade>
                </TransitionGroup>                
              </div>
            </div>
          </div>
        </BodyClassName>
      )}
    </>
  );
}

export default compose(
  withAuthentication(({ isAuthorized }) => ({ isAuthorized })),
)(AuthenticationWrapper);
