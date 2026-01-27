import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      display:"flex",
      flexDirection: "column"
    }}>
      <Link href={"/app/child"}>На страницу ребенка</Link>
      <Link href={"/app/parent"}>На страницу родителя</Link>
      <Link href={"/auth"}>Вход</Link>
   
    </div>
  );
}
