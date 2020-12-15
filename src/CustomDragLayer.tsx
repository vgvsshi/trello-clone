import React from "react"
import { XYCoord, useDragLayer } from "react-dnd"
import { Column } from "./Column"
import { CustomDragLayerContainer } from "./styles"
import { useAppState } from './AppStateContext'
import { Card } from "./Card"

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
	if (!currentOffset) {
		return {
			display: "none"
		}
	}
	const { x, y } = currentOffset
	const transform = `translate(${x}px, ${y}px)`
	return {
		transform,
		WebkitTransform: transform
	}
}

const CustomDragLayer: React.FC = () => {
	const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}))

	const { state } = useAppState()

	return isDragging && state.draggedItem ? (
		<CustomDragLayerContainer>
			<div style={getItemStyles(currentOffset)}>
				{
					state.draggedItem.type === 'COLUMN' ?
						<Column
							id={item.id}
							text={item.text}
							index={item.index}
							isPreview
						/>
						: state.draggedItem.type === 'CARD' ?
							<Card
								id={item.id}
								text={item.text}
								index={item.index}
								columnId={item.columnId}
								isPreview
							/> : (null)
				}
			</div>
		</CustomDragLayerContainer>
	) : null
}

export default CustomDragLayer