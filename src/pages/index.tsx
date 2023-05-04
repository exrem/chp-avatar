import { Fragment, useState, useEffect, useRef } from 'react'

import Head from 'next/head'
import ImageComponent from 'next/image'

import { Prompt } from 'next/font/google'
const font = Prompt({ subsets: ['latin'], weight: ['400', '600', '800'] })

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'

import themes from '@/data/themes'

const classNames = (...classes) => classes.filter(Boolean).join(' ')

export default function Home() {
  const [selected, setSelected] = useState(themes[0].themes.find(theme => theme.name == 'LGBT Pride')),
    [bg, setBg] = useState(selected.background),
    [fg, setFg] = useState('#FFFFFF')

  useEffect(() => {
    setBg(selected.background)
    setFg(selected.foreground)
  }, [selected])

  function downloadSVG(filename) {
    const svgEl = document.querySelector('svg#chp')

    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function convertSVGtoPNG(svgElement, width, height, onDone) {
    // Create a new canvas element with the desired dimensions
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Get the SVG data as a data URI
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgURL = 'data:image/svg+xml;base64,' + btoa(svgData);

    // Create a new Image object and set its src attribute to the SVG data
    const img = new Image();
    img.onload = () => {
      // Draw the SVG image onto the canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a data URL and pass it to the onDone callback
      const pngData = canvas.toDataURL('image/png');
      onDone(pngData);
    };
    img.src = svgURL;
  }

  function downloadPNG (filename) {
    const svgElement = document.querySelector('svg#chp')

    convertSVGtoPNG(svgElement, 1024, 1024, (pngData) => {
      var downloadLink = document.createElement("a");
    downloadLink.href = pngData;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    });
  }

  return (
    <main className={`${font.className} p-4 min-h-screen xl:m-auto xl:py-8 xl:w-1/2`}>
      <Head>
        <title>CHP Avatar Generator</title>
      </Head>

      <nav className='flex justify-evenly items-center mb-8 px-6 py-4 bg-gray-950 bg-opacity-50 rounded-md'>
        <ImageComponent src='/favicon.png' alt='Pride CHP Flag' width={128} height={128} className='w-12 rounded-full xl:w-16' />
        <h1 className='text-lg font-extrabold uppercase xl:text-4xl'>CHP Avatar Generator</h1>
      </nav>

      <div className='inline-block mb-4 h-full xl:w-1/3'>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className='block text-sm font-medium leading-6'>Select a theme:</Listbox.Label>
              <div className='relative mt-2'>
                <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-marroon sm:text-sm sm:leading-6'>
                  <span className='flex items-center'>
                    <img src={selected.icon} alt='' className='h-5 w-5 flex-shrink-0 object-scale-down' />
                    <span className='ml-3 block truncate'>{selected.name}</span>
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                    <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {
                      themes.sort((a, b) => a.label > b.label ? 1 : -1).map((group, gindex) => (
                        <>
                          <Listbox.Option
                            key={`g${gindex}`}
                            className='relative text-gray-900 cursor-default select-none py-2 pl-3 pr-9'
                            value={group}
                            disabled
                          >

                            <div className='flex items-center'>
                              <img src='' alt='' className='invisible h-5 w-5' />
                              <span className='block ml-3 text-lg font-semibold truncate'>{group.label}</span>
                            </div>
                          </Listbox.Option>

                          {
                            group.themes.sort((a, b) => a.name > b.name ? 1 : -1).map((theme, tindex) => (
                              <Listbox.Option
                                key={`t${tindex}`}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-marroon bg-opacity-20 text-gray-900' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                  )
                                }
                                value={theme}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className='flex items-center'>
                                      <img src={theme.icon} alt='' className='h-5 w-5 flex-shrink-0 object-scale-down' />
                                      <span
                                        className='block ml-3 font-normal truncate'
                                      >
                                        {theme.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active ? 'text-gray-900' : 'text-marroon',
                                          'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                      >
                                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))
                          }
                        </>
                      ))
                    }
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <div className='inline-block float-right mb-4 p-4 bg-gray-900 bg-opacity-50 w-full h-full xl:w-1/2'>
        <h1 className='mb-4 text-4xl font-extrabold text-center uppercase'>Result</h1>

        <svg width={1024} height={1024} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className='m-auto w-2/3 h-auto' id='chp'>
          {
            bg?.style == 'solid' ? (
              <>
                {
                  bg.colour.map((colour, index) => (
                    <rect key={index} width={1024} height={1024 * bg.rectHeight[index]} fill={colour} />
                  ))
                }
              </>
            ) : (
              <></>
            )
          }

          <path d="M233.068 737.937V755.486L635.976 749.335L650.912 759L696.553 744.966L649.155 730.029L635.121 738.792L233.068 737.937Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
          <path d="M227.795 700.165L230.431 717.737L794.008 593.091L812.436 598.363L855.441 575.519L807.164 570.247L789.615 583.427L227.795 700.165Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
          <path d="M212.864 665.073L827.33 396.452L837.873 380.637L887.029 373.632L851.052 406.996L830.844 404.36L222.528 681.767L224.262 669.443L212.864 665.073Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
          <path d="M192.66 633.482L204.96 648.395L666.712 306.017L689.509 303.405L717.625 266.55L671.082 278.827L662.319 298.133L192.66 633.482Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
          <path fillRule="evenodd" clipRule="evenodd" d="M168.091 606.255L180.392 620.289L449.892 313.935L468.319 309.518L489.382 265.635L449.013 285.843L443.741 306.004L168.091 606.255Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
          <path fillRule="evenodd" clipRule="evenodd" d="M136.5 586.073L297.145 318.331L298.024 298.146L333.145 264.782L324.359 313.059L304.174 322.724L152.315 597.495L136.5 586.073Z" fill={fg} stroke={fg} strokeWidth="2.82384" strokeMiterlimit="3.864" />
        </svg>

        <div className='flex flex-row justify-evenly mt-8'>
          <h1 className='mb-4 text-xl font-extrabold text-center uppercase cursor-default'>Download</h1>
          <button className='mb-4 text-blue-500 text-xl font-extrabold text-center uppercase cursor-pointer' onClick={() => downloadSVG(`${selected.name} CHP.svg`)}>SVG</button>
          <button className='mb-4 text-green-500 text-xl font-extrabold text-center uppercase cursor-pointer' onClick={() => downloadPNG(`${selected.name} CHP.png`)}>PNG</button>
        </div>
      </div>

      <footer className='absolute bottom-4 left-0 m-auto w-full text-center'>
        made by <a href='https://github.com/Eray6421' className='text-sky-500'>Eray#6421</a> with &lt;3. open-source on <a href='https://github.com/Eray6421/chp-avatar' className='text-sky-500'>GitHub</a>.
      </footer>
    </main >
  )
}
