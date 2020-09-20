/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopOver = ({vocaWord, dictionaryLookup, uniqueId}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
    const [typeOfWord, setTypeOfWord] = useState({});


  const toggle = () => setPopoverOpen(!popoverOpen);

  const fetchTypeOfWord = async() => await dictionaryLookup(vocaWord)

    useEffect(() => {
    fetchTypeOfWord().then(foundWords => setTypeOfWord(foundWords));
  }, []);

  return (
    <div>
      <Button id={"popover"+uniqueId} type="button">
        {vocaWord}
      </Button>
      <Popover placement="right" text="right" isOpen={popoverOpen} target={"popover"+uniqueId} toggle={toggle}>
        <PopoverHeader>{vocaWord}</PopoverHeader>
        <PopoverBody>{typeOfWord && typeOfWord.length > 0 && typeOfWord.map((item, i) => <li key={i}>{item}</li>)}</PopoverBody>
      </Popover>
    </div>
  );
}

export default PopOver;