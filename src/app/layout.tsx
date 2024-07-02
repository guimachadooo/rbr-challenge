"use client";

import React, { useState } from "react";

import {
  Box,
  Grid,
  GridItem,
  useMediaQuery,
  ChakraProvider,
} from "@chakra-ui/react";

import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import TanstackProvider from "@/components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  const [isMobile] = useMediaQuery("(max-width: 800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const [isSidebarOpen, setSidebarOpen] = useState(isMobile);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <html lang="pt-br">
      <head>
        <title>RBR Challenge vwo</title>        
      </head>

      <body className={inter.className}>
        <Script id="vwoCode" strategy="beforeInteractive">
            {`window._vwo_code || (function() {
              var account_id=912032,
              version=2.1,
              settings_tolerance=2000,
              hide_element='body',
              hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
              /* DO NOT EDIT BELOW THIS LINE */
              f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='_vwo_'+account_id+'_settings',cc={};try{var c=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=c&&typeof c==='object'?c:{}}catch(e){}var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={use_existing_jquery:function(){return typeof use_existing_jquery!=='undefined'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){var i=this.getSettings(),n=d.createElement('script'),r=this;t=t||{};if(i){n.textContent=i;d.getElementsByTagName('head')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200){w._vwo_code.addScript({text:o.responseText})}else{w._vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}w._vwo_code.finish('&e=loading_failure:'+e)};o.send()}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){w._vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var i=this.hide_element(),n=i?i+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=n;else t.appendChild(d.createTextNode(n));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var n=d.createElement('div');n.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;';n.setAttribute('id','_vis_opt_path_hides');n.classList.add('_vis_hide_layer');t.parentNode.insertBefore(n,t.nextSibling)}var o='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:o})}else{this.load(o+'&x=true')}}};w._vwo_code=code;code.init();})();(function(){var i=window;function t(){if(i._vwo_code){var e=t.hidingStyle=document.getElementById('_vis_opt_path_hides')||t.hidingStyle;if(!i._vwo_code.finished()&&!_vwo_code.libExecuted&&(!i.VWO||!VWO.dNR)){if(!document.getElementById('_vis_opt_path_hides')){document.getElementsByTagName('head')[0].appendChild(e)}requestAnimationFrame(t)}}}t()})();
            `}
          </Script>
        
        <TanstackProvider>
          <ChakraProvider>
            {router !== "/" ? (
              <Grid
                templateAreas={`
                  "header header"
                  "nav main"
                  "nav footer"
                `}
                gridTemplateRows={"60px 1fr 30px"}
                gridTemplateColumns={!isMobile ? "250px 1fr" : "0px 1fr"}
                h="100vh"
                color="blackAlpha.700"
                fontWeight="bold"
              >
                <GridItem area={"header"}>
                  <Box ml={0}>
                    <Header
                      showSidebarButton={isMobile}
                      onShowSidebar={toggleSidebar}
                    />
                  </Box>
                </GridItem>

                <GridItem pl="2" p="4" bg="gray.300" area={"nav"}>
                  <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    variant={isMobile ? "drawer" : "sidebar"}
                  />
                </GridItem>

                {/* retorna o conteudo */}
                <GridItem pl="2" bg="white" area={"main"}>
                  {children}
                </GridItem>

                <GridItem pl="2" bg="gray.100" area={"footer"}>
                  <Footer />
                </GridItem>
              </Grid>
            ) : (
              children
            )}
          </ChakraProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
