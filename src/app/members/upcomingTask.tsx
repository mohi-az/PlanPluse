'use client'
import clsx from 'clsx';
import Lottie from 'lottie-react';

import React from 'react'
import confettie from '@/assets/lotties/confetti.json'
export default  function UpcomingTask({ userUpcomingTasks }: { userUpcomingTasks: userTasks[] }) {
    
    let RowNo = 1;
    return (
        <div> {userUpcomingTasks.length > 0 ? (
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th className='lg:font-semibold text-sm lg:text-lg'>Title</th>
                        <th className='lg:font-semibold text-sm lg:text-lg'>Description</th>
                        <th className='lg:font-semibold text-sm lg:text-lg'>Due date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userUpcomingTasks.map(task =>
                            <tr key={task.id} className='w-full hover h-6 overflow-y-scroll'>
                                <td>{RowNo++}</td>
                                <td className={clsx(task.status != "Done" && 'font-bold', 'flex flex-row gap-2 items-center')}>
                                    {task.title}
                                </td>
                                <td className={clsx(task.status != "Done" && 'font-bold')}> {task.description}</td>
                                <td> {task.dueDate ? new Date(task.dueDate).toDateString() : ''}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
            : <div className='flex flex-col items-center h-1/2 gap-1 md:gap-5 justify-center'>
                <div>
                        <Lottie animationData={confettie}  loop={false} className='w-32'/>
                </div>
                <div className='pb-1'>No upcoming tasks—enjoy your day!</div>
            </div>
        }</div>
    )
}
