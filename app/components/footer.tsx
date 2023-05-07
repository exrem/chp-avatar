import { Inter } from 'next/font/google'
const inter = Inter ({ subsets: ['latin'], weight: ['800'] })

export default function () {
    return <footer className={`${inter.className} absolute left-0 bottom-0 px-[4vw] py-[4vh] bg-zinc-900 bg-opacity-50 text-gray-50 w-screen h-[15vh] text-center xl:h-fit`}>
        made by <a href='https://github.com/Eray6421' className='text-sky-500 hover:text-sky-400 active:text-sky-300'>Eray#6421</a> with &lt;3. open-source on <a href='https://github.com/Eray6421/chp-avatar' className='text-sky-500 hover:text-sky-400 active:text-sky-300'>GitHub</a>.
        </footer>
}