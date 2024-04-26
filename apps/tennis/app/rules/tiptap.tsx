'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import Blockquote from '@tiptap/extension-blockquote'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import {
    Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, MessageCircle, Underline as LucideUnderline, Image as LucideImage, List,
    ListOrdered, AlignLeft, AlignRight, AlignCenter, AlignJustify, Save
} from 'lucide-react'
import StarterKit from '@tiptap/starter-kit'

import { addRule } from '@tennis/lib/actions'
import useToastMessage from '@tennis/components/hooks/useToastMessage'
import { useAuthContext } from '../context/auth-context'
import { BubbleButton } from './bubble-button'
import { initialContent } from './initial-content'
import FloatSaveButton from './float-save-button'

export default function TipTap({ data }: { data: any }) {
    const [isEditing, setIsEditing] = useState(false)
    const { signed, isAdmin } = useAuthContext();

    const { successMessage, errorMessage } = useToastMessage();

    const editor = useEditor({
        editable: false,
        extensions: [StarterKit, Blockquote, Heading, Underline, Image, BulletList, ListItem, OrderedList,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                showOnlyWhenEditable: false,
                placeholder: 'Ainda não existe nenhuma regra. Por favor, entre com sua conta e escreva as regras aqui.',
            }),
            Table.configure({
                resizable: true
            }),
            TableRow,
            TableHeader,
            TableCell,
            Heading.configure({
                levels: [1, 2, 3],
            })],
        editorProps: {
            attributes: {
                class: 'outline-none'
            }
        },
        content: data ? JSON.parse(data) : initialContent,
        onSelectionUpdate({ editor }) {
            setIsEditing(true)
        },
    })

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor])

    useEffect(() => {
        if (!editor) {
            return undefined
        }

        if (signed && isAdmin) {
            editor.setEditable(true)
        } else {
            editor.setEditable(false)
        }
    }, [editor, signed, isAdmin])

    useEffect(() => {
        if (data) {
            editor?.commands.setContent(JSON.parse(data));
        }
    }, [data])

    async function formAction() {
        const response = await addRule('/rules', {
            content: JSON.stringify(editor?.getJSON())
        });

        if (response?.error) {
            errorMessage(response)
        }

        successMessage({
            title: "Regras.",
            description: "Regra salva com sucesso!"
        })
    }

    return (
        <>
            <EditorContent editor={editor} />
            {editor && (
                <>
                    <BubbleMenu
                        editor={editor}
                        className='bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zync-600 w-[570px]'
                    >
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            data-active={editor.isActive('blockquote')}>
                            <MessageCircle className='w-4 h-4' />
                            Quote
                        </BubbleButton>

                        <div className='flex items-center'>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                data-active={editor.isActive('bold')}>
                                <Bold className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                data-active={editor.isActive('italic')}>
                                <Italic className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                data-active={editor.isActive('strike')}>
                                <LucideUnderline className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                data-active={editor.isActive('strike')}>
                                <Strikethrough className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                data-active={editor.isActive('code')}>
                                <Code className='w-4 h-4' />
                            </BubbleButton>
                        </div>


                        <div className='flex items-center'>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                data-active={editor.isActive('heading', { level: 1 })}
                            >
                                <Heading1 className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                data-active={editor.isActive('heading', { level: 2 })}>
                                <Heading2 className='w-4 h-4' />
                            </BubbleButton>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                data-active={editor.isActive('heading', { level: 3 })}>
                                <Heading3 className='w-4 h-4' />
                            </BubbleButton>
                        </div>

                        <BubbleButton
                            onClick={() => addImage()}
                            data-active={editor.isActive('image')}>
                            <LucideImage className='w-4 h-4' />
                        </BubbleButton>

                        <div className='flex items-center'>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                data-active={editor.isActive('bulletList')}>
                                <List className='w-4 h-4' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                data-active={editor.isActive('orderedList')}>
                                <ListOrdered className='w-4 h-4' />
                            </BubbleButton>
                        </div>
                        <div className='flex items-center'>
                            <BubbleButton
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                data-active={editor.isActive({ textAlign: 'left' })}>
                                <AlignLeft className='w-4 h-4' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                data-active={editor.isActive({ textAlign: 'center' })}>
                                <AlignCenter className='w-4 h-4' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                data-active={editor.isActive({ textAlign: 'right' })}>
                                <AlignRight className='w-4 h-4' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                                data-active={editor.isActive({ textAlign: 'justify' })}>
                                <AlignJustify className='w-4 h-4' />
                            </BubbleButton>

                        </div>
                    </BubbleMenu>
                </>
            )}
            {signed && isAdmin && isEditing && (
                <form action={async () => await formAction()}>
                    <FloatSaveButton />
                </form>
            )}
        </>
    )
}