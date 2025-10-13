import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Text } from '@Reptile/Components/Atoms';
import { useDomain } from '@Reptile/Contexts';
import * as Icons from '@Reptile/Components/Atoms/Icons/_Icons';
import { MENU_ITEMS } from './_NavigationSideMenuItems';

import './_NavigationSideMenu.scss';
import { useInitController } from '@Reptile/Hooks';
import { controlled } from '@Reptile/Framework';

const getIcon = (icon?: string) => {
  const iconName = icon
    ? `${icon
        .split('-')
        .map(
          (s) =>
            `${s[0].toUpperCase()}${s.slice(1)}`
        )
        .join('')}Icon`
    : undefined;
  return iconName
    ? (Icons[
        iconName as never
      ] as React.FunctionComponent)
    : undefined;
};

const MenuItem = (
  item: Reptile.Props.NavigationSideItemType
) => {
  const { title, path, icon, cb } = item;
  const Icon = getIcon(icon);
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (cb) {
      cb();
    }
    navigate(path);
  }, [cb, navigate, path]);

  return (
    <div
      key={title}
      className={clsx('navigation-menu-item', {
        active: path === location.pathname,
      })}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {title ? (
        <Text size='medium' weight='medium'>
          {title}
        </Text>
      ) : null}
    </div>
  );
};

const _NavigationSideMenu = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.INavigationSideMenuController
>(({ controller }) => {
  useInitController(controller);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener(
      'resize',
      handleResize
    );
    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      );
  }, []);

  const domain = useDomain();
  const logoutCallback = useCallback(() => {
    void domain.auth.signOut();
  }, [domain.auth]);

  return (
    <div
      className={clsx(
        'rt-navigation-side-menu',
        controller.isActive && 'toggle'
      )}
    >
      {!isMobile && (
        <div
          className='rt-minimise-nav-container'
          onClick={() =>
            controller.handleIsActive()
          }
        >
          <Icons.ChevronsRightIcon
            className={`side-nav-arrow ${
              controller.isActive ? 'open' : ''
            }`}
          />
        </div>
      )}

      <div
        className={clsx(
          'top-menu-section',
          controller.isActive && 'toggle'
        )}
      >
        <MenuItem
          icon={MENU_ITEMS.Projects.icon}
          path={MENU_ITEMS.Projects.path}
          title={
            controller.isActive
              ? undefined
              : MENU_ITEMS.Projects.title
          }
        />

        <MenuItem
          icon={MENU_ITEMS.Team.icon}
          path={MENU_ITEMS.Team.path}
          title={
            controller.isActive
              ? undefined
              : MENU_ITEMS.Team.title
          }
        />

        <MenuItem
          icon={MENU_ITEMS.Themes.icon}
          path={MENU_ITEMS.Themes.path}
          title={
            controller.isActive
              ? undefined
              : MENU_ITEMS.Themes.title
          }
        />

        <MenuItem
          icon={MENU_ITEMS.AccountSettings.icon}
          path={MENU_ITEMS.AccountSettings.path}
          title={
            controller.isActive
              ? undefined
              : MENU_ITEMS.AccountSettings.title
          }
        />
      </div>
      <div
        className={clsx(
          'bottom-menu-section',
          controller.isActive && 'toggle'
        )}
      >
        <div className='bottom-menu-section-border'></div>
        <MenuItem
          icon={MENU_ITEMS.Logout.icon}
          path={MENU_ITEMS.Logout.path}
          title={
            controller.isActive
              ? ''
              : MENU_ITEMS.Logout.title
          }
          cb={logoutCallback}
        />
        {!controller.isActive && <div style={{fontSize: '10px'}} className={clsx('navigation-menu-item')}>
          {(window as any).APP_VERSION}
        </div>}
      </div>
    </div>
  );
});

export default _NavigationSideMenu;
