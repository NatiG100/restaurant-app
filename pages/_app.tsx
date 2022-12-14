import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-cols-main gap-2 h-full h-screen">
      <div className=" bg-white"><p>Side menu</p></div>
      <div className="grid grid-rows-header">
        <div>Header</div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
