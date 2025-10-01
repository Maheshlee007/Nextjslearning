import axios from "axios";


async function fetchData() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos", {
    // next: { revalidate: 10 } //for ISR
    headers: {
      "Cache-Control": "no-store", //for SSR
    },
  });
  return res.data;
}

// export const revalidate = 20; //for ISR at page level

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await fetchData();

  return (
    <div className="p-8 ">
      {data.map((item:Record<string, any>) => (
        <div key={item.id} className="mb-4 flex justify-between p-4 border-b border-b-blue-200 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
          <p className="text-gray-600">{item.completed ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
}