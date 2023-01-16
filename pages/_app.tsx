import '../styles/globals.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import Appbar from '../components/Appbar';
import Navigation from '../components/Navigation';
import Backdrop from '../components/Backdrop';
import { useRouter } from 'next/router';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

export default function App({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  const router = useRouter();
  const queryClient = new QueryClient();
  if(router.pathname==="/login") return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps}/>
    </QueryClientProvider>
  )
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-main h-screen">
        <div id="portal" className='fixed z-10'></div>
        <div className=" bg-white border-slate-300 border-r">
          <Navigation/>
        </div>
        <div className="grid grid-rows-header h-screen">
          <Appbar component={component}/>
          <Component {...pageProps} setAppBarComponent={setComponent}/>
        </div>
      </div>
    </QueryClientProvider>
  );
}