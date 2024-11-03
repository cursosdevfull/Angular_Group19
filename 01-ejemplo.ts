abstract class UploadPort {
  abstract upload(file: File): void;
}

class UploadAWSAdapter extends UploadPort {
  upload(file: File) {
    console.log("file uploaded to AWS");
  }
}

class Application {
  repository: UploadPort = new UploadAWSAdapter();

  upload(file: File) {
    this.repository.upload(file);
  }
}
