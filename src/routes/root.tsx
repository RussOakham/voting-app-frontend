import { Outlet } from 'react-router-dom';

import { Shell } from '@/components/layouts/shells/shell';

function Root() {
  return (
    <Shell variant='default' className='max-w-6xl'>
        <h1 className='font-bold text-lg text-center'>Welcome to the voting app</h1>
        <Outlet />
    </Shell>
  )
}

export default Root
