import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import React from 'react';

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm?: () => void;
    title: string;
    description: string;
    isAlertOnly?: boolean;
    cancelText?: string;
    confirmText?: string;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    isAlertOnly = false,
    cancelText = 'Cancelar',
    confirmText = 'Deletar'
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant={isAlertOnly ? 'default' : 'secondary'} onClick={() => onOpenChange(false)}>
                            {isAlertOnly ? 'Ok' : cancelText}
                        </Button>
                    </DialogClose>

                    {!isAlertOnly && (
                        <Button variant="destructive" onClick={() => {
                            if (onConfirm) onConfirm();
                            onOpenChange(false);
                        }}>
                            {confirmText}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
