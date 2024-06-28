import { Button } from 'flowbite-react';

export default function NewProject() {
  return (
    <><div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center h-64 w-2/3'>
    <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
        A word search game is a puzzle where players must find a list of hidden words within a grid of letters 
        <a href='https://github.com/nikhilpatel9/Word_Search_Puzzle'className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Source Code</a>
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these game! made with JavaScript , CSS, HTML, jQuery , Bootstrap.
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="https://nikhilpatel9.github.io/Word_Search_Puzzle/" target='_blank' rel='noopener noreferrer'>
              Words Search Puzzle
            </a>
        </Button>
    </div>
    <div className="p-9 flex-1">
        <img  className ="h-48 w-96 flex-auto" src="https://thewordsearch.com/v4/img/word-search-puzzle.png" />
    </div>
    
</div><div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center h-64 w-2/3'>
    <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
        A simple to-do list maker that meets your team’s needs
        <a href='https://github.com/nikhilpatel9/to_do_list'className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Source Code</a>
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these project! made with JavaScript , CSS, HTML.
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="https://nikhilpatel9.github.io/to_do_list/" target='_blank' rel='noopener noreferrer'>
              To Do List
            </a>
        </Button>
    </div>
    <div className="p-9 flex-1">
        <img  className ="h-48 w-96 flex-auto" src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?height=474&width=711&fit=bounds" />
    </div>
    
</div></>
    
)
}
