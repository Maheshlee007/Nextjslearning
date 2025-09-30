// export async function GET(){
//     console.log('GET request received');
//     return new Response('Hello, user Next.js!')
// }
let users:Record<string, any>[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
export async function GET(request: Request) {
  // For example, fetch data from your DB here
   
  const sendingData = {"No of users": users.length, users};
  return new Response(JSON.stringify(sendingData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
 
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;
 
  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };
  users.push(newUser);
// users = users.length > 0 ? [...users, newUser] : [newUser];
 
  // Return the newly created user
 
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(req:Request){
    const body = await req.json();
    const {id, name}=body
    
    let verifyuser =users.findIndex(user=>user.id=== id)
    console.log(verifyuser);
    users[verifyuser]={id,name}
    // return new Response(JSON.stringify(users[verifyuser]), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    return Response.json(users[verifyuser], { status: 200 });

}