/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopOver = ({vocaWord, dictionaryLookup}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
//   const typeOf = dictionaryLookup(vocaWord)

  return (
    <div>
      <Button id="popover" type="button">
        {vocaWord}
      </Button>
      <Popover placement="right" isOpen={popoverOpen} target="popover" toggle={toggle}>
        <PopoverHeader>{vocaWord}</PopoverHeader>
        <PopoverBody>HI</PopoverBody>
      </Popover>
    </div>
  );
}

export default PopOver;