import '../styles/globals.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import Appbar from '../components/Appbar';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import {ToastContainer} from 'react-toastify'
import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import store from '../Context/store';

export default function App(props: AppProps){
  const queryClient = new QueryClient();
  return(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-left'/>
        <AppContent {...props}/>
      </QueryClientProvider>
    </Provider>
  );
}

function AppContent({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  const router = useRouter();
  if(router.pathname==="/login") return (
      <Component {...pageProps}/>
  )
  return (
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
  );

}

