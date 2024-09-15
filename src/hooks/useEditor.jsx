import React, { useContext } from 'react'
import { EditorContext } from '../context/editor-context'


function useEditor() {
    const context = useContext(EditorContext)

    if (!context) {
        throw new Error("useEditor must be used withing a EditorContext")
    }

    return (
        context
    )
}

export default useEditor