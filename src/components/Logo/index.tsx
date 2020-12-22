/* eslint-disable max-len */
import React from 'react'
import Style from './styles'

//  

export const Logo: React.FC = () => {
  // const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style>
      <svg xmlns='http://www.w3.org/2000/svg' width='66' height='72' fill='none' id='logo'>
        <g id='brown' stroke='#80535D' strokeWidth='3'>
          <path d='M64.5 48.55a9.72 9.72 0 11-19.45.01 9.72 9.72 0 0119.45-.01z' />
          <path d='M64.5 23.45a9.72 9.72 0 11-19.45 0 9.72 9.72 0 0119.45 0z' />
          <path d='M42.72 11.23a9.72 9.72 0 11-19.45 0 9.72 9.72 0 0119.45 0z' />
          <path d='M20.94 23.45a9.72 9.72 0 11-19.45 0 9.72 9.72 0 0119.45 0z' />
          <path d='M20.94 48.55a9.72 9.72 0 11-19.45.01 9.72 9.72 0 0119.45-.01z' />
          <path d='M42.72 60.77a9.72 9.72 0 11-19.45.01 9.72 9.72 0 0119.45 0z' />
        </g>

        <g id='pink' fill='#FF597D'>
          <path d='M32.22 41.98a2.6 2.6 0 10-5.2-.02 2.6 2.6 0 005.2.02z' />
          <path d='M38.96 41.97a2.6 2.6 0 10-5.18-.02 2.6 2.6 0 005.18.02z' />
          <path d='M42.33 36.16a2.6 2.6 0 10-5.18-.03 2.6 2.6 0 005.18.03z' />
          <path d='M28.85 36.16a2.6 2.6 0 10-5.18-.03 2.6 2.6 0 005.18.03z' />
          <path d='M32.22 30.35a2.6 2.6 0 10-5.19-.03 2.6 2.6 0 005.2.03z' />
          <path d='M38.96 30.35a2.6 2.6 0 10-5.18-.02 2.6 2.6 0 005.18.02z' />
        </g>
      </svg>

      <svg xmlns='http://www.w3.org/2000/svg' width='159' height='33' fill='none' id='text'>
        <g fill='#D65881'>
          <path d='M14.54 10.32c-.02-.07.05-.24.21-.52.16-.3.34-.65.53-1.06.2-.44.4-.92.6-1.44a7.1 7.1 0 00.42-3.4 3.71 3.71 0 00-.74-1.65c-.24-.27-.59-.42-1.06-.44a3.9 3.9 0 00-1.54.2c-.56.16-1.16.43-1.8.8a8.8 8.8 0 00-3.01 2.77 3.91 3.91 0 00-.6 1.75c-.04.48-.03.93.04 1.34a7.2 7.2 0 00.8 2.1l.46.78c.19.32.48.68.88 1.07s.83.83 1.3 1.34c.47.48.94 1.02 1.4 1.64.47.62.88 1.32 1.23 2.1.35.77.6 1.64.74 2.6a14.24 14.24 0 01-1.26 7.41 10.38 10.38 0 01-1.87 2.75 6.34 6.34 0 01-2 1.48 7.9 7.9 0 01-1.68.61 13 13 0 01-1.27.18c-.46.06-.97.05-1.5-.04a5.43 5.43 0 01-1.59-.48 3.83 3.83 0 01-1.44-1.1 7.73 7.73 0 01-1.72-3.84 4.6 4.6 0 01.18-2.3 4.44 4.44 0 011.23-.96c.23-.14.48-.26.74-.38l.9-.24a4.6 4.6 0 011.66.04c-.35.39-.6.75-.74 1.1-.1.18-.16.34-.2.47a6.16 6.16 0 00.28 3.3c.23.57.55 1.05.98 1.44.42.41.98.63 1.68.65 1.7.05 3.16-1.26 4.35-3.91.4-.82.6-1.66.6-2.5a9.35 9.35 0 00-1.2-4.6 11 11 0 00-1.08-1.75c-.38-.48-.83-1-1.37-1.55a33.1 33.1 0 01-1.55-1.85c-.51-.66-.98-1.38-1.4-2.16a8.3 8.3 0 01-.8-2.54 6.67 6.67 0 01.34-3.5 9.63 9.63 0 014.18-4.77c.9-.5 1.68-.82 2.35-.96 3.77-.73 6.24-.12 7.41 1.85.5.76.76 1.56.81 2.4.05.85-.01 1.64-.18 2.37a8.03 8.03 0 01-.98 2.6c-.14.15-.36.3-.67.45a5.91 5.91 0 01-2.03.52c-.17 0-.34-.01-.53-.04a1.54 1.54 0 01-.49-.13z' />
          <path d='M31.67 17.39c.1-.14.21-.22.35-.24.17-.05.3-.04.4.03.08.07.13.18.13.34.02.16-.03.38-.17.66a31.75 31.75 0 01-4.25 5.66c-.85.87-1.66 1.59-2.46 2.16-.8.57-1.46.86-2 .86-.77 0-1.42-.15-1.93-.45-.52-.3-.93-.66-1.23-1.1a4.42 4.42 0 01-.7-2.84c.02-.37.1-1.02.24-1.96.14-.96.33-2.06.56-3.3l.78-4.01a125 125 0 01.94-4.15l-1.19.14a9.6 9.6 0 01-3.2-.18 9.04 9.04 0 01-1.5-.51c-.2-.1-.27-.22-.25-.38.02-.18.1-.35.21-.51.12-.19.27-.33.46-.45.16-.14.31-.2.45-.2l1.44.13a20.66 20.66 0 004.18-.27c.3-1.1.6-2.05.88-2.85.3-.82.57-1.4.8-1.72.08-.11.23-.2.46-.27.26-.1.53-.15.81-.17.28-.05.55-.05.8 0 .27.02.45.1.57.24.12.18.16.65.14 1.4A18.1 18.1 0 0127 6.34c.99 0 1.85.05 2.6.17a15.47 15.47 0 014 .96c.17.05.25.16.25.34.02.19-.01.38-.1.59-.08.18-.2.34-.4.48-.18.13-.39.18-.62.13-.24-.02-.5-.06-.81-.13a8.34 8.34 0 00-1.05-.18c-.4-.04-.88-.09-1.44-.13-.57-.05-1.22-.07-1.97-.07l-.5.03h-.52l-.28 1.1c-.07.34-.17.71-.31 1.1a95.37 95.37 0 01-2.32 6.21c-.5 1.21-1.04 2.5-1.65 3.88-.14.98-.13 1.74.03 2.26.19.5.41.87.67 1.1.3.25.68.39 1.12.41.35.05.78-.07 1.27-.34.51-.3 1.04-.69 1.58-1.17a26 26 0 001.61-1.58c.56-.57 1.08-1.13 1.55-1.68a73.01 73.01 0 001.96-2.43z' />
          <path d='M45.47 18.93c-.7 1-1.5 2-2.39 2.95-.89.94-1.83 1.79-2.84 2.54-.98.73-2 1.33-3.05 1.79a7.4 7.4 0 01-3.02.68c-.52 0-1.08-.12-1.69-.38a4.6 4.6 0 01-1.61-1.1 5.6 5.6 0 01-1.2-1.95 6.75 6.75 0 01-.24-2.92c.09-.93.38-1.92.87-2.95a14.25 14.25 0 011.86-2.88 11 11 0 012.5-2.16 5.35 5.35 0 012.8-.86c.9 0 1.54.22 1.94.65.4.44.57.97.52 1.62-.07.7-.28 1.36-.63 1.95-.33.6-.72 1.13-1.2 1.61-.46.48-.96.92-1.5 1.3-.52.4-1 .75-1.48 1.07a143.74 143.74 0 00-2.7 1.82c.02.57.13 1.05.32 1.44.18.4.42.71.7.96.28.23.6.4.95.52.37.09.75.13 1.12.13.8 0 1.63-.24 2.5-.72.86-.5 1.7-1.1 2.52-1.78a45.67 45.67 0 004.1-4.15c.17-.19.34-.29.5-.31.19-.05.33-.02.42.07.12.07.18.2.18.4s-.08.4-.25.66zm-8.99-5.28c-.28 0-.62.13-1.01.4-.38.28-.75.68-1.13 1.2a10.56 10.56 0 00-1.8 4.43l.92-.61.99-.72c1-.76 1.7-1.42 2.1-2 .4-.56.62-1.06.67-1.47.05-.43 0-.74-.14-.92a.68.68 0 00-.6-.31z' />
          <path d='M60.96 19.24l-1.27 1.72c-.51.66-1.05 1.33-1.61 2.02-.54.66-1.08 1.28-1.62 1.85-.51.55-.95.94-1.3 1.17a4.33 4.33 0 01-1.76.51c-.3.03-.59 0-.87-.06a1.89 1.89 0 01-.74-.28 1.81 1.81 0 01-.53-.69 6.9 6.9 0 01-.35-.99c-.09-.41-.13-.93-.1-1.54a7.45 7.45 0 01-3.8 3.19c-.7.25-1.4.4-2.1.44-.33 0-.68-.11-1.05-.34-.38-.2-.7-.54-.95-1a4.82 4.82 0 01-.5-1.81c-.06-.76.03-1.65.29-2.68.33-1.4.84-2.67 1.54-3.8a15.3 15.3 0 012.36-2.93c.84-.82 1.67-1.44 2.49-1.85.82-.41 1.5-.6 2.03-.55.64.12 1.15.3 1.55.55.33.23.54.57.63 1.03.12.43-.07 1.02-.56 1.75a8.68 8.68 0 011.33-.17c.14 0 .24.01.28.03.03.05.04.15.04.31 0 .14-.04.4-.1.8l-.32 1.57a268.42 268.42 0 01-.8 3.67l-.11.58-.18.86c-.02.2-.04.44-.04.69.03.23.07.44.15.65.07.2.17.38.31.52.17.11.39.17.67.17.23 0 .54-.14.91-.41.38-.3.77-.67 1.2-1.1a46.5 46.5 0 002.6-3.06l1.05-1.33.7-.86c.19-.2.37-.32.56-.35.19-.04.33 0 .42.14.1.14.1.34.04.62-.05.27-.21.6-.5.96zm-10.3 1.51l.43-1.61a32.03 32.03 0 00.67-3.2c.07-.38.05-.57-.04-.54-.12.02-.24.05-.38.1-.12.05-.27.08-.46.1l-.56.1a2.71 2.71 0 00.35-1.47.8.8 0 00-.14-.38c-.26-.2-.72-.03-1.37.52-.63.52-1.37 1.5-2.21 2.95a8.9 8.9 0 00-.85 1.92c-.2.66-.36 1.3-.45 1.89-.07.6-.08 1.12-.04 1.58.05.43.14.72.28.85.26.26.55.38.88.38.33-.02.66-.11.98-.27.35-.19.7-.42 1.02-.69.35-.27.66-.56.91-.86a6 6 0 00.99-1.37z' />
          <path d='M74.96 24.49c0-.48.05-1.03.14-1.65a115.75 115.75 0 01.91-3.8l.43-1.65c.14-.6.13-1.06-.04-1.38-.16-.32-.44-.48-.84-.48-.19 0-.56.16-1.12.48-.54.32-1.14.88-1.8 1.69-.63.77-1.26 1.84-1.89 3.19a20.68 20.68 0 00-1.44 5.08c-.44.22-.86.37-1.26.44-.21.05-.4.08-.56.1-.47.03-.78-.05-.92-.24-.14-.16-.11-.57.07-1.23.1-.32.26-.84.5-1.55a33.92 33.92 0 001.33-4.8c.19-.85.28-1.58.28-2.2 0-.43-.08-.73-.25-.89-.14-.16-.35-.24-.63-.24a3 3 0 00-1.05.35c-.5.22-1.04.67-1.65 1.33-.61.67-1.22 1.6-1.83 2.78a20.24 20.24 0 00-1.5 4.57v-.07l-.15.55c-.04.16-.08.33-.1.51l-.1.52-1.76.75c-.12.05-.27.08-.46.1a.77.77 0 01-.5-.1c-.13-.07-.24-.23-.3-.48-.08-.25-.05-.63.06-1.13l2.21-8.96.18-.86c.05-.25.07-.49.07-.72a1.7 1.7 0 00-.03-.61 8.3 8.3 0 012.38-.72c.75 0 1 .63.74 1.88l-.42 1.62a17.98 17.98 0 012.95-2.89c.51-.39 1.03-.7 1.54-.92a4.02 4.02 0 011.58-.35c.4 0 .73.12.99.35.28.23.49.53.63.92.16.37.26.82.28 1.34.02.5 0 1.03-.07 1.58.37-.48.78-.96 1.23-1.44.47-.5.95-.95 1.44-1.34.51-.39 1.04-.7 1.58-.96a3.79 3.79 0 011.61-.38c.63 0 1.11.19 1.44.55.35.37.59.84.7 1.4.14.58.18 1.2.1 1.86-.04.66-.13 1.3-.27 1.92l-1.2 4.64c-.25 1.14 0 1.71.74 1.71.59 0 1.23-.27 1.93-.82.7-.55 1.38-1.2 2.04-1.96a29.7 29.7 0 001.9-2.33 41.6 41.6 0 011.47-1.92c.14-.16.28-.25.42-.28.16-.02.3.01.39.1.11.07.17.2.17.38.03.19-.03.41-.17.69-.47.8-1.04 1.7-1.72 2.68-.68.96-1.43 1.86-2.25 2.7-.8.85-1.65 1.56-2.56 2.13a5.28 5.28 0 01-3.83.76 2.13 2.13 0 01-1.51-1.1 2.62 2.62 0 01-.25-1.2z' />
          <path d='M89.36 24.9c.14.1.32.14.53.14a2.2 2.2 0 001.3-.51c.2-.17.36-.37.45-.62a2 2 0 000-1.07 23.75 23.75 0 00-1.09-3.16 27.65 27.65 0 01-.95-2.46c-.09-.26-.18-.5-.28-.73a3.17 3.17 0 00-.17-.51l-.63.9a87.27 87.27 0 01-1.9 2.54l-.63.75c-.19.2-.38.33-.56.37a.54.54 0 01-.42-.1.73.73 0 01-.22-.45c0-.2.1-.44.29-.72l.63-.85.84-1.24c.28-.43.54-.81.77-1.13.24-.34.37-.55.39-.62.05-.18-.02-.42-.21-.72-.17-.3-.19-.64-.07-1.03.1-.32.3-.69.63-1.1.33-.43.71-.82 1.16-1.16.44-.35.9-.6 1.37-.76.47-.18.89-.18 1.26 0 .3.18.55.39.74.62.19.2.26.42.21.65a6.1 6.1 0 01-.63 1.13l-.8 1a11.3 11.3 0 001.11 3.64l.67 1.27a16.62 16.62 0 011.09 2.47c.12.36.15.67.1.92-.07.4-.28.86-.63 1.4a8.7 8.7 0 01-1.26 1.62c-.5.5-1.07.94-1.72 1.3-.63.37-1.3.56-2 .56-.5 0-.97-.15-1.44-.45a5.5 5.5 0 01-1.16-1.03c-.3-.41-.54-.81-.7-1.2-.14-.39-.16-.69-.04-.9a3.62 3.62 0 011.26-1.44c.12-.06.29-.13.5-.2l.73-.24a17.42 17.42 0 001.1 2.6c.13.26.26.43.38.52zM112.92 14.4c-1.2 0-2.17-.12-2.92-.38-.72-.25-1.21-.57-1.47-.96a2.4 2.4 0 01-.32-.72c-.09-.32-.05-.67.1-1.06a3.94 3.94 0 002.15.82c.4.07.78.1 1.16.1.7 0 1.38-.05 2.03-.17a15 15 0 002-.48l.81-3.7c.29-1.1.6-2 .95-2.68.38-.75.76-1.43 1.16-2.02.42-.62.88-1.14 1.37-1.55a5.73 5.73 0 011.69-1c.6-.22 1.3-.34 2.1-.34.59 0 1.04.12 1.37.35.35.23.61.51.77.85.2.35.3.73.32 1.14a6.42 6.42 0 01-.5 3.57c-.37.89-.9 1.77-1.57 2.64-.68.87-1.5 1.7-2.46 2.47-.94.78-1.99 1.42-3.16 1.92l-1.2 4.5a32.25 32.25 0 01-1.12 3.63c-.32.9-.75 1.89-1.26 2.99a17.9 17.9 0 01-1.83 3.16c.45.27.9.56 1.34.85a14.47 14.47 0 002.8 1.41c.5.16 1.01.24 1.55.24a8 8 0 001.65-.24 6.38 6.38 0 002.92-1.68c.16.27.2.68.14 1.23a4.5 4.5 0 01-1.83 3.09c-.56.41-1.26.62-2.1.62a8 8 0 01-2.5-.38c-.77-.23-1.5-.51-2.18-.86a17.7 17.7 0 01-1.93-1.13 1999 1999 0 01-1.65-1.1c-.7.67-1.47 1.2-2.31 1.62-.85.4-1.78.61-2.81.61-.82 0-1.48-.22-1.97-.68a2.07 2.07 0 01-.67-1.79c.03-.27.1-.6.25-1 .14-.36.4-.71.8-1.05.38-.35.9-.65 1.59-.9a8.4 8.4 0 013.75-.24l1.1.31c.25-.46.5-.98.77-1.58l.84-2.02c.54-1.44 1-2.88 1.4-4.33.4-1.46.74-2.88 1.02-4.25-.33.07-.68.11-1.05.14-.36.02-.72.03-1.1.03zm-5.83 15.51c.3-.11.66-.23 1.05-.34.4-.12.86-.44 1.37-.96a2.85 2.85 0 00-.8-.17c-.85 0-1.46.11-1.83.34-.4.25-.6.5-.6.72 0 .16.07.27.21.34.14.1.34.12.6.07zm13.27-23.88a65.69 65.69 0 00-1.05 3.8c1.26-.8 2.27-1.7 3.02-2.74A5.13 5.13 0 00123.49 4c0-.61-.2-.92-.57-.92-.32 0-.75.25-1.26.75a5.5 5.5 0 00-1.3 2.2z' />
          <path d='M142.83 19.24l-1.26 1.72-1.62 2.02c-.54.66-1.07 1.28-1.61 1.85-.52.55-.95.94-1.3 1.17a4.32 4.32 0 01-1.76.51c-.3.03-.6 0-.88-.06a1.9 1.9 0 01-.73-.28 1.81 1.81 0 01-.53-.69 6.9 6.9 0 01-.35-.99c-.1-.41-.13-.93-.1-1.54a7.45 7.45 0 01-3.8 3.19c-.7.25-1.4.4-2.1.44-.33 0-.68-.11-1.06-.34-.37-.2-.69-.54-.95-1a4.82 4.82 0 01-.49-1.81c-.07-.76.03-1.65.28-2.68.33-1.4.85-2.67 1.55-3.8a15.3 15.3 0 012.35-2.93c.84-.82 1.68-1.44 2.5-1.85.81-.41 1.5-.6 2.03-.55.63.12 1.15.3 1.55.55.32.23.53.57.63 1.03.11.43-.07 1.02-.56 1.75a8.69 8.69 0 011.33-.17c.14 0 .23.01.28.03.03.05.04.15.04.31 0 .14-.04.4-.1.8l-.32 1.57a289.39 289.39 0 01-.81 3.67l-.1.58c-.06.23-.11.52-.18.86-.03.2-.04.44-.04.69.03.23.07.44.14.65.07.2.18.38.32.52.16.11.38.17.66.17.24 0 .54-.14.92-.41.37-.3.77-.67 1.2-1.1a47.14 47.14 0 002.59-3.06l1.05-1.33.7-.86c.2-.2.38-.32.57-.35.18-.04.32 0 .42.14.1.14.1.34.03.62-.04.27-.2.6-.49.96zm-10.29 1.51l.43-1.61a31.76 31.76 0 00.66-3.2c.07-.38.06-.57-.03-.54a3.3 3.3 0 00-.39.1c-.12.05-.27.08-.46.1a4.9 4.9 0 00-.56.1 2.68 2.68 0 00.35-1.47.81.81 0 00-.14-.38c-.25-.2-.71-.03-1.37.52-.63.52-1.36 1.5-2.2 2.95-.36.6-.64 1.23-.85 1.92-.21.66-.36 1.3-.46 1.89-.07.6-.08 1.12-.03 1.58.05.43.14.72.28.85.26.26.55.38.88.38.32-.02.65-.11.98-.27.35-.19.7-.42 1.02-.69.35-.27.65-.56.91-.86a6.02 6.02 0 00.98-1.37z' />
          <path d='M148.52 6.4a46.04 46.04 0 01-1.2 3.95 50.4 50.4 0 01-2.7 6.45c-.44.9-.84 1.67-1.2 2.34a11.21 11.21 0 000 3.98c.24 1 .7 1.5 1.38 1.5.56 0 1.11-.24 1.65-.75a7.92 7.92 0 001.44-1.85 13.25 13.25 0 001.61-4.6c-.44-.11-.82-.3-1.12-.58-.3-.3-.46-.69-.46-1.17 0-.32.1-.62.28-.9a3 3 0 012.36-1.4c.4 0 .73.25 1.01.76.28.48.47 1.1.57 1.85.93-.02 1.92-.16 2.95-.41 1.03-.25 2-.57 2.9-.96.27-.12.48-.15.64-.1.16.04.27.13.32.27.07.14.07.3 0 .48a.76.76 0 01-.42.38 16.38 16.38 0 01-4.99 1.78c-.51.1-.98.14-1.4.14-.1.91-.39 1.9-.88 2.98a15.83 15.83 0 01-1.8 2.95c-.7.9-1.48 1.64-2.34 2.24a4.32 4.32 0 01-3.52.78c-.42-.06-.83-.3-1.22-.72a4.96 4.96 0 01-1.02-1.95c-.28-.92-.4-2.21-.35-3.88.02-1.12.15-2.31.38-3.57a54.37 54.37 0 014.15-13c.32-.64.57-1.06.73-1.24.21-.25.46-.43.74-.55.28-.14.55-.23.8-.27.29-.07.55-.1.78-.07.23.02.4.06.5.1.13.1.17.6.1 1.51-.05.92-.27 2.1-.67 3.54z' />
        </g>
      </svg>
    </Style>
  )
}

export default Logo
