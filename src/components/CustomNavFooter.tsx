import React from 'react'
import { ILink } from './CustomNavbar'
import CustomNavLink from './CustomNavLink';
interface CustomNavFooter{
  links:ILink[]
}
const CustomNavFooter = ({ links=[] }: CustomNavFooter) => {
  return <CustomNavLink links={links} isMobile={false} isParrentHorizontal></CustomNavLink>
};

export default CustomNavFooter