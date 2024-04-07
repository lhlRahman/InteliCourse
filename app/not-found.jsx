import { UserButton } from '@clerk/nextjs';

export default function Component() {
  return (
    <div className='w-screen h-screen grid place-content-center bg-white'>
      <UserButton />
    </div>
  );
}