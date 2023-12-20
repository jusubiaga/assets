"use client";

import React, { useState } from "react";

type Props = {};

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

function ContactForm({ afterSave }: any) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    let data = Object.fromEntries(new FormData(event.currentTarget));
    console.log("Dialog: ", data);
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="group">
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">Link</label>
              <input
                autoFocus
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={"hola"}
                name="Link"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 space-x-6 text-right">
          <DialogClose className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Cancel
          </DialogClose>
          <button className="inline-flex items-center justify-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 group-disabled:pointer-events-none">
            <span className="group-disabled:opacity-0">Save</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export function ImagesDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Load</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assets</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ContactForm afterSave={() => setOpen(false)}></ContactForm>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ImagesDialog;
