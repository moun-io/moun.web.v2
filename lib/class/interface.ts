import * as FirebaseFirestore from "@google-cloud/firestore";
interface uploadable {
  upload: () => Promise<any>;
}
interface downloadable {
  download(): void;
}
interface deletable {
  delete(): void;
}
interface updateable {
  update(): void;
}
export type { uploadable, downloadable, deletable, updateable };
