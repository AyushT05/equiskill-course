import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  


function LoadingDialogue({loading}) {
  return (
    <div>
        <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogTitle/>
          <AlertDialogHeader>
            <AlertDialogDescription>
                <div className="flex flex-col items-center py-10">
                    <Image alt="placeholder"  src="/artificial-intelligence.gif" width={100} height={100} />
                    <h2>Please wait... AI is working on your request</h2>
                </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default LoadingDialogue