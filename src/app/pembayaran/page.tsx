import React from 'react'
import { Button } from '@/components/data-master/button';
import { HeroDefault } from '@/components/hero-default';


const Page = () => {
  return (
    <div>
      <div className="flex flex-col">
        <HeroDefault />
        <div className="flex-grow ml-25 mx-25 grid grid-cols-5 gap-y-8 gap-x-5 -mt-[89px]">
          <Button buttonName="Pembayaran Gaji Guru" slug="/pembayaran/guru" images="pembayaran-guru"/>
          <Button buttonName="Pembayaran Wali Murid" slug="/pembayaran/wali-murid" images="pembayaran-wali-murid"/>
        </div>
      </div>
    </div>
  );
}

export default Page