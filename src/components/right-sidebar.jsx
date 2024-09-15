import React from 'react'
import EditorStates from './editor-states'
import useEditor from '../hooks/useEditor';

const RightSidebar = () => {

  const { editorState } = useEditor();

  const EditorElement = EditorStates[editorState]?.propertiesComponent


  return (
    <div className=' min-w-72 max-w-72 flex-grow flex flex-col justify-between border-l-2 border-zinc-200'>
      {!EditorElement ? (
        <div>No such Editor state</div>
      ) : (
        <EditorElement />
      )}
    </div>
  )
}

export default RightSidebar