type UploadImage = {
  uploadOnPremise(file: File): void;
  uploadCloud(file: File): void;
};

type UploadImageAI = UploadImage & {
  uploadAI(file: File): void;
};

/*interface UploadImage {
    uploadOnPremise(file: File): void
    uploadCloud(file: File): void
}

interface UploadImageAI extends UploadImage {
    uploadAI(file: File): void
}*/

/*interface UploadImageAI {
    uploadOnPremise(file: File): void
    uploadCloud(file: File): void
    uploadAI(file: File): void
}*/

class PhotoInteractive implements UploadImage {
  uploadOnPremise(file: File): void {
    console.log("image uploaded from PhotoInteractive");
  }
  uploadCloud(file: File): void {
    console.log("image uploaded from PhotoInteractive");
  }
}

class FunnyPhoto implements UploadImage {
  uploadOnPremise(file: File): void {
    console.log("image uploaded from FunnyPhoto");
  }
  uploadCloud(file: File): void {
    console.log("image uploaded from FunnyPhoto");
  }
}

class PhotoAI implements UploadImageAI {
  uploadOnPremise(file: File): void {
    console.log("image uploaded from PhotoAI");
  }
  uploadCloud(file: File): void {
    console.log("image uploaded from PhotoAI");
  }
  uploadAI(file: File): void {
    console.log("image uploaded with AI from PhotoAI");
  }
}
