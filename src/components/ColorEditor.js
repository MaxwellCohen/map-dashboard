import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import ReactColorPicker from '@super-effective/react-color-picker';
import './ColorEditor.css';
const ColorEditor = forwardRef((props, ref) => {
  console.log(props, ref);
  const createInitialState = () => {
    let startValue;
    let highlightAllOnFocus = true;
    startValue = props.value;
    return {
      value: startValue,
      highlightAllOnFocus,
    };
  };

  const initialState = createInitialState();

  const [value, setValue] = useState(initialState.value);

  const refInput = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
      isPopup() {
        return true;
      },
    };
  });

  return (
    <div ref={refInput} style={{ padding: '10px' }}>
      <ReactColorPicker
        color={initialState.value}
        name='color'
        value={value}
        showHex
        onChange={(color) => {
          setValue(color);
        }}
      />
    </div>
  );
});

export default ColorEditor;
