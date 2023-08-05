// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const RecreationEditor = ({ content, editorRef }) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef} // DOM 선택용 useRef
          placeholder="내용을 입력해주세요."
          initialValue={content || ' '} // 글 수정 시 초기 content 내용 저장할 것임
          previewStyle="vertical" // 미리보기 스타일 지정
          height="500px"
          initialEditType="wysiwyg"
          toolbarItems={toolbarItems}
          useCommandShortcut={false} // 키보드 입력 컨트롤 방지
        />
      )}
      ;
    </>
  );
};

export default RecreationEditor;
