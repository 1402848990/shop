import React, { forwardRef, useCallback, useMemo } from 'react';
import _last from 'lodash/last';
import { Upload, message, Button } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { OSS_CONFIG } from 'config/index';
import OSS from 'ali-oss';

const client = new OSS(OSS_CONFIG);

// 允许上传的默认文件类型
const DEFAULT_ACCEPTS = [
  '.jpg',
  '.jpeg',
  'image/jpeg',
  '.png',
  'image/png',
  '.bmp',
  'image/bmp',
  '.pdf',
  'application/pdf',
  '.doc',
  'application/msword',
  '.docx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls',
  'application/vnd.ms-excel',
  '.xlsx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.rar',
];
const DEFAULT_ACCEPT_SUFFIX = DEFAULT_ACCEPTS.filter(a => /^\./.test(a))
  .map(a => a.replace('.', ''))
  .join('/');

const FilesUpload = forwardRef((props, ref) => {
  const {
    fileList,
    accept,
    maxSize,
    maxCount,
    multiple,
    listType = 'picture-card',
    onChange,
  } = props;


  // const fileList = useMemo(() => {
  //   return value?.map(v => v) || [];
  // }, [value]);

  const handleChange = useCallback(
    (info) => {
      console.log('info', info);
      const { file, fileList: _fileList } = info;
      // const {name,response,type} = file
      console.log('_fileList', _fileList);
      onChange(_fileList);
    },
    [onChange]
  );

  const beforeUpload = useCallback(
    (file) => {
      // 默认为0，不限
      const size = Number(maxSize);
      if (!size || Number.isNaN(size)) {
        return true;
      }
      const inLimit = file.size / 1024 / 1024 < size;
      if (!inLimit) {
        message.error(`请上传小于${size}MB的PNG或JPG的图片`);
      }
      return inLimit;
    },
    [maxSize]
  );

  const uploadFile = useCallback(async (rcFile) => {
    console.log(3333);
    console.log('rcFile', rcFile);
    const { onSuccess, onError, file, onProgress } = rcFile;
    onProgress({ percent: 10 });
    try {
      // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      const result = await client.put(`standrad/${file?.name}`, file);
      console.log('result', result);
      const { url, name } = result;

      console.log('result', result);
      console.log('====fileList', fileList);
      onProgress({ percent: 100 });
      onSuccess(url);
    } catch (e) {
      console.log(e);
      onError(e);
    }
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Upload
      ref={ref}
      fileList={fileList}
      multiple={multiple}
      maxCount={maxCount}
      listType={listType}
      onChange={handleChange}
      customRequest={uploadFile}
      beforeUpload={beforeUpload}
      accept={accept}
    >
      {fileList.length >= maxCount ? null : uploadButton}
    </Upload>
  );
});

export default FilesUpload;
