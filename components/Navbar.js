import Link from 'next/link';
import { Navbar as NextUINavbar, Text } from '@nextui-org/react';

const Navbar = () => {
  return (
    <NextUINavbar>
      <NextUINavbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Sales Dashboard
        </Text>
      </NextUINavbar.Brand>
      <NextUINavbar.Content>
        <NextUINavbar.Link as={Link} href="/dashboard">
          Dashboard
        </NextUINavbar.Link>
        <NextUINavbar.Link as={Link} href="/dashboard/sales">
          Sales
        </NextUINavbar.Link>
        <NextUINavbar.Link as={Link} href="/dashboard/orders">
          Orders
        </NextUINavbar.Link>
        <NextUINavbar.Link as={Link} href="/dashboard/products">
          Products
        </NextUINavbar.Link>
        <NextUINavbar.Link as={Link} href="/dashboard/analytics">
          Analytics
        </NextUINavbar.Link>
        <NextUINavbar.Link as={Link} href="/sales/cart">
          Cart
        </NextUINavbar.Link>
      </NextUINavbar.Content>
    </NextUINavbar>
  );
};

export default Navbar;