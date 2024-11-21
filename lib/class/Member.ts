import { Position, isValidUrl, isValidDate, isValidTime, Artist, ArtistForm } from "../const/types"; // isValidDate, isValidTime, Artist, ArtistForm 추가함
import { Positions } from "../const/const";
import ArrayFilter from "../const/array-filter";

export class Member {
  public id: number; 
  public displayName: string;
  public positions: Position[];
  public sns: string[];
  public description: string;
  public email: string;
  public profilePicture: File;
  public profilePictureUrl: string;
  public uid: string;
  public verified: boolean = false; //기본값설정.
  public emailVerified: boolean = false; //기본값설정ㅇ

  constructor(formData: FormData) {
    this.id = -1; // 기본값설정ㅇ
    this.displayName = formData.get("name") as string;
    this.positions = ArrayFilter(Positions, formData) as Position[];
    this.sns = Array.from(formData.getAll("sns")) as string[]; // 링크배열추가함
    this.description = formData.get("description") as string;
    this.email = formData.get("email") as string;
    this.profilePicture = formData.get("photo") as File;
    this.profilePictureUrl = "";
    this.uid = formData.get("userId") as string;
  }

  private isValidForm() {
    if (this.displayName.length < 2) return "2자 이상의 활동명을 입력해주세요";
    if (this.positions.length === 0) return "포지션을 선택해주세요";
    if (!isValidUrl(this.sns)) return "유효한 SNS URL을 입력해주세요";
    if (!this.email.includes("@")) return "유효한 이메일을 입력해주세요"; // 간단한 이메일 검사
  }

  private getPlainObject() {
    return {
      id: this.id,
      displayName: this.displayName,
      positions: this.positions,
      sns: this.sns,
      description: this.description,
      email: this.email,
      photoURL: this.profilePictureUrl,
      uid: this.uid,
    };
  }

  public updateMember(updates: Partial<Member>) {
    Object.assign(this, updates);
  }

  public artist?: Artist; // 아티스트 정보를 포함

  public setArtist(artistData: ArtistForm) {
    this.artist = new Artist(
      artistData.displayName,
      artistData.positions as Position[],
      artistData.sns,
      artistData.description,
      this.email, // Member의 이메일 사용
    );
  }
}

  // private async uploadImage() {
  //   //*파일이 있을 때만 업로드 , 없어도됨.
  //   if (this.photo.size > 0) {
  //     if (
  //       this.photo.size < 10000000 && //10MB
  //       ["image/png", "image/jpg", "image/jpeg"].includes(this.photo.type)
  //     ) {
  //       const buffer = await this.photo.arrayBuffer();
  //       try {
  //         const fileRef = await storage
  //           .bucket("moun-df9ff.appspot.com")
  //           .file(`avatars/${this.uid}`);
  //         await fileRef.save(Buffer.from(buffer), {
  //           contentType: this.photo.type,
  //           metadata: {
  //             cacheControl: "public, max-age=31536000",
  //           },
  //         });
  //         let photoURL = await getDownloadURL(fileRef);
  //         if (isValidUrl(photoURL)) this.photoURL = photoURL;
  //         else return "이미지 업로드에 실패했습니다. 다시 시도해주세요. ";
  //       } catch (error) {
  //         return "이미지 업로드에 실패했습니다. 다시 시도해주세요. ";
  //       }
  //     } else {
  //       return "10MB이하의 PNG/JPG 파일을 올려주세요. ";
  //     }
  //   }
  // }
  // private async updateDoc() {
  //   try {
  //     await db
  //       .collection("artists")
  //       .doc(this.uid)
  //       .update(this.getPlainObject())
  //       .then(() => {
  //         console.log("Document successfully written! ", this.getPlainObject());
  //       });
  //   } catch (error) {
  //     return "프로필 업데이트에 실패했습니다. 다시 시도해주세요. ";
  //   }
  // }
  // async update() {
  //   let errorMsg = this.isValidForm();
  //   if (errorMsg) return errorMsg;
  //   errorMsg = await this.uploadImage();
  //   if (errorMsg) return errorMsg;
  //   errorMsg = await this.updateDoc();
  //   if (errorMsg) return errorMsg;
  // }

