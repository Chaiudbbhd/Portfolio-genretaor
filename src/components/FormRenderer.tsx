import React from "react";

interface Field {
  type: "text" | "textarea" | "file";
  name: string;
  label: string;
  required?: boolean;
  accept?: string;   // ✅ new optional property for file inputs
  maxSizeMB?: number; // ✅ optional file size validation
}

interface Props {
  fields: Field[];
  register: any; // react-hook-form register
}

export const FormRenderer: React.FC<Props> = ({ fields, register }) => {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        if (field.type === "text") {
          return (
            <div key={index}>
              <label className="block mb-2 font-medium">{field.label}</label>
              <input
                type="text"
                {...register(field.name, { required: field.required })}
                className="w-full border rounded p-2"
              />
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={index}>
              <label className="block mb-2 font-medium">{field.label}</label>
              <textarea
                {...register(field.name, { required: field.required })}
                className="w-full border rounded p-2"
              />
            </div>
          );
        }

        if (field.type === "file") {
          return (
            <div key={index}>
              <label className="block mb-2 font-medium">{field.label}</label>
              <input
                type="file"
                accept={field.accept} // ✅ restrict file type if provided
                {...register(field.name, {
                  required: field.required,
                  validate: field.maxSizeMB
                    ? {
                        fileSize: (files: FileList) =>
                          !files?.[0] ||
                          files[0].size <= field.maxSizeMB * 1024 * 1024 ||
                          `File size should not exceed ${field.maxSizeMB} MB`,
                      }
                    : undefined,
                })}
                className="w-full border rounded p-2"
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
