export const useDragNDrop = () => useState('drag-n-drop', () => ({
  draggingEl: null,
  isDragging: false,
  draggingOverColumn: null,
  draggedData: null,
  previousData: null,
}))
