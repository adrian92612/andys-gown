namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    AUTH_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  }
}
