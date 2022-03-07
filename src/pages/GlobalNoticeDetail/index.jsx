import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Rate,
  message,
  Descriptions,
  Tag,
} from 'antd';
import moment from 'moment';
import {
  EditorState,
  convertToRaw,
  ContentBlock,
  ContentState,
} from 'draft-js';
import { withRouter } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { detailGlobalNotice, siteCityNoticeList } from '../../services';
import './index.scss';

export default withRouter((props) => {
  // 标题
  const [title, setTitle] = useState('');
  // 内容
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // 重要等级
  const [level, setLevel] = useState(1);
  const [detail, setDetail] = useState({});

  // 获取数据
  const getDetail = async (id, isCity) => {
    const fun = isCity ? siteCityNoticeList('_', true, id) : detailGlobalNotice(id);
    const res = await fun;
    console.log('res', res);
    return isCity ? res[0] : res;
  };

  useEffect(() => {
    async function fun() {
      const { id, isCity } = props.match.params || {};
      console.log(id, isCity);
      // 如果是查看
      try {
        const record = await getDetail(id, isCity);
        console.log('record', record);
        const contentBlock = htmlToDraft(record.content);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        // setSelectedTags(record.areaName.split(','));
        setTitle(record.title);
        setLevel(record.level);
        setEditorState(EditorState.createWithContent(contentState));
        setDetail(record);
      } catch (err) {
        console.log('err', err);
      }
    }
    fun();
  }, []);

  const onEditorStateChange = editorState => setEditorState(editorState);

  return (
    <div>
      <Card bordered={false} title={title}>
        <Descriptions>
          <Descriptions.Item label="发布时间">
            {moment(+detail.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
        <div
          style={{ minHeight: '600px' }}
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }}
        />
        <br />
        <Rate
          value={level}
          onChange={(val) => {
            setLevel(val);
          }}
        />
        <br />
      </Card>
    </div>
  );
});
