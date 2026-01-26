import type {ReactNode} from "react";
import {MenuItem} from "@mui/material";
import {NavLink} from "react-router";

type Props = {
  to: string;
  children?: ReactNode;
}

const MenuItemLink = ({to, children}: Props) => (
  <MenuItem
    component={NavLink}
    to={to}
    end
    sx={{
      fontSize: '1.2rem',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      '&.active': {
        color: 'yellow',
      },
    }}
  >{children}</MenuItem>
);

export default MenuItemLink;
