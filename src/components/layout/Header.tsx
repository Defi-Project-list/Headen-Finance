import { showNotification } from '@mantine/notifications';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-black text-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Headen Finance
        </UnstyledLink>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Dashboard
        </UnstyledLink>
        <UnstyledLink
          onClick={() =>
            showNotification({
              title: 'Oops',
              message: 'Hey there!',
              color: 'green',
              loading: true,
            })
          }
          href='/'
          className='font-bold hover:text-gray-600'
        >
          User Account
        </UnstyledLink>
        {/*<nav>*/}
        {/*  <ul className='flex items-center justify-between space-x-4'>*/}
        {/*    {links.map(({ href, label }) => (*/}
        {/*      <li key={`${href}${label}`}>*/}
        {/*        <UnstyledLink href={href} className='hover:text-gray-600'>*/}
        {/*          {label}*/}
        {/*        </UnstyledLink>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</nav>*/}
      </div>
    </header>
  );
}
