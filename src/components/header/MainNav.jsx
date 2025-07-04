import Link from 'next/link';

export default function MainNav({ pathname, classes }) {
  return (
    <>
      <Link
        href="/"
        className={`${classes.link} ${pathname === '/' ? classes.active : ''}`}
      >
        Home
      </Link>
      <Link
        href="/alojamientos"
        className={`${classes.link} ${pathname === '/alojamientos' ? classes.active : ''}`}
      >
        Alojamientos
      </Link>
    </>
  );
}