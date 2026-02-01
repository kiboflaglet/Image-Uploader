export type FileType = {
  id: string;
  file: File;
  status: "uploaded" | "failed" | "loading";
};