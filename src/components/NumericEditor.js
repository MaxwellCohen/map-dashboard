
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback} from 'react';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;
const KEY_ENTER = 13;
const KEY_TAB = 9;

const NumericEditor = forwardRef((props, ref) => {
  const createInitialState = () => {
      let startValue;
      let highlightAllOnFocus = true;

      if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
          // if backspace or delete pressed, we clear the cell
          startValue = '';
      } else if (props.charPress) {
          // if a letter was pressed, we start with the letter
          startValue = props.charPress;
          highlightAllOnFocus = false;
      } else {
          // otherwise we start with the current value
          startValue = props.value;
          if (props.keyPress === KEY_F2) {
              highlightAllOnFocus = false;
          }
      }

      return {
          value: startValue,
          highlightAllOnFocus
      }
  };

  const initialState = createInitialState();

  const [value, setValue] = useState(initialState.value);
  const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(initialState.highlightAllOnFocus);
  const refInput = useRef(null);

  const cancelBeforeStart = props.charPress && ('1234567890'.indexOf(props.charPress) < 0);

  const isLeftOrRight = event => {
      return [37, 39].indexOf(event.keyCode) > -1;
  };

  const getCharCodeFromEvent = event => {
      event = event || window.event;
      return (typeof event.which === "undefined") ? event.keyCode : event.which;
  };

  const isCharNumeric = charStr => {
      return !!/\d/.test(charStr);
  };

  const isKeyPressedNumeric = event => {
      const charCode = getCharCodeFromEvent(event);
      const charStr = event.key ? event.key : String.fromCharCode(charCode);
      return isCharNumeric(charStr);
  };

  const deleteOrBackspace = event => {
      return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  };

  const finishedEditingPressed = event => {
      const charCode = getCharCodeFromEvent(event);
      return charCode === KEY_ENTER || charCode === KEY_TAB;
  };
  const onKeyDown = useCallback (event => {
      if (isLeftOrRight(event) || deleteOrBackspace(event)) {
          event.stopPropagation();
          return;
      }

      if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
          if (event.preventDefault) event.preventDefault();
      }
  },[]);

  useEffect(() => {
      window.addEventListener('keydown', onKeyDown);

      return () => {
          window.removeEventListener('keydown', onKeyDown);
      };
  }, [onKeyDown]);

  useImperativeHandle(ref, () => {
      return {
          afterGuiAttached() {
              // get ref from React component
              const eInput = refInput.current;
              eInput.focus();
              if (highlightAllOnFocus) {
                  eInput.select();

                  setHighlightAllOnFocus(false);
              } else {
                  // when we started editing, we want the carot at the end, not the start.
                  // comes into play in two scenarios: a) when user hits F2 and b)
                  // when user hits a printable character, then on IE (and only IE) the carot
                  // was placed after the first character, thus 'apply' would end up as 'pplea'
                  const length = eInput.value ? eInput.value.length : 0;
                  if (length > 0) {
                      eInput.setSelectionRange(length, length);
                  }
              }
          },

          getValue() {
              return value;
          },

          isCancelBeforeStart() {
              return cancelBeforeStart;
          },

          // will reject the number if it greater than 1,000,000
          // not very practical, but demonstrates the method.
          isCancelAfterEnd() {
              return value > 1000000;
          }
      }
  });

  return (
      <input ref={refInput}
             value={value}
             onChange={event => setValue(event.target.value)}
             style={{width: "100%"}}
      />
  );
});

export default NumericEditor;