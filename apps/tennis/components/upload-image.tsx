import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/config/firebase';

import { Input } from '@ui/components/ui/input';
import { Button } from '@ui/components/ui/button';
import { Progress } from '@ui/components/ui/progress';
import { Card } from '@ui/components/ui/card';
import { X } from 'lucide-react';

const UploadImage = ({ handleUploadImage }: { handleUploadImage: (imageUrl: string) => void }) => {
    const [inputKey, setInputKey] = useState(Date.now());
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<any>(null)
    const [downloadURL, setDownloadURL] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)

    useEffect(() => {
        if (!downloadURL) return;

        const fetchData = async () => {
            await handleUploadImage(downloadURL)
            reset();
        }

        fetchData();
    }, [downloadURL])

    const reset = () => {
        setInputKey(Date.now());
        setImageFile(null)
        setImagePreview(null)
        setDownloadURL('')
        setProgressUpload(0)
    }

    const handleSelectedFile = (files: any) => {
        if (files && files[0].size < 10000000) {
            setImagePreview(URL.createObjectURL(files[0]))
            setImageFile(files[0])
        } else {
            console.log('File size to large')
            setImageFile(null)
        }
    }

    const handleUploadFile = () => {
        if (imageFile) {
            setIsUploading(true);
            const name = imageFile.name
            const storageRef = ref(storage, `image/${name}`)
            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setProgressUpload(progress) // to show progress upload

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    console.log(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                        //url is download url of file
                        setDownloadURL(url)
                        setIsUploading(false)

                    })
                },
            )
        } else {
            console.log('File not found')
        }
    }

    const handleRemoveFile = () => {
      reset();
    }

    return (
        <div className="border rounded border-dashed border-primary mt-4 mb-4 p-2 max-w-[1300px]">
            <div className="col-lg-8 offset-lg-2">
                <Input
                    key={inputKey}
                    type="file"
                    placeholder="Selecione uma imagem"
                    accept="image/*"
                    onChange={(files) => handleSelectedFile(files.target.files)}
                    className='cursor-pointer'
                />
                <span className='text-xs text-muted-foreground mt-2'>Tamanho recomendado: 1200px x 100 px</span>

                {imageFile && (
                    <div className="mt-4">
                        <Card>
                            <>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col p-4' >
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm text-muted-foreground'>Nome: </span>
                                            <p className='text-sm'>{imageFile.name}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm text-muted-foreground'>Tamanho: </span>
                                            <p className='text-sm'>{imageFile.size} kb</p>
                                        </div>
                                        {imagePreview && (
                                            <div className='flex flex-col gap-2'>
                                                <span className='text-sm text-muted-foreground'>Prévia: </span>
                                                <Image
                                                    src={imagePreview}
                                                    alt={imagePreview}
                                                    width={600}
                                                    height={50}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            onClick={handleRemoveFile}
                                            variant="ghost"
                                        >
                                            <X className='w-3 h-3' />
                                        </Button>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center gap-2 p-4'>
                                    <Progress value={progressUpload} />
                                    <Button
                                        onClick={handleUploadFile}
                                        disabled={isUploading}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadImage