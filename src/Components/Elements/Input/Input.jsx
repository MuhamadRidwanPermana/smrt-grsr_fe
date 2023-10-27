import { Input } from 'antd';

export default function input({type, placeholder, name}) {
  return (
    <>
      <Input type={type} placeholder={placeholder} name={name} className='w-full mt-3 p-3 border-2 border-gray-300 bg-white rounded-lg'/>
    </>
  );
  }
