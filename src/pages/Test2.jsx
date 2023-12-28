// import { Button } from '@chakra-ui/react';
// import React from 'react';
// import { TextAnnotator, TokenAnnotator } from 'react-text-annotate';
// export default function Test() {
//   // token annotator code
//   // let TEXT = "My text needs annotating for NLP training";
//   let TEXT =
//     'I want to order a pizza with cheese and tomato topping and coke to drink';

//   const testEntities = [
//     {
//       start: 18,
//       end: 23,
//       value: 'pizza',
//       entity: 'FOOD',
//     },
//     {
//       start: 29,
//       end: 35,
//       value: 'cheese',
//       entity: 'TOPPING',
//     },
//     {
//       start: 40,
//       end: 46,
//       value: 'tomato',
//       entity: 'TOPPING',
//     },
//     {
//       start: 59,
//       end: 63,
//       value: 'coke',
//       entity: 'DRINK',
//     },
//   ];
//   const [value, setValue] = React.useState(testEntities);

//   const entities = [
//     {
//       name: 'FOOD',
//       value: ['pizza', 'burger', 'pasta', 'sandwich'],
//     },
//     {
//       name: 'DRINK',
//       value: ['coke', 'pepsi', 'sprite', 'fanta'],
//     },
//     {
//       name: 'TOPPING',
//       value: ['cheese', 'tomato', 'onion', 'jalapeno', 'mushroom', 'olive'],
//     },
//     {
//       name: 'SIZE',
//       value: ['small', 'medium', 'large'],
//     },
//   ];

//   const selectionHandler = () => {
//     console.log('Line 37', value);
//     const words = TEXT.split(' ');
//     // check for the occurence of the selected text in the saved entities inside the TEXT and highlight it and change the start, end and text properties, and the tag property to the name of the entity of the same color for all the tags recursilvely
//     let newValue = words.map(word => {
//       let item = {
//         start: TEXT.indexOf(word),
//         end: TEXT.indexOf(word) + word.length,
//         value: word,
//       };

//       // check for the occurence of the selected text in the saved entities inside the TEXT and highlight it and change the start, end and text properties, and the tag property to the name of the entity of the same color for all the tags recursilvely
//       entities.forEach(entity => {
//         entity.value.forEach(value => {
//           if (word === value) {
//             item = {
//               ...item,
//               entity: entity.name,
//               // role: "primary",
//               // group: "1",
//               // color: "red",
//             };
//           }
//         });
//       });

//       return item;
//     });

//     // remove the items that doesnt have the tag property
//     newValue = newValue.filter(item => item.entity);

//     setValue(newValue);
//   };
//   // function to capture the entire word of the selected text and change the start, end and text properties
//   const changeHandler = value => {
//     let newValue = value.map(item => {
//       let word = TEXT.substring(item.start, item.end);
//       //  include the characters before and after the selected text till a space is encountered
//       while (item.start > 0 && TEXT[item.start - 1] !== ' ') {
//         item.start -= 1;
//         word = TEXT.substring(item.start, item.end);
//       }
//       while (item.end < TEXT.length && TEXT[item.end] !== ' ') {
//         item.end += 1;
//         word = TEXT.substring(item.start, item.end);
//       }

//       return { ...item, value: word, start: item.start, end: item.end };
//     });
//     setValue(newValue);
//   };
//   return (
//     <>
//       <TextAnnotator
//         value={value}
//         onChange={changeHandler}
//         getSpan={span => ({
//           start: span.start,
//           end: span.end,
//           // tag: span.tag?.toUpperCase(),
//           // color: "red",
//         })}
//         // tokens={TEXT.split(" ")}
//         content={TEXT}
//       />
//       <Button onClick={selectionHandler}>Transform Data</Button>
//       <pre>{JSON.stringify(value, null, 2)}</pre>
//     </>
//   );
// }
