/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopOver = ({vocaWord, dictionaryLookup, uniqueId}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
    const [typeOfWord, setTypeOfWord] = useState({});


  const toggle = () => setPopoverOpen(!popoverOpen);

  const fetchTypeOfWord = async() => {
        const foundWords = dictionaryLookup(vocaWord)
        await foundWords
        console.log(foundWords)
        await setTypeOfWord(foundWords)
        return console.log(foundWords)
      }

    useEffect(() => {
    fetchTypeOfWord();
  }, []);

    // setTimeout(function(){console.log(typeOfWord)}, 2000);

  return (
    <div>
      <Button id={"popover"+uniqueId} type="button">
        {vocaWord}
      </Button>
      <Popover placement="right" text="right" isOpen={popoverOpen} target={"popover"+uniqueId} toggle={toggle}>
        <PopoverHeader>{vocaWord}</PopoverHeader>
        <PopoverBody>{console.log(typeOfWord)}</PopoverBody>
      </Popover>
    </div>
  );
}

export default PopOver;