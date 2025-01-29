import StarterKit from '@tiptap/starter-kit'
import { TextEditorToolBar } from './TextEditorToolBar'
import Heading from '@tiptap/extension-heading'
import { Extension } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import "../styles/text-editor.css"

const BreakOnEnter = Extension.create({
  name: 'breakOnEnter',

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        this.editor.commands.setHardBreak()
        return true
      },
    }
  },
})

export const TextEditor = ({
  editorContent,
  onChange
}: {
  editorContent: string
  onChange: (content: string) => void
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BreakOnEnter,
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        class: 'rounded-md border min-h-[200px] p-2'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  return (
    <div className='flex flex-col gap-4 max-w-[400px] w-full'>
      <TextEditorToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
