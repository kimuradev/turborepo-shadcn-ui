'use client'

import { Button } from "@ui/components/ui/button";
import ABIcon from '@/public/icons/icon-192x192.png';
import Image from "next/image";

type PwaModalProps = {
    show: boolean,
    onClose: () => void,
    onInstall: () => void
}

const PwaModal = ({ show, onClose, onInstall }: PwaModalProps) => {
    const blurBackground = show ? 'backdrop-blur' : '';

    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-94 p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2 text-black">
                        Instalar aplicativo?
                    </h2>
                    <div className="flex justify-center items-center gap-4 m-4">
                        <Image src={ABIcon} width={50} height={50} className="rounded" alt="Ícone da AB" placeholder='blur' />
                        <div className="flex flex-col">
                            <p className="text-sm  text-black font-bold">
                                AB Tênis
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Clique abaixo para instalar
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onInstall}
                        >
                            Instalar
                        </Button>

                    </div>
                </div>
                <div
                    className={`fixed inset-0 bg-gray-900 opacity-80 -z-10 ${blurBackground}`}
                >
                </div>
            </div>
        )
    )
}

export default PwaModal;