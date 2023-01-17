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
import RedirectToHome from '../components/hoc/RedirecToHome';
import WhoAmI from '../components/hoc/WhoAmI';
import RedirectToLogin from '../components/hoc/RedirectToLogin';

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
    <RedirectToHome>
      <WhoAmI>
        <Component {...pageProps}/>
      </WhoAmI>
    </RedirectToHome>
  )
  return (
    <RedirectToLogin>
      <WhoAmI>  
        <div className="grid grid-cols-main h-screen">
          <div className=" bg-white border-slate-300 border-r">
            <Navigation/>
          </div>
          <div className="grid grid-rows-header h-screen">
            <Appbar component={component}/>
            <Component {...pageProps} setAppBarComponent={setComponent}/>
          </div>
        </div>
      </WhoAmI>
    </RedirectToLogin>
  );

}

