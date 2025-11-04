import React from 'react';
import clsx from 'clsx';
import { reactive } from '@Reptile/Framework';

import './_TabPanel.scss';

const _TabPanel = reactive<Reptile.Props.TabPanelProps>(({
  children,
  className,
  style,
}) => {
  return (
    <div style={style} className={clsx(['rt-tab-panel', className])}>
      {children}
    </div>
  );
});

export default _TabPanel;
