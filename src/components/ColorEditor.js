import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { SketchPicker } from 'react-color'

import './ColorEditor.css';
const ColorEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
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
      <SketchPicker
        color={value}
        onChangeComplete={({hex}) => {
          if (hex) {
            setValue(hex);
          }
        }}
      />
    </div>
  );
});

export default ColorEditor;
