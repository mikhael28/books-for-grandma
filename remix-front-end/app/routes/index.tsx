import { Theme, useTheme } from '~/utils/theme-provider';
import { useState, useEffect, createRef } from 'react';

export default function IndexRoute() {
  const [, setTheme] = useTheme();
  const [page, setPage] = useState<number>(1);
  const [book, setBook] = useState<number>(92460);
  const [sentences, setSentences] = useState([]);
  const [pageOptions, setPageOptions] = useState<any>([]);

  const ref: any = createRef();

  async function fetchText(updatedPage: number) {
   
    let request = await (await fetch(`https://dzksh6taq5.execute-api.us-east-1.amazonaws.com/dev/${book}/${updatedPage}`)).json();
    setSentences(request.message.slice(1));
    console.log('Number of sentences: ', request.message.length);
  }

  // initial useEffect, might not be necessary
  useEffect(() => {
    fetchText(page);
    let pages = [];
    for (let i = 0; i < 100; i++) {
      pages.push({value: i + 1, str: `${i + 1}`})
    }
    setPageOptions(pages);
  }, [])

  useEffect(() => {
    fetchText(page);
  }, [page])


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="flex justify-center flex-wrap gap-4 py-8">
        <button
          className="text-gray-50 bg-gray-900 py-1 px-12 rounded-xl text-3xl border-4 border-gray-50"
          onClick={() => setTheme(Theme.DARK)}
        >
          Dark
        </button>
        <button
          className="text-gray-900 bg-white py-1 px-12 rounded-xl text-3xl border-4 border-gray-900"
          onClick={() => setTheme(Theme.LIGHT)}
        >
          Light
        </button>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        <button className="text-gray-900 bg-white py-1 px-12 rounded-xl text-1xl border-4 border-gray-900" 
        onClick={() => {
          if (page !== 1) {
            setPage(page - 1);
            
          }
        }}
        >⬅</button>
        <button className="text-gray-900 bg-white py-1 px-12 rounded-xl text-1xl border-4 border-gray-900" onClick={() => {
            setPage(page + 1);
            
        }}>➡</button>
      </div>
      
      <div className="mt-8 max-w-xl mx-4 sm:mx-auto text-gray-900 dark:text-gray-50">
        <h1 className="text-1xl font-bold" ref={ref}><label>Page number</label>&nbsp;&nbsp;&nbsp;
      <select name="cars" id="cars" value={page} onChange={(e) => {
        setPage(parseInt(e.target.value));
      }}>
        {pageOptions.map((option: any) => (
          <option value={option.value}>{option.str}</option>
        ))}
        
      </select></h1>
        {sentences.map((sentence, i) => {
          return(
            <p className="mt-4 text-md" key={i}>
              {sentence}
            </p>
            )
          }
        )}
      </div>
      <br />
      <div className="flex justify-center flex-wrap gap-4">
        <button className="text-gray-900 bg-white py-1 px-12 rounded-xl text-1xl border-4 border-gray-900" 
        onClick={() => {
          if (page !== 1) {
            setPage(page - 1);
            ref.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }}
        >⬅</button>
        <button className="text-gray-900 bg-white py-1 px-12 rounded-xl text-1xl border-4 border-gray-900" onClick={() => {
            setPage(page + 1);
            ref.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
        }}>➡</button>
      </div>
    </div>
  );
}
