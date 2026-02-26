import { auth } from '@/lib/auth';

export default async function ExampleUsage() {
  const session = await auth();

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  const { role } = session.user;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Your role: {role}</p>

      {role === 'ADMIN' && <div>Admin-only content</div>}

      {(role === 'ADMIN' || role === 'MEMBER') && <div>Member content</div>}
    </div>
  );
}
