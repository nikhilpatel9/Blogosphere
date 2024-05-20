import { createRequire } from 'module';
 const require = createRequire(import.meta.url); 
 const flowbite = require("flowbite-react/tailwind");
 //import { Button } from "flowbite-react";
 /** * @type {import('tailwindcss').Config} */
  export default { 
    content: [ 
      "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}", 
     "node_modules/flowbite-react/lib/esm/**/*.js,jsx,ts,tsx}", 
     flowbite.content(),
    ], 
     theme: {
       extend: {}, 
      }, 
      plugins:
       [ 
        flowbite.plugin(),
        require('flowbite/plugin'), 
      ], 
    };