import { launchCamera } from 'react-native-image-picker';

const openCamera = async () => {
    const cameraImage = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
    });
    return cameraImage.assets[0].base64;
}

export default openCamera;