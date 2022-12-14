import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Appbar from '../components/Appbar';
import Search from '../components/Search';
import { memo, useState } from 'react';

export default function App({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  return (
    <div className="grid grid-cols-main h-full h-screen">
      <div className=" bg-white border-slate-300 border-r"><p>Side menu</p></div>
      <div className="grid grid-rows-header">
        <Appbar component={component}/>
        <Component {...pageProps} setAppBarComponent={setComponent}/>
      </div>
    </div>
  );
}