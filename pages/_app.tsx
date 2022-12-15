import '../styles/globals.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import Appbar from '../components/Appbar';
import Navigation from '../components/Navigation';

export default function App({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  return (
    <div className="grid grid-cols-main h-screen">
      <div className=" bg-white border-slate-300 border-r">
        <Navigation/>
      </div>
      <div className="grid grid-rows-header h-screen">
        <Appbar component={component}/>
        <Component {...pageProps} setAppBarComponent={setComponent}/>
      </div>
    </div>
  );
}