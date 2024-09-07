import React from 'react'


const list_participations = [
    "Users will access the Krypt Brand website.",
    "They will connect their Solana wallet.",
    "Users can mint one of the 100 collectibles.",
    "Once minted, it'll reveal if your collectibles contains a hidden treasure."
]

function Participate() {
  return (
    <React.Fragment>
        <div className=' rounded-tr-2xl rounded-tl-2xl mb-4 flex flex-col gap-8 py-8 px-1  bg-white'>
            <header>
                <h1 className=' text-center font-black text-orange-600 text-2xl uppercase font-[arial]'>How to participate</h1>
            </header>
            <ul className=' flex flex-col gap-3'>
                {
                    list_participations.map((each,index)=>{
                       return(
                        <span className=' font-medium grid grid-cols-[1fr_4fr] ' key={index}>Step {index+1}. &nbsp;<li className=' text-sm font-bold'>{each}</li></span>
                       )
                    })
                }
            </ul>
        </div>
    </React.Fragment>
  )
}

export default Participate