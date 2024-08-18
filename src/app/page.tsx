"use client";

import { parseResumeFromPdf } from "@/lib/parse-resume-from-pdf";
import { useState } from "react";

interface IFile {
  name: string;
  size: number;
  type: string;
  fileUrl: string;
}

export default function Home() {
  const [file, setFile] = useState<IFile>({
    name: "",
    size: 0,
    type: "",
    fileUrl: "",
  });

  const onFileChange = ({
    event,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
  }) => {
    if (event?.target?.files?.length) {
      const newFile = event?.target?.files[0];
      const fileUrl = URL.createObjectURL(event?.target?.files[0]);

      setFile({
        name: newFile?.name,
        size: newFile?.size,
        type: newFile?.type,
        fileUrl,
      });
    }
  };

  const parseFIle = async () => {
    const resume = await parseResumeFromPdf(file?.fileUrl);
    console.log("resume", resume);
    alert("CHECK YOUR CONSOLE!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col border border-gray-700 p-4">
        <h1>Select file</h1>
        <input
          type="file"
          accept=".pdf"
          onChange={(event: any) => {
            onFileChange({ event });
            event.target.value = null;
          }}
        />

        <hr className="my-4" />
        {file?.fileUrl ? (
          <>
            <h3>{file?.name}</h3>
            <hr className="my-4" />
            <button onClick={parseFIle}>CONTINUE</button>
          </>
        ) : null}
      </div>
    </main>
  );
}
