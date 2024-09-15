import { AdjustStateElement } from "./states/adjust-state";
import { CanvasStateElement } from "./states/canvas-state";
import { CropStateElement } from "./states/crop-state";
import { FilterStateElement } from "./states/filter-state";
import { ResizeStateElement } from "./states/resize-state";
import { RotateFlipStateElement } from "./states/rotate-flip-state";

const EditorStates = {
    CROP: CropStateElement,
    RESIZE: ResizeStateElement,
    ADJUST: AdjustStateElement,
    FILTER: FilterStateElement,
    ROTATE_FLIP: RotateFlipStateElement,
    CANVAS: CanvasStateElement
}

export default EditorStates