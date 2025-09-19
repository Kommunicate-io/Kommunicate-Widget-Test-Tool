import React from 'react';

export const NavItems: NavInterface[] = [];

interface NavInterface {
  icon: React.ReactElement;
  title: string;
  url: string;
}
