import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/cabins">cabins</Link>
      </li>
      <li>
        <Link href="/about">about</Link>
      </li>
      <li>
        <Link href="/account">account</Link>
      </li>
    </ul>
  );
}
