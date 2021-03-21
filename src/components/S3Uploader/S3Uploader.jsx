import { useDispatch, useSelector } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

// Photo uploader that handles the drag-and-drop to upload a user supplied
// photo or video to AWS S3
function S3Uploader({ picOrVideo }) {
  const { user_type } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleFinishedUpload = (info) => {
    console.log('Access it on s3 at', info.fileUrl);
    const whichType =
      user_type === 'client'
        ? 'SET_CLIENT_PERSONAL_DETAILS'
        : 'SET_PROVIDER_PERSONAL_DETAILS';
    dispatch({
      type: whichType,
      payload: { key: picOrVideo, value: info.fileUrl },
    });
  };

  const s3Url = 'https://burkbucket.s3.amazonaws.com';
  return (
    <DropzoneS3Uploader
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      maxSize={1024 * 1024 * 5}
      upload={{}}
    />
  );
}

export default S3Uploader;
