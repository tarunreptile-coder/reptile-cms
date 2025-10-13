import { AndroidIcon, AppleIcon, Stepper } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';
import './_BuildTable.scss';
import clsx from 'clsx';

const _BuildTable = reactive<Reptile.Props.BuildTable>(
    ({ appList, active, steps }, { onClick }) => {
        return (
            <table className='rt-build-table'>
                <thead>
                    <tr>
                        <th colSpan={2} className='table-header'>
                            Build History
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {appList
                        ? appList.map((app, id) => (
                              <tr
                                  key={id}
                                  className={clsx(
                                      'table-row',
                                      active === id && 'table-row-active'
                                  )}
                                  onClick={() => onClick(id)}
                              >
                                  <td className='build-table-about'>
                                      <span className='icon-and-version'>
                                          {app.versionName}, ({app.versionCode})
                                          {app.oS === 'Android' ? (
                                              <AndroidIcon className='icon' />
                                          ) : (
                                              <AppleIcon className='icon' />
                                          )}
                                      </span>

                                      <br />
                                      {app.packageName}
                                  </td>
                                  <td className='build-table-progress'>
                                      {app.states ? (
                                          <Stepper
                                              activeStates={app.states}
                                              steps={steps}
                                          />
                                      ) : null}
                                  </td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
        );
    }
);

export default _BuildTable;
