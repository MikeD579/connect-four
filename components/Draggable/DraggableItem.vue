<template>
    <div class="draggable-item" ref="draggedItem" @mousedown="watchDrag">
        <slot class="draggable__item" />
    </div>
</template>

<script setup>
const drag = useDragNDrop();

const draggedItem = ref(null);

const movableObj = ref(null);

const dragOffset = ref({ x: 0, y: 0 });

const { contentData } = defineProps();

const emit = defineEmits();

watch(dragOffset, (val) => {
    if (movableObj.value === null) return;

    movableObj.value.style.left = val.x + 'px';
    movableObj.value.style.top = val.y + 'px';
})

const cloneEl = () => {
    if (draggedItem.value === null || movableObj.value !== null) return;

    const el = draggedItem.value.cloneNode(true);
    const rect = draggedItem.value.getBoundingClientRect();

    el.style.position = 'fixed';
    el.style.userSelect = 'none';
    el.style.pointerEvents = 'none';
    el.style.left = rect.x + 'px';
    el.style.top = rect.y + 'px';
    el.style.width = rect.width + 'px';
    el.style.width = rect.height + 'px';
    el.style.zIndex = '1000';

    document.body.style.cursor = 'grabbing';

    movableObj.value = el;

    dragOffset.value = {
        x: rect.x,
        y: rect.y,
    }

    window.addEventListener('mousemove', setDragOffset);
    document.body.appendChild(movableObj.value);
}

const setDragOffset = (event) => {
    if (movableObj.value === null) return;
    dragOffset.value = {
        x: event.clientX - movableObj.value.clientWidth / 2,
        y: event.clientY - movableObj.value.clientHeight / 2,
    }
}

const onDragEnd = (event) => {
    drag.value.isDragging = false;
    window.removeEventListener('mousemove', setDragOffset);
    window.removeEventListener('mouseup', onDragEnd);
    document.body.removeChild(movableObj.value);
    movableObj.value = null;
    document.body.style.cursor = 'initial';
    // draggedItem.value.style.opacity = '1';
    emit('drop');
}

const onDragStart = (event) => {
    if (draggedItem.value !== null && !drag.value.isDragging) {
        drag.value.isDragging = true;
        drag.value.draggedData = contentData;
        // draggedItem.value.style.opacity = '0.9';
        cloneEl();
        window.addEventListener('mouseup', onDragEnd)
    }
}

const originalPointerPosition = ref({ x: 0, y: 0 });

const watchDrag = (event) => {
    originalPointerPosition.value = {
        x: event.clientX,
        y: event.clientY,
    }

    const watchPointer = (e) => {
        if (Math.abs(e.clientX - originalPointerPosition.value.x) > 10 || Math.abs(e.clientY - originalPointerPosition.value.y) > 10) {
            window.removeEventListener('mousemove', watchPointer);
            onDragStart(e);
        }
    }

    window.addEventListener('mousemove', watchPointer);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', watchPointer);
    });
}
</script>

<style>
.draggable-item {
    user-select: none;
}
</style>