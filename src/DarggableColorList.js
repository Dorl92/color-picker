import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc'

const DraggableColorList = SortableContainer((props) => {
    const { colors, removeColorBox } = props;
    return (
        <div style={{height: "100%"}}>
            {colors.map((color,i) => (
                <DraggableColorBox
                    key={color.name}
                    index={i}
                    color={color.color}
                    name={color.name}
                    removeColorBox={() => removeColorBox(color.name)} />
            ))}
        </div>
    );
});

export default DraggableColorList;