import React from 'react';

import './item.css';

function renderShortcuts(shortcut) {
  if (!!shortcut) {
    if (typeof shortcut === 'string') shortcut = [shortcut];
    if (shortcut.length == 1)
      return (
        <div className='kloudi-query-shortcut'>
          <kbd>{shortcut[0]}</kbd>
        </div>
      );
    else {
      const data = [];
      for (const [i, item] of shortcut.entries()) {
        data.push(<kbd key={i}>{item}</kbd>);
        if (i != shortcut.length - 1)
          data.push(
            <span
              key={`${i}-span`}
              className='kloudi-query-shortcut-text'
            >{` then`}</span>
          );
      }
      return <div className='kloudi-query-shortcut'>{data}</div>;
    }
  }
}

export default function view(suggestion) {
  const { name, icon, shortcut } = suggestion;
  return (
    <div className='kloudi-query-item'>
      {icon ? (
        <object
          className='kloudi-query-icon'
          type='image/svg+xml'
          data={icon}
        />
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='search'
          viewBox='0 0 24 24'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
        </svg>
      )}
      <span
        className='kloudi-query-text'
        dangerouslySetInnerHTML={{ __html: name }}
      />
      {renderShortcuts(shortcut)}
    </div>
  );
}
