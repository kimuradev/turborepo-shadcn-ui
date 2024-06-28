'use client'

import { Button } from "@ui/components/ui/button";
import ABIcon from '@/public/icons/icon-192x192.png';
import Image from "next/image";
import { Dialog, DialogContent } from "@ui/components/ui/dialog";

type PwaModalProps = {
    show: boolean,
    onClose: () => void,
    onInstall: () => void
    onClickOutside: () => void
}

const PwaModal = ({ show, onClose, onInstall, onClickOutside }: PwaModalProps) => {
    return (
        show && (
            <Dialog open={show} onOpenChange={onClickOutside}>
                <DialogContent className="sm:max-w-[350px]">
                    <h2 className="text-lg font-semibold mb-2 text-black">
                        Instalar aplicativo?
                    </h2>
                    <div className="flex justify-center items-center gap-4 m-4">
                        <Image src={ABIcon} width={50} height={50} className="rounded" alt="Ícone da AB" placeholder='blur' />
                        <div className="flex flex-col">
                            <p className="text-sm  text-black font-bold">
                                AABB Tênis
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Clique abaixo para instalar
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="secondary"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={onInstall}
                        >
                            Instalar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    )
}

export default PwaModal;