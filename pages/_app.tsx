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
import Router from 'next/router';

import store from '../Context/store';
import WhoAmI from '../components/hoc/WhoAmI';
import Redirect from '../components/hoc/Redirec';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

//bind loading indicator
Router.events.on('routeChangeStart',()=>{
  NProgress.start();
});
Router.events.on('routeChangeComplete',()=>{
  NProgress.done();
})
export default function App(props: AppProps){
  const queryClient = new QueryClient();
  return(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-left' autoClose={1500}/>
        <WhoAmI>
          <AppContent {...props}/>
        </WhoAmI>
      </QueryClientProvider>
    </Provider>
  );
}

function AppContent({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  const router = useRouter();
  if(router.pathname==="/login") return (
    <Redirect>
      <Component {...pageProps}/>
    </Redirect>
  )
  return (
    <Redirect>
      <div className="grid grid-cols-main h-screen">
        <div className=" bg-white border-slate-300 border-r">
          <Navigation/>
        </div>
        <div className="grid grid-rows-header h-screen">
          <Appbar component={component}/>
          <Component {...pageProps} setAppBarComponent={setComponent}/>
        </div>
      </div>
    </Redirect>
  );

}

