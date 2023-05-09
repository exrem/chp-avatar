'use client'

import { useState, useEffect } from 'react'

import ImageComponent from 'next/image'

import { Listbox } from '@headlessui/react'

import { Buffer } from 'buffer'

// local files

import animéCharacters from './data/animécharacters'
import localize from './data/localization'
import themeGroups from './data/themes'

import Footer from './components/footer'

export default function Home() {
  const [dictionary, setDictionary] = useState(localize('tr')),
    [selectedTheme, setSelectedTheme] = useState({
      name: 'LGBT Pride',
      background: {
        rectangleColours: ['#770088', '#004CFF', '#028121', '#FFEE00', '#FF8D00', '#E50000'],
        rectangleHeights: [1, 5 / 6, 4 / 6, 3 / 6, 2 / 6, 1 / 6],
        rectangleWidths: [1, 1, 1, 1, 1, 1]
      },
      foreground: '#FFFFFF'
    }),
    [bg, setBg] = useState(selectedTheme.background),
    [fg, setFg] = useState('#FFFFFF'),
    [selectedAniméCharacter, setSelectedAniméCharacter] = useState('Killua Zoldyck'),
    [location, setLocation] = useState('')

  useEffect(() => {
    setDictionary(localize(navigator.language))

    setLocation(window.location.href)
  }, [])

  useEffect(() => {
    setBg(selectedTheme.background)
    setFg(selectedTheme.foreground ?? '#FFFFFF')
  }, [selectedTheme])

  const downloadSVG = () => {
    const svgElement: any = document.querySelector('svg#chp')
    svgElement.setAttribute('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')

    const svgData = svgElement.outerHTML,
      svgURL = URL.createObjectURL(new Blob(['<?xml version="1.0" standalone="no"?>\r\n', svgData], { type: 'image/svg+xml;charset=utf-8' })),
      linkElement = document.createElement('a')

    linkElement.setAttribute('href', svgURL)
    linkElement.setAttribute('download', `${selectedTheme.name} CHP.svg`)

    document.body.appendChild(linkElement)
    linkElement.click()
    document.body.removeChild(linkElement)
  }

  const downloadPNG = () => {
    const convertToPNG = (done: Function) => {
      const svgElement: any = document.querySelector('svg#chp'),
        svgData = new XMLSerializer().serializeToString(svgElement),
        svgURL = `data:image/svg+xml;base64,${Buffer.from(svgData).toString('base64')}`

      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 1024

      const ctx = canvas.getContext('2d')

      const img = new Image()
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, 1024, 1024)

        return done(canvas.toDataURL('image/png'))
      }
      img.src = svgURL
    }

    convertToPNG((pngURL: any) => {
      const linkElement = document.createElement('a')

      linkElement.setAttribute('href', pngURL)
      linkElement.setAttribute('download', `${selectedTheme.name} CHP.png`)

      document.body.appendChild(linkElement)
      linkElement.click()
      document.body.removeChild(linkElement)
    })
  }

  return (
    <>
      <main className='m-auto p-4 pb-[10vh] w-screen h-[85vh] overflow-y-scroll xl:w-2/5'>
        <nav className='flex flex-row justify-center items-center mb-4 p-4 bg-zinc-800 bg-opacity-60 w-full min-h-fit border border-zinc-400'>
          <ImageComponent src='/favicon.ico' alt='CHP Flag with a LGBT Pride background.' width={48} height={48} className='mr-2 w-12 rounded-full' />
          <h1 className='ml-2 text-2xl font-extrabold uppercase'>{dictionary.title}</h1>
        </nav>

        <div className='inline-block mb-6 w-full xl:w-[45%]'>
          <Listbox value={selectedTheme} onChange={setSelectedTheme}>
            <Listbox.Label>{dictionary.selectATheme}</Listbox.Label>

            <Listbox.Button className='flex flex-row justify-center items-center my-2 p-4 bg-zinc-900 bg-opacity-60 w-full min-h-fit text-xl border border-zinc-400 hover:bg-opacity-80 active:bg-opacity-100'>
              <ImageComponent src={`/themes/${selectedTheme.name}.svg`} alt='' width={48} height={48} className='mr-3 w-8 h-8 object-scale-down' />
              {selectedTheme.name}
            </Listbox.Button>

            <Listbox.Options className='absolute py-2 bg-zinc-900 w-[calc(100%-2rem)] max-h-[45vh] border border-zinc-400 overflow-y-auto xl:w-[calc(18%-0.9rem)] xl:max-h-96'>
              {
                themeGroups.sort((a, b) => a.name > b.name ? 1 : -1).map(group => (
                  <>
                    <Listbox.Option key={group.name} value={group} disabled={true} className='px-4 py-2 font-extrabold cursor-default select-none'>{group.name}</Listbox.Option>

                    {
                      group.themes.sort((a, b) => a.name > b.name ? 1 : -1).map(theme => (
                        <Listbox.Option key={theme.name} value={theme} className={`${theme.name == selectedTheme.name ? 'bg-marroon font-medium hover:bg-opacity-100 active:bg-opacity-100' : ''} flex flex-row items-center px-4 py-4 w-full min-h-fit cursor-pointer hover:bg-marroon hover:bg-opacity-30 active:bg-opacity-60`}>
                          <ImageComponent src={`/themes/${theme.name}.svg`} alt='' width={32} height={32} className='mr-2 w-8 h-8 object-scale-down' />
                          {theme.name}
                        </Listbox.Option>
                      ))
                    }
                  </>
                ))
              }
            </Listbox.Options>
          </Listbox>

          <Listbox value={selectedAniméCharacter} onChange={setSelectedAniméCharacter}>
            <Listbox.Label>{dictionary.selectAnAnimeCharacter}</Listbox.Label>

            <Listbox.Button className='flex flex-row justify-center items-center my-2 p-4 bg-zinc-900 bg-opacity-60 w-full min-h-fit text-xl border border-zinc-400 hover:bg-opacity-80 active:bg-opacity-100'>
              {selectedAniméCharacter ? <ImageComponent src={`/animecharacters/${encodeURIComponent(selectedAniméCharacter)}.png`} alt='' width={48} height={48} className='mr-3 w-8 object-scale-down' /> : <></>}
              {selectedAniméCharacter ? selectedAniméCharacter : 'None'}
            </Listbox.Button>

            <Listbox.Options className='absolute py-2 bg-zinc-900 w-[calc(100%-2rem)] max-h-[45vh] border border-zinc-400 overflow-y-auto xl:w-[calc(18%-0.9rem)] xl:max-h-96'>
              <Listbox.Option key={null} value={null} className={`${selectedAniméCharacter ? '' : 'bg-marroon font-medium hover:bg-opacity-100 active:bg-opacity-100'} flex flex-row items-center px-4 py-4 w-full min-h-fit cursor-pointer hover:bg-marroon hover:bg-opacity-30 active:bg-opacity-60`}>
                <span className='mr-2 w-8 object-scale-down'></span>
                None
              </Listbox.Option>

              {
                animéCharacters.sort((a, b) => a > b ? 1 : -1).map(animéCharacter => (
                  <Listbox.Option key={animéCharacter} value={animéCharacter} className={`${animéCharacter == selectedAniméCharacter ? 'bg-marroon font-medium hover:bg-opacity-100 active:bg-opacity-100' : ''} flex flex-row items-center px-4 py-4 w-full min-h-fit cursor-pointer hover:bg-marroon hover:bg-opacity-30 active:bg-opacity-60`}>
                    <ImageComponent src={`/animecharacters/${animéCharacter}.png`} alt='' width={32} height={32} className='mr-2 w-8 object-scale-down' />
                    {animéCharacter}
                  </Listbox.Option>
                ))
              }
            </Listbox.Options>
          </Listbox>
        </div>

        <div className='inline-block float-right p-4 bg-zinc-800 bg-opacity-80 w-full xl:w-[45%]'>
          <h1 className='mb-4 text-center font-extrabold uppercase'>{dictionary.result}</h1>

          <svg width={1024} height={1024} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className='m-auto w-[85%] h-auto' id='chp'>
            {
              'rectangleColours' in bg ? (
                <>
                  {
                    bg.rectangleColours.map((colour, index) => (
                      <rect key={index} width={1024 * ('rectangleWidths' in bg ? bg.rectangleWidths[index] : 1)} height={1024 * ('rectangleHeights' in bg ? bg.rectangleHeights[index] : 1)} fill={colour} />
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

            {
              selectedAniméCharacter ? (
                <image href={`${location}animecharacters/${encodeURIComponent(selectedAniméCharacter)}.png`} width={1024} height={1024} />
              ) : (
                <></>
              )
            }
          </svg>

          <h1 className='mt-4 mb-2 text-center font-extrabold uppercase'>{dictionary.download}</h1>
          <div className='flex flex-row justify-evenly font-medium'>
            <button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800' onClick={downloadSVG}>SVG</button>
            <button className='px-6 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800' onClick={downloadPNG}>PNG</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
