import '../styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import Appbar from '../components/Appbar';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/router';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import {ToastContainer} from 'react-toastify'
import {Provider, useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

import store from '../Context/store';
import WhoAmI from '../components/hoc/WhoAmI';
import Redirect from '../components/hoc/Redirec';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import ClientLayout from '../components/client/ClientLayout';
import { loadCart } from '../Context/CartSlice';
import Loading from '../components/UIElements/Loading';

//bind loading indicator
Router.events.on('routeChangeStart',()=>{
  NProgress.start();
});
Router.events.on('routeChangeComplete',()=>{
  NProgress.done();
})
export default function App(props: AppProps){
  const queryClient = new QueryClient();
  const router = useRouter();
  return(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-left' autoClose={1500}/>
        {
        router.pathname.startsWith('/client')?
          <Client {...props}/>:
          <WhoAmI>
            <AppContent {...props}/>
          </WhoAmI>
        }
      </QueryClientProvider>
    </Provider>
  );
}
function Client(props:AppProps){
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState<boolean>(true);
  useEffect(()=>{
    dispatch(loadCart());
  },[]);
  useEffect(()=>{
    if(router.query.tableNumber){
      localStorage.setItem("table-number",router.query.tableNumber as string);
    }
    if(router.query){
      setLoading(false);
    }
    return ()=>{localStorage.removeItem("table-number")}
  },[router])
  if(loading) return <Loading type='full'/>
  if(!router.query.tableNumber) return (
    <div className='flex items-center justify-center flex-col h-screen w-full border border-red-300'>
      <p className='text-red-600'>Table number was not provided</p>
      <p className='text-sm text-gray-500'>Please scan a correct QR code</p>
      <p className='text-sm text-gray-500'>or contact the admin</p>
    </div>
  )
  return <AppContent {...props}/>
}

function AppContent({ Component, pageProps }: AppProps){
  const [component,setComponent]= useState(<div></div>);
  const router = useRouter();
  if(router.pathname==="/login") return (
    <Redirect>
      <Component {...pageProps}/>
    </Redirect>
  )
  if(router.pathname.startsWith('/client')) return(
    <ClientLayout>
      <Component/>
    </ClientLayout>
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

