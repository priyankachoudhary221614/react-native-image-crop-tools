import React, { createRef } from 'react';
import { findNodeHandle, requireNativeComponent, UIManager, } from 'react-native';
const RCTCropView = requireNativeComponent('CropView');
class CropView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.viewRef = createRef();
        this.saveImage = (preserveTransparency = true, quality = 90) => {
            UIManager.dispatchViewManagerCommand(findNodeHandle(this.viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.saveImage, [preserveTransparency, quality]);
        };
        this.rotateImage = (clockwise = true) => {
            UIManager.dispatchViewManagerCommand(findNodeHandle(this.viewRef.current), UIManager.getViewManagerConfig('CropView').Commands.rotateImage, [clockwise]);
        };
    }
    render() {
        const { sourceUrl, style, onImageCrop, keepAspectRatio, aspectRatio } = this.props;
        return (React.createElement(RCTCropView, { ref: this.viewRef, sourceUrl: sourceUrl, style: style, onImageSaved: (event) => {
                onImageCrop(event.nativeEvent);
            }, keepAspectRatio: keepAspectRatio, cropAspectRatio: aspectRatio }));
    }
}
CropView.defaultProps = {
    keepAspectRatio: false,
};
export default CropView;
