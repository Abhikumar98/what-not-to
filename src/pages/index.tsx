import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  const [prompt, setPrompt] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<string>('');

  const handlePromptGeneration = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const body = {
        prompt,
      };
      const responseJSON = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const res = await responseJSON.json();
      const [answer] = res;

      setResponse(answer.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex h-screen items-center'>
        <div className='flex h-full w-1/2 items-center bg-[#ffe6e6]'>
          <img src='/images/singham.jpeg' />
        </div>
        <div className='w-1/2 p-20'>
          <div className=' text-4xl font-extrabold'>
            What not to do when police catches you while...
          </div>
          <div>Disclamer: Please don't do this XD</div>
          <div>
            <form onSubmit={handlePromptGeneration}>
              <input
                className='my-8 w-full rounded-md border-2 border-black p-2'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div>
                {loading ? (
                  <div>Generating...</div>
                ) : (
                  <div className='flex w-full justify-center'>
                    <button
                      className=' flex h-full items-center justify-center rounded-md bg-black px-3 py-1.5 text-white'
                      type='submit'
                    >
                      <div>Generate Prompt</div>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div>
            <pre className=' whitespace-pre-wrap font-primary'>{response}</pre>
          </div>
        </div>
      </main>
    </Layout>
  );
}
