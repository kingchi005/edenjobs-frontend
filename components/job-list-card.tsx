import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default function JobListCard() {
  return (
    <div className="shadow-[0_2px_2px_rgba(0,0,0,0.1)] cursor-pointer p-3 rounded-[10px] hover:shadow-[0_5px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center mb-[15px]">
        <img className='w-[50px] h-[50px] object-cover inline-block mr-2.5 rounded-[50%]' src="/images/brendan.jpg" alt="" />
        <div>
          <b className="block">Sales Executive</b>
          <small className="text-[color:var(--text)]">Gafford Property & Homes</small>
        </div>
      </div>
      <div className="flex items-center">
        {/* <Button title='Full Time' /> */}
        {/* <Button title='Onsite' /> */}
        {/* <Button title='Junior' /> */}
        <span className="inline-block border border-[color:var(--primary)] text-[color:var(--primary)] text-xs mr-2.5 px-2.5 py-[5px] rounded-[30px] border-solid">Full Time</span>
        <span className="inline-block border border-[color:var(--primary)] text-[color:var(--primary)] text-xs mr-2.5 px-2.5 py-[5px] rounded-[30px] border-solid">Onsite</span>
        <span className="inline-block border border-[color:var(--primary)] text-[color:var(--primary)] text-xs mr-2.5 px-2.5 py-[5px] rounded-[30px] border-solid">Junior</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        architecto obcaecati, minima officiis enim id repellendus beatae
        voluptate provident aut doloremque! Vel, debitis esse impedit
        praesentium pariatur repellendus consequatur in.
      </p>
      <div className="botton">
        <div className="salary">Salary: N210,000 - N300,000</div>
        <div className="posted">Posted 2 hours ago</div>
      </div>
    </div>
  )
}
